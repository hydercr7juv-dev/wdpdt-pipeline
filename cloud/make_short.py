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
import subprocess

RAW = "https://raw.githubusercontent.com/hydercr7juv-dev/wdpdt-pipeline/main"
ASSETS = RAW + "/public/assets"
FONT_URL = RAW + "/public/fonts/Anton-Regular.ttf"
VOICE = "en-US-AndrewMultilingualNeural"
RATE = "+12%"
W, H, FPS = 1080, 1920, 30
TAIL = 0.5  # hold after the voiceover ends


def ff():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def run(cmd, timeout=900):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout)
    if r.returncode != 0:
        raise RuntimeError(f"cmd failed: {cmd[:120]}\n{(r.stdout + r.stderr)[-800:]}")
    return r.stdout + r.stderr


def install_font():
    os.makedirs("/root/.fonts", exist_ok=True)
    run(f'curl -sfL -o /root/.fonts/Anton-Regular.ttf "{FONT_URL}"')
    run("fc-cache -f >/dev/null 2>&1 || true")
    if "anton" not in run("fc-list").lower():
        raise RuntimeError("Anton font did not register with fontconfig")


def say(text, path="/tmp/vo.mp3"):
    esc = text.replace('"', '\\"')
    run(f'python -m edge_tts --voice {VOICE} --rate "{RATE}" --text "{esc}" --write-media {path}')
    if not os.path.exists(path) or os.path.getsize(path) < 1000:
        raise RuntimeError("edge-tts produced no audio")
    return path


def duration(path):
    out = run(f'{ff()} -i {path} -hide_banner 2>&1 || true')
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
    if not m:
        raise RuntimeError(f"could not read duration of {path}")
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
Style: K,Anton,104,&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,0,0,0,0,100,100,1,0,1,6,3,2,60,60,430,1
[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
"""


def caption_groups(script, total, emphasis):
    """Word timings collapsed into three-word groups, with per-word karaoke
    durations and a yellow flag for emphasis words."""
    timings = word_timings(script, total)
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
Style: K,Anton,104,&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,0,0,0,0,100,100,1,0,1,6,3,2,60,60,430,1
[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
"""
    open(path, "w").write(head + "\n".join(lines) + "\n")
    return path


def build(script, emphasis, clips, out="/tmp/final.mp4"):
    install_font()
    vo = say(script)
    total = duration(vo) + TAIL
    paths = fetch_clips(clips)

    # Captions are burned scene by scene (see ass_for_window), so each ffmpeg
    # pass is only a few seconds long and peak memory stays flat.
    groups = caption_groups(script, total - TAIL, emphasis)
    seg = total / len(paths)

    # These colour/timing flags are what YouTube wants — a file without them
    # comes back "Processing abandoned". They go on the scene encodes because
    # those streams are concatenated straight into the final video.
    VENC = (f'-threads 2 -c:v libx264 -profile:v high -level 4.0 -preset veryfast -crf 21 '
            f'-pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 '
            f'-color_trc bt709 -r {FPS} -fps_mode cfr -video_track_timescale 15360 '
            f'-x264-params "threads=2:lookahead-threads=1:sliced-threads=0"')

    parts = []
    for i, p in enumerate(paths):
        src_len = duration(p)
        start = min(1.0 + (i % 3) * 2.0, max(0.0, src_len - seg - 0.2))
        caps = ass_for_window(groups, i * seg, (i + 1) * seg, f"/tmp/caps_{i}.ass")
        outp = f"/tmp/scene_{i}.mp4"
        run(f'{ff()} -y -stream_loop -1 -ss {start:.2f} -t {seg:.2f} -i {p} '
            f'-vf "scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},'
            f'fps={FPS},setsar=1,ass={caps}" -filter_threads 1 '
            f'-an {VENC} {outp}')
        os.remove(p)  # free the source immediately; disk is tight too
        parts.append(outp)

    with open("/tmp/list.txt", "w") as f:
        for p in parts:
            f.write(f"file '{p}'\n")

    # Video is already captioned and correctly encoded, so it is copied, not
    # re-encoded — no second full-length pass, which is what kept blowing up.
    run(f'{ff()} -y -fflags +genpts -f concat -safe 0 -i /tmp/list.txt -i {vo} '
        f'-map 0:v -map 1:a -map_metadata -1 -c:v copy '
        f'-c:a aac -b:a 160k -ar 48000 -ac 2 -movflags +faststart -shortest {out}')

    for p in parts:
        try:
            os.remove(p)
        except OSError:
            pass
    if not os.path.exists(out) or os.path.getsize(out) < 200_000:
        raise RuntimeError("final mp4 missing or suspiciously small")
    return out
