#!/usr/bin/env python3
"""
Build an app-demo Short from a tall screenshot of the live site.

Rather than a screen recording, this pans slowly down a real full-page capture,
which reads on camera exactly like someone scrolling the app — and it uses the
product's own copy, so nothing is mocked up or invented.

Captions and voice reuse make_short's engine so it matches the other channels.

    build_demo("/tmp/bargn/phone.png", SCRIPT, EMPHASIS, out="/tmp/demo.mp4")
"""

import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_short import (  # noqa: E402
    ff, run, install_font, say, duration, caption_groups, ass_for_window, W, H, FPS, TAIL,
)


def build_demo(shot, script, emphasis, out="/tmp/demo.mp4", top=0, bottom=None, hold=1.2,
               caption_margin=210):
    """Pan from `top` to `bottom` of the screenshot over the voiceover.

    hold = seconds held still at the start, so the opening frame (the headline)
    is readable before movement begins — a pan that starts instantly reads as
    jittery on a phone.
    """
    install_font()
    vo = say(script, "/tmp/vo_demo.mp3")
    total = duration(vo) + TAIL

    probe = run(f'{ff()} -i {shot} -hide_banner 2>&1 || true')
    import re
    m = re.search(r"(\d+)x(\d+)", probe)
    sw, sh = int(m.group(1)), int(m.group(2))
    if bottom is None:
        bottom = sh

    # Scale the capture to the video width, then pan within it.
    scale = W / sw
    scaled_h = int(sh * scale)
    y_start = int(top * scale)
    y_end = max(y_start, min(int(bottom * scale), scaled_h) - H)

    frames = max(2, int(total * FPS))
    hold_f = int(hold * FPS)
    # Ease: hold, then travel. `n` is the frame counter inside the filter.
    expr = (f"if(lt(n,{hold_f}),{y_start},"
            f"{y_start}+({y_end}-{y_start})*(n-{hold_f})/{max(1, frames - hold_f)})")

    caps = ass_for_window(caption_groups(script, total - TAIL, emphasis), 0, total, "/tmp/caps_demo.ass")
    # Sit the captions low, clear of the page content they're overlaying. The
    # shared style hardcodes MarginV 430, which lands mid-screen here.
    txt = open(caps).read().replace(",60,60,430,1", f",60,60,{caption_margin},1")
    open(caps, "w").write(txt)

    run(f'{ff()} -y -loop 1 -framerate {FPS} -t {total:.2f} -i {shot} -i {vo} '
        f'-filter_complex "[0:v]scale={W}:-1,crop={W}:{H}:0:\'{expr}\','
        f'setsar=1,ass={caps}[v]" -filter_complex_threads 1 '
        f'-map "[v]" -map 1:a -map_metadata -1 -threads 2 '
        f'-c:v libx264 -profile:v high -level 4.0 -preset veryfast -crf 21 '
        f'-pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 '
        f'-r {FPS} -fps_mode cfr -video_track_timescale 15360 '
        f'-c:a aac -b:a 160k -ar 48000 -ac 2 -movflags +faststart -shortest {out}')
    return out
