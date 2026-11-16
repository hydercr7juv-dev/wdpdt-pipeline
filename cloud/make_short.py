#!/usr/bin/env python3
"""
Fully-cloud Short builder. Runs inside the Composio remote workbench, which is
the only sandbox that can reach BOTH the Microsoft neural voice endpoint and the
YouTube uploader. (The routine sandbox can render but cannot reach edge-tts, and
cannot push a file anywhere — every upload host is 403'd at its egress proxy.
That split is why this composes with ffmpeg/libass instead of Remotion.)

Everything it needs is public: footage and font come from raw.githubusercontent,
the voice from edge-tts. No signed URLs, nothing that expires, no laptop.

Usage (from the workbench, after `pip install edge-tts imageio-ffmpeg`):

    build(script_text, emphasis_words, clips, out_path)

Returns the finished mp4 path, ready for upload_local_file().
"""

import os
import re
import shlex
import subprocess

RAW = "https://raw.githubusercontent.com/hydercr7juv-dev/wdpdt-pipeline/main"
ASSETS = RAW + "/public/assets"
FONT_URL = RAW + "/public/fonts/Anton-Regular.ttf"
VOICE = "en-GB-RyanNeural"   # British: the scripts use British spelling and phrasing
RATE = "+12%"
W, H, FPS = 1080, 1920, 30
TAIL = 0.5  # hold after the voiceover ends


def ff():
    """Path to ffmpeg, already shell-quoted.

    Quoted because every caller interpolates this into a shell string. In the
    cloud sandbox the site-packages path has no spaces so it never mattered, but
    on a Mac the checkout can sit under a folder like
    "Desktop - hyder's MacBook Air", and an unquoted path there silently
    resolves to nothing: the command produces no output, and the caller fails
    with a confusing "could not read duration" instead of "ffmpeg not found".
    """
    import shlex
    import imageio_ffmpeg
    return shlex.quote(imageio_ffmpeg.get_ffmpeg_exe())


def run(cmd, timeout=900):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout)
    if r.returncode != 0:
        raise RuntimeError(f"cmd failed: {cmd[:120]}\n{(r.stdout + r.stderr)[-800:]}")
    return r.stdout + r.stderr


def install_font():
    # ~/.fonts in the cloud sandbox is /root/.fonts, but this also runs on a Mac
    # where /root is read-only — resolve the home directory instead of hardcoding.
    fdir = os.path.expanduser("~/.fonts")
    os.makedirs(fdir, exist_ok=True)
    run(f'curl -sfL -o {fdir}/Anton-Regular.ttf "{FONT_URL}"')
    run("fc-cache -f >/dev/null 2>&1 || true")
    if "anton" not in run("fc-list 2>/dev/null || true").lower():
        # macOS ships fontconfig only sometimes; libass can still find the file
        # via the fonts dir, so warn rather than abort.
        print("warning: Anton not registered with fontconfig; relying on font file")


def say(text, path="/tmp/vo.mp3"):
    """Synthesise the voiceover AND capture when each word was actually spoken.

    Returns (path, timings) where timings is [(word, start_s, end_s), ...], taken
    from the engine's own WordBoundary events rather than estimated.

    This replaced a CLI call plus a guess. Captions used to be timed by scoring
    each word on letter count and trailing punctuation, then stretching the whole
    lot to fit the audio length. That is fine for the first line and drifts badly
    by the middle of a 30 second script, which is exactly what the finished videos
    looked like. The engine knows the real offsets, so ask it.

    The CLI's --write-subtitles only groups by sentence, which is not granular
    enough for three word karaoke captions. The Python API gives per word events.
    """
    import asyncio
    import edge_tts

    def drive(coro):
        """Run a coroutine whether or not a loop is already going.

        This builder's home is the Composio workbench, which is Jupyter, and
        Jupyter always has a running event loop. asyncio.run() raises
        "cannot be called from a running event loop" there, which would have
        killed every scheduled run. A worker thread gets its own clean loop.
        """
        try:
            asyncio.get_running_loop()
        except RuntimeError:
            return asyncio.run(coro)
        import concurrent.futures
        with concurrent.futures.ThreadPoolExecutor(1) as ex:
            return ex.submit(asyncio.run, coro).result()

    async def stream():
        # boundary defaults to "SentenceBoundary", which yields one event per
        # sentence and is useless for three word karaoke captions. Asking for
        # WordBoundary is the entire fix; without it this returns nothing and
        # the build silently falls back to the old estimate.
        comm = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")
        timings = []
        with open(path, "wb") as f:
            async for chunk in comm.stream():
                if chunk["type"] == "audio":
                    f.write(chunk["data"])
                elif chunk["type"] == "WordBoundary":
                    # offsets arrive in 100 nanosecond ticks
                    start = chunk["offset"] / 1e7
                    timings.append((chunk["text"], start, start + chunk["duration"] / 1e7))
        return timings

    timings = drive(stream())
    if not os.path.exists(path) or os.path.getsize(path) < 1000:
        raise RuntimeError("edge-tts produced no audio")
    return path, timings


def duration(path):
    out = run(f'{ff()} -i {shlex.quote(path)} -hide_banner 2>&1 || true')
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
    if not m:
        # `|| true` hides a non-zero exit, so an unreadable file and a missing
        # ffmpeg both land here. Say which, or this costs an hour to diagnose.
        size = os.path.getsize(path) if os.path.exists(path) else -1
        raise RuntimeError(
            f"could not read duration of {path} (size={size}); "
            f"ffmpeg output was: {out.strip()[-300:] or '<empty — ffmpeg did not run>'}")
    h, mi, s = m.groups()
    return int(h) * 3600 + int(mi) * 60 + float(s)


def fetch_clips(clips):
    """Pull each clip from the public repo.

    Re-downloads whenever the cached copy is missing OR too small: a crashed
    earlier run can leave a truncated file behind, and trusting mere existence
    made the next build fail on an unreadable source.
    """
    paths = []
    for c in clips:
        p = f"/tmp/src_{c}"
        if not os.path.exists(p) or os.path.getsize(p) < 50_000:
            if os.path.exists(p):
                os.remove(p)
            run(f'curl -sfL -o {p} "{ASSETS}/{c}"', timeout=300)
            if not os.path.exists(p) or os.path.getsize(p) < 50_000:
                raise RuntimeError(f"clip {c} missing or too small — wrong filename?")
        paths.append(p)
    return paths


def word_timings(script, total):
    """Weight each word by length and trailing punctuation, same idea as the
    Remotion caption engine — long words and sentence ends hold longer."""
    words = [w for w in re.split(r"\s+", script.strip()) if w]
    weights = []
    for w in words:
        base = 1.0 + min(len(w), 12) * 0.06
        if w.endswith((".", "?", "!")):
            base += 0.55
        elif w.endswith((",", ";", ":")):
            base += 0.28
        weights.append(base)
    scale = total / sum(weights)
    out, t = [], 0.0
    for w, wt in zip(words, weights):
        d = wt * scale
        out.append((w, t, t + d))
        t += d
    return out


def _ts(s):
    return f"{int(s // 3600)}:{int((s % 3600) // 60):02d}:{s % 60:05.2f}"


ASS_HEAD = """[Script Info]
ScriptType: v4.00+
PlayResX: {w}
PlayResY: {h}
WrapStyle: 0
[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: K,Anton,122,&H00FFFFFF,&H00FFFFFF,&H00000000,&H90000000,0,0,0,0,100,100,2,0,1,9,4,5,70,70,0,1
Style: HOOK,Anton,86,&H0000E5FF,&H0000E5FF,&H00000000,&HA0000000,0,0,0,0,100,100,2,0,1,8,4,8,80,80,250,1
[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
"""


def caption_groups(timings, emphasis):
    """Real word timings collapsed into three-word groups, with per-word karaoke
    durations and a yellow flag for emphasis words.

    `timings` comes straight from say(), so a caption appears exactly when the
    voice says it. Takes the timings rather than re-deriving them, because
    re-deriving is what put the captions out of step in the first place.
    """
    emph = {re.sub(r"[^a-z]", "", e.lower()) for e in emphasis}
    groups = []
    for i in range(0, len(timings), 3):
        grp = timings[i:i + 3]
        parts = []
        for w, ws, we in grp:
            clean = re.sub(r"[^A-Za-z0-9'£$%-]", "", w).upper()
            if not clean:
                continue
            hot = re.sub(r"[^a-z]", "", w.lower()) in emph
            parts.append((clean, we - ws, hot))
        if parts:
            groups.append((grp[0][1], grp[-1][2], parts))
    return groups


def ass_for_window(groups, start, end, path):
    """Write an ASS covering only [start, end), with times rebased to zero.

    Captions are burned per scene rather than in one pass over the whole video:
    libass' glyph/bitmap cache grows as it goes, and on the workbench's ~1GB a
    single full-length pass gets OOM-killed around ten seconds in. Per-scene
    passes keep each render short and reset that cache every time.
    """
    lines = []
    for gs, ge, parts in groups:
        if ge <= start or gs >= end:
            continue
        s = max(0.0, gs - start)
        e = min(end - start, ge - start)
        if e - s < 0.05:
            continue
        txt = "".join(
            "{\\k%d}%s%s " % (max(1, int(d * 100)),
                              r"{\c&H003BD9FF&}" if hot else r"{\c&H00FFFFFF&}",
                              word)
            for word, d, hot in parts
        ).strip()
        lines.append(f"Dialogue: 0,{_ts(s)},{_ts(e)},K,,0,0,0,,{txt}")
    open(path, "w").write(ASS_HEAD.format(w=W, h=H) + "\n".join(lines) + "\n")
    return path


def build_ass(script, total, emphasis, path="/tmp/caps.ass"):
    """Groups of three words, karaoke-timed, emphasis words in yellow.
    ASS colours are &HBBGGRR — 3BD9FF is the #FFD93B used by the Remotion build."""
    timings = word_timings(script, total)
    emph = {re.sub(r"[^a-z]", "", e.lower()) for e in emphasis}
    lines = []
    for i in range(0, len(timings), 3):
        grp = timings[i:i + 3]
        st, en = grp[0][1], grp[-1][2]
        parts = []
        for w, ws, we in grp:
            clean = re.sub(r"[^A-Za-z0-9'£$%-]", "", w).upper()
            if not clean:
                continue
            k = max(1, int((we - ws) * 100))
            colour = r"{\c&H003BD9FF&}" if re.sub(r"[^a-z]", "", w.lower()) in emph else r"{\c&H00FFFFFF&}"
            parts.append("{\\k%d}%s%s " % (k, colour, clean))
        if parts:
            lines.append(f"Dialogue: 0,{_ts(st)},{_ts(en)},K,,0,0,0,,{''.join(parts).strip()}")
    head = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0
[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: K,Anton,122,&H00FFFFFF,&H00FFFFFF,&H00000000,&H90000000,0,0,0,0,100,100,2,0,1,9,4,5,70,70,0,1
[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
"""
    open(path, "w").write(head + "\n".join(lines) + "\n")
    return path


def hook_line(question, path="/tmp/hook.ass", hold=1.5):
    """The question, on screen, for the first second and a half.

    Shorts are judged in the first frame. Opening on unlabelled stock footage
    gives a scrolling viewer nothing to hold on to, so the question that the
    video answers goes up immediately, in the accent colour, while the voice
    says it.
    """
    q = question.strip().upper().replace("{", "").replace("}", "")
    # \an5 centres it; the \t() grows it slightly so it is not a dead title card.
    body = (r"{\fad(180,220)\t(0,%d,\fscx106\fscy106)}" % int(hold * 600)) + q
    open(path, "w").write(
        ASS_HEAD.format(w=W, h=H)
        + f"Dialogue: 1,{_ts(0.15)},{_ts(hold)},HOOK,,0,0,0,,{body}\n"
    )
    return path


def scene_bounds(groups, total, target=2.6):
    """Cut points that land on speech, not on a stopwatch.

    The old build divided the runtime into eight equal slices, so a cut could
    land mid-word and never had anything to do with what was being said. Here
    the boundaries snap to the end of a caption group, and scenes run about
    2.6 seconds, which is roughly twice the cut rate of the old eight-scene
    version. Faster cutting is most of why a Short holds a scrolling viewer.
    """
    if not groups:
        n = max(8, int(round(total / target)))
        seg = total / n
        return [(i * seg, (i + 1) * seg) for i in range(n)]

    ends = [ge for _, ge, _ in groups]
    bounds, last = [], 0.0
    for e in ends:
        if e - last >= target:
            bounds.append((last, e))
            last = e
    if total - last > 0.6:
        bounds.append((last, total))
    elif bounds:
        bounds[-1] = (bounds[-1][0], total)
    else:
        bounds = [(0.0, total)]
    return bounds


def build(script, emphasis, clips, out="/tmp/final.mp4", question=None, music=None):
    install_font()
    vo, timings = say(script)
    total = duration(vo) + TAIL
    paths = fetch_clips(clips)

    if not timings:
        print("warning: no word timings from edge-tts, falling back to estimated caption timing")
        timings = word_timings(script, total - TAIL)

    groups = caption_groups(timings, emphasis)
    bounds = scene_bounds(groups, total)

    VENC = (f'-threads 2 -c:v libx264 -profile:v high -level 4.0 -preset veryfast -crf 21 '
            f'-pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 '
            f'-color_trc bt709 -r {FPS} -fps_mode cfr -video_track_timescale 15360 '
            f'-x264-params "threads=2:lookahead-threads=1:sliced-threads=0"')

    # Ken Burns. Source is scaled to 1.25x the frame so zoompan has room to move
    # into; alternating push-in and push-out stops a long video feeling like one
    # continuous drift. 1350x2400 rather than a 4K intermediate keeps peak memory
    # inside the workbench's ~1GB, which is the same reason captions are burned
    # per scene rather than in one pass.
    ZW, ZH = 1350, 2400

    hook = hook_line(question, hold=1.5) if question else None

    parts = []
    for i, (s0, s1) in enumerate(bounds):
        # Everything is resolved on the frame grid, not in floating seconds.
        #
        # Scenes are rendered separately and concatenated, so scene i begins in
        # the final video at exactly the sum of the preceding frame counts.
        # Snapping each scene's length to whole frames WITHOUT moving its
        # caption window to match would let a fraction of a frame accumulate at
        # every cut, and the subtitles would walk away from the voice over the
        # length of the video. f0/f1 are the authoritative positions; the
        # caption window is rebased from those, not from the float bounds.
        f0 = int(round(s0 * FPS))
        f1 = int(round(s1 * FPS))
        frames = max(2, f1 - f0)
        seg = frames / FPS
        a0, a1 = f0 / FPS, (f0 + frames) / FPS

        p = paths[i % len(paths)]

        # A motion graphic must never play twice. There are usually more scenes
        # than clips, so paths[] wraps and an mg_ file would come back around
        # late in the video - a diagram of the mechanism replaying after the
        # script has moved on reads as a mistake. On a repeat, fall through to
        # the next live clip instead.
        if os.path.basename(p).startswith("mg_") and i >= len(paths):
            live = [q for q in paths if not os.path.basename(q).startswith("mg_")]
            if live:
                p = live[i % len(live)]

        src_len = duration(p)
        start_at = min(0.8 + (i % 4) * 1.6, max(0.0, src_len - seg - 0.2))
        caps = ass_for_window(groups, a0, a1, f"/tmp/caps_{i}.ass")

        # A clip named mg_*.mp4 is a MOTION GRAPHIC, not stock footage: it was
        # authored at exactly 1080x1920 in motion/, so it must not be cropped,
        # scaled or pushed. Ken Burns on a drawn diagram slides the labels off
        # the frame. These are the shots that show the mechanism the script is
        # describing, which footage of an aeroplane from outside can never do.
        is_graphic = os.path.basename(p).startswith("mg_")
        if is_graphic:
            start_at = 0.0
        if i % 2 == 0:                       # push in
            z = f"1.0+{0.10 / frames:.6f}*on"
        else:                                # push out
            z = f"1.10-{0.10 / frames:.6f}*on"

        # Subtitle filters are applied after zoompan so the text never scales
        # with the footage. The hook only exists on the first scene.
        subs = f"ass={caps}"
        if hook and i == 0:
            subs = f"ass={hook},{subs}"

        fade = f"fade=t=in:st=0:d=0.18,fade=t=out:st={max(0.0, seg - 0.18):.2f}:d=0.18"
        if i == 0:
            fade = f"fade=t=out:st={max(0.0, seg - 0.18):.2f}:d=0.18"

        outp = f"/tmp/scene_{i}.mp4"
        # fps MUST be forced to a constant rate BEFORE zoompan.
        #
        # zoompan with d=1 emits exactly one output frame per INPUT frame, and
        # its own fps= option only tags the output rate - it does not resample.
        # The pool runs at 23.98, 25, 29.91, 30, 50 and 60 fps, so without this
        # filter a 2.6s cut from a 60fps clip produced 156 frames played at 30
        # (5.2s on screen) while a 25fps clip came out short. Captions are
        # rebased per scene assuming the scene is exactly `seg` long, so every
        # scene drifted by a different amount and the subtitles slid further out
        # of sync as the video went on. That is exactly what it looked like.
        # -frames:v, not -t. An input-side -t on a -stream_loop'd source does not
        # bound the filtered output exactly (a 2.6s request came out as 94
        # frames, 3.13s). Pinning the output frame count makes every scene
        # exactly `frames`/FPS long, which is what the per-scene caption rebase
        # in ass_for_window assumes. Get this wrong and the subtitles drift
        # further out of sync with every scene.
        if is_graphic:
            vf = f'fps={FPS},scale={W}:{H},setsar=1,{subs},{fade}'
        else:
            vf = (f'fps={FPS},scale={ZW}:{ZH}:force_original_aspect_ratio=increase,crop={ZW}:{ZH},'
                  f"zoompan=z='{z}':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={W}x{H},"
                  f'setsar=1,{subs},{fade}')
        run(f'{ff()} -y -stream_loop -1 -ss {start_at:.2f} -i {p} '
            f'-vf "{vf}" -filter_threads 1 -frames:v {frames} '
            f'-an {VENC} {outp}')
        parts.append(outp)

    for p in set(paths):
        try:
            os.remove(p)
        except OSError:
            pass

    with open("/tmp/list.txt", "w") as f:
        for p in parts:
            f.write(f"file '{p}'\n")

    # Music bed, if the caller named one. Mixed well under the voice and faded
    # at both ends. Shorts without a bed feel flat next to everything around
    # them in the feed, but the voice has to stay the loudest thing by a mile.
    if music:
        mpath = fetch_clips([music])[0]
        amix = (f'-i {vo} -i {mpath} -filter_complex '
                f'"[1:a]volume=0.13,afade=t=in:st=0:d=1,afade=t=out:st={max(0.0,total-1.5):.2f}:d=1.5[m];'
                f'[0:a][m]amix=inputs=2:duration=first:dropout_transition=0[a]" -map 0:v -map "[a]"')
    else:
        amix = f'-i {vo} -map 0:v -map 1:a'

    run(f'{ff()} -y -fflags +genpts -f concat -safe 0 -i /tmp/list.txt {amix} '
        f'-map_metadata -1 -c:v copy '
        f'-c:a aac -b:a 160k -ar 48000 -ac 2 -movflags +faststart -shortest {out}')

    for p in parts:
        try:
            os.remove(p)
        except OSError:
            pass
    if not os.path.exists(out) or os.path.getsize(out) < 200_000:
        raise RuntimeError("final mp4 missing or suspiciously small")
    return out
