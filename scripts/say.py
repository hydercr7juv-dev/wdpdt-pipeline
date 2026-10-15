#!/usr/bin/env python3
"""Generate the voiceover AND the real per-word timings in one pass.

    python3 scripts/say.py <slug>

Reads /tmp/<slug>.txt, writes:
    public/assets/vo_<slug>.mp3
    /tmp/<slug>.words.json   -> {"audioDuration": 34.87, "words": [{text,start,end}, ...]}

Why this exists. Captions used to be timed by scoring each word on letter
count, inserting a pause at punctuation, and stretching the result to fit the
known audio length. Measured against the real speech on a 35 second script that
was out by 1.31 seconds at the worst point. The error is zero at both ends and
largest in the middle, which is exactly what you see in the finished videos.

The voice engine knows when it said every word, so stop guessing and ask it.

Two things that are easy to get wrong here:
  * edge_tts.Communicate defaults boundary to "SentenceBoundary", which gives
    one event per sentence and is useless for three word karaoke captions. The
    WordBoundary argument below is the whole point of this script.
  * asyncio.run() raises inside an already running event loop, and this may be
    called from a notebook or an agent sandbox that has one. Hence drive().
"""

import asyncio
import json
import os
import subprocess
import sys

VOICE = "en-US-AndrewMultilingualNeural"
RATE = "+12%"

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def drive(coro):
    try:
        asyncio.get_running_loop()
    except RuntimeError:
        return asyncio.run(coro)
    import concurrent.futures
    with concurrent.futures.ThreadPoolExecutor(1) as ex:
        return ex.submit(asyncio.run, coro).result()


def synth(text, mp3_path):
    import edge_tts

    async def stream():
        comm = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")
        words = []
        with open(mp3_path, "wb") as f:
            async for chunk in comm.stream():
                if chunk["type"] == "audio":
                    f.write(chunk["data"])
                elif chunk["type"] == "WordBoundary":
                    start = chunk["offset"] / 1e7          # 100ns ticks
                    words.append({
                        "text": chunk["text"],
                        "start": round(start, 3),
                        "end": round(start + chunk["duration"] / 1e7, 3),
                    })
        return words

    return drive(stream())


def audio_duration(path):
    """Seconds, via afinfo on macOS or ffprobe anywhere else."""
    try:
        out = subprocess.run(["afinfo", path], capture_output=True, text=True, timeout=30).stdout
        for line in out.splitlines():
            if "estimated duration" in line:
                return float(line.split(":")[1].strip().split()[0])
    except Exception:
        pass
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", path],
        capture_output=True, text=True, timeout=30).stdout.strip()
    return float(out)


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: say.py <slug>")
    slug = sys.argv[1]

    txt = f"/tmp/{slug}.txt"
    if not os.path.exists(txt):
        sys.exit(f"no script at {txt}")
    text = open(txt).read().strip()
    if not text:
        sys.exit(f"{txt} is empty")

    mp3 = os.path.join(ROOT, "public", "assets", f"vo_{slug}.mp3")
    os.makedirs(os.path.dirname(mp3), exist_ok=True)

    words = synth(text, mp3)
    if not os.path.exists(mp3) or os.path.getsize(mp3) < 1000:
        sys.exit("edge-tts produced no audio")

    dur = audio_duration(mp3)
    tokens = text.split()

    out = {"audioDuration": round(dur, 3), "words": words}
    json.dump(out, open(f"/tmp/{slug}.words.json", "w"), indent=1)

    print(f"vo       {mp3}")
    print(f"duration {dur:.3f}s")
    print(f"words    {len(words)} timed / {len(tokens)} in script")
    if len(words) != len(tokens):
        # Not fatal. Short.tsx checks the counts and falls back to the estimate
        # rather than pairing two lists that do not line up, but the video will
        # be noticeably worse, so make the reason visible now.
        print("WARNING: counts differ, captions will fall back to the estimate "
              "and will drift. Check the script for stray characters.")
    else:
        print(f"rate     {len(tokens)/dur:.2f} words/sec")


if __name__ == "__main__":
    main()
