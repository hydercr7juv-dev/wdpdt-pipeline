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
    """Pull each clip once from the public repo."""
    paths = []
    for c in clips:
        p = f"/tmp/src_{c}"
        if not os.path.exists(p):
            run(f'curl -sfL -o {p} "{ASSETS}/{c}"', timeout=300)
            if os.path.getsize(p) < 50_000:
                raise RuntimeError(f"clip {c} downloaded too small — wrong name?")
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

    # Even scene split across the voiceover, each cut normalised so concat is safe.
    seg = total / len(paths)
    parts = []
    for i, p in enumerate(paths):
        src_len = duration(p)
        start = min(1.0 + (i % 3) * 2.0, max(0.0, src_len - seg - 0.2))
        outp = f"/tmp/scene_{i}.mp4"
        # -threads 2 matters: x264 allocates frame buffers per thread and the
        # workbench only has ~1GB, so default threading gets the process
        # OOM-killed part way through.
        run(f'{ff()} -y -stream_loop -1 -ss {start:.2f} -t {seg:.2f} -i {p} '
            f'-vf "scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},setsar=1" '
            f'-an -threads 2 -c:v libx264 -preset veryfast -crf 21 -pix_fmt yuv420p {outp}')
        os.remove(p)  # free the source immediately; disk is tight too
        parts.append(outp)

    with open("/tmp/list.txt", "w") as f:
        for p in parts:
            f.write(f"file '{p}'\n")
    run(f'{ff()} -y -f concat -safe 0 -i /tmp/list.txt -c copy /tmp/joined.mp4')

    caps = build_ass(script, total - TAIL, emphasis)
    # yuv420p + tv range + faststart is the profile YouTube accepts; jpeg-ish
    # full-range output is what caused "Processing abandoned" on early uploads.
    #
    # Thread caps are load-bearing, not tidiness: this pass decodes 1080x1920,
    # runs libass over it and re-encodes, and on the workbench's ~1GB it gets
    # OOM-killed around frame 300 with default threading. Two encode threads and
    # single-threaded filtering keeps peak RSS well under the limit.
    run(f'{ff()} -y -i /tmp/joined.mp4 -i {vo} '
        f'-filter_complex "[0:v]ass={caps}[v]" -filter_complex_threads 1 -filter_threads 1 '
        f'-map "[v]" -map 1:a -threads 2 '
        f'-c:v libx264 -profile:v high -preset veryfast -crf 22 -pix_fmt yuv420p -color_range tv '
        f'-x264-params "threads=2:lookahead-threads=1:sliced-threads=0" '
        f'-c:a aac -b:a 160k -ar 48000 -ac 2 -movflags +faststart -shortest {out}')
    for p in parts + ["/tmp/joined.mp4"]:
        try:
            os.remove(p)
        except OSError:
            pass
    if not os.path.exists(out) or os.path.getsize(out) < 200_000:
        raise RuntimeError("final mp4 missing or suspiciously small")
    return out
