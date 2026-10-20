#!/usr/bin/env python3
"""
Pull vertical stock footage from Pexels into public/assets/.

Why this exists: the shop_* library is ten supermarket-aisle clips, which cannot
carry a story about a pricing algorithm or a dot-com collapse. Pexels serves
native 1080x1920 portrait video, so nothing has to be upscaled from a landscape
crop the way the free tiers of other libraries would force.

The key is read from .env, which is gitignored. It is never written into the
committed output, a routine prompt, or anything that leaves this machine.

    python3 scripts/fetch-pexels.py [story|qg_night]

Re-running skips clips already present, so it is safe to call repeatedly to top
up the library.
"""

import hashlib
import json
import os
import subprocess
import sys
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
ASSETS = os.path.join(ROOT, "public", "assets")
W, H, FPS = 1080, 1920, 30
MAX_SECONDS = 14  # long enough for any single scene; keeps the repo small

# name prefix -> search query, grouped into sets so one library can be topped
# up without re-running the others. Pick a set with the first CLI argument.
QUERY_SETS = {
    # Shopping Stories: screens, parcels, warehouses, money, crowds.
    "story": {
        "story_phone": "person shopping on phone",
        "story_laptop": "typing laptop online",
        "story_parcel": "delivery parcel box",
        "story_courier": "courier delivering package",
        "story_warehouse": "warehouse logistics",
        "story_card": "credit card payment online",
        "story_cash": "counting money cash",
        "story_bags": "carrying shopping bags",
        "story_crowd": "busy shopping street crowd",
        "story_queue": "queue of people waiting",
        "story_screen": "computer code screen data",
        "story_shelf": "supermarket shelves stocked",
        "story_till": "paying at the till",
        "story_boxes": "stack of cardboard boxes",
    },
    # The Quiet Grind, added 17 Oct 2026 at Hyder's request. The first 40 qg_
    # clips were too soft and too crowded for the voice: alarms, calendars,
    # tidy desks, busy streets. What the channel actually wants is one person
    # training alone in the dark. Every query says "man" and "alone" or
    # "night" for that reason, and nothing here is a gym full of people.
    "qg_night": {
        "qg_pushups": "man doing push ups alone",
        "qg_situps": "man doing sit ups floor",
        "qg_pullups": "man doing pull ups",
        "qg_skipping": "man skipping rope training",
        "qg_boxing": "boxer training alone bag",
        "qg_shadowbox": "man shadow boxing",
        "qg_weights": "man lifting weights alone",
        "qg_nightrun": "man running at night street",
        "qg_nightgym": "man training alone dark gym",
        "qg_nightwalk": "man walking alone at night",
        "qg_nightcity": "empty city street at night",
        "qg_nightdesk": "studying alone at night lamp",
    },
}

PER_QUERY = 2


def key():
    env = os.path.join(ROOT, ".env")
    if not os.path.exists(env):
        sys.exit("no .env — expected PEXELS_API_KEY there")
    for line in open(env):
        if line.startswith("PEXELS_API_KEY="):
            return line.split("=", 1)[1].strip()
    sys.exit("PEXELS_API_KEY not found in .env")


def ff():
    """ffmpeg command.

    imageio_ffmpeg is what make_short.py uses, but that is pip-installed inside
    the cloud sandbox and absent on this Mac, where there is no ffmpeg on PATH
    either. Remotion ships its own binary, so fall back to that.
    """
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        pass

    # Homebrew's ffmpeg next. Remotion's bundled binary is checked last and
    # usually cannot do this job at all: it is a reduced build with no libx264
    # and it aborts on "Library not loaded: libavdevice.dylib". That cost real
    # time on 15 Oct, so the working binary goes first.
    if os.path.exists("/opt/homebrew/bin/ffmpeg"):
        return "/opt/homebrew/bin/ffmpeg"
    if os.path.exists("/usr/local/bin/ffmpeg"):
        return "/usr/local/bin/ffmpeg"

    for plat in ("darwin-arm64", "darwin-x64", "linux-x64", "linux-arm64"):
        cand = os.path.join(ROOT, "node_modules", "@remotion", f"compositor-{plat}", "ffmpeg")
        if os.path.exists(cand):
            return f'"{cand}"'
    sys.exit("no ffmpeg found — pip install imageio-ffmpeg, or check node_modules/@remotion")


# Pexels 403s the default "Python-urllib/3.x" agent. The same key works fine
# from curl, which is what made this look like an auth failure rather than a
# blocked client.
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"


def existing_hashes():
    """md5 of every clip already in the library.

    Pexels can return the same video for two different queries, and its search
    can repeat an id across pages. On 17 Oct that produced qg_skipping2 as a
    byte-for-byte copy of qg_skipping1, and qg_nightwalk1 as a copy of the
    pre-existing qg_street2. A duplicate is worse than a gap: the same footage
    under two names makes the channel look like one recycled loop.
    """
    out = {}
    if not os.path.isdir(ASSETS):
        return out
    for f in os.listdir(ASSETS):
        if f.endswith(".mp4"):
            fp = os.path.join(ASSETS, f)
            out[hashlib.md5(open(fp, "rb").read()).hexdigest()] = f
    return out


def download(url, dst, tries=4):
    """Stream to disk in chunks, verify the length, retry on a short read.

    `r.read()` in one gulp lost 5 of 24 clips on 17 Oct to IncompleteRead and
    SSL "UNEXPECTED_EOF_WHILE_READING" — Pexels drops long single-shot reads of
    a 10MB+ file. Chunked reads plus a Content-Length check catch a truncated
    file here instead of letting ffmpeg fail on it later.
    """
    last = None
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=300) as r:
                expect = int(r.headers.get("Content-Length") or 0)
                got = 0
                with open(dst, "wb") as fh:
                    while True:
                        chunk = r.read(1 << 20)
                        if not chunk:
                            break
                        fh.write(chunk)
                        got += len(chunk)
            if expect and got < expect:
                raise IOError(f"short read {got}/{expect}")
            if got < 50_000:
                raise IOError(f"suspiciously small ({got} bytes)")
            return got
        except Exception as e:
            last = e
            if os.path.exists(dst):
                os.remove(dst)
    raise last


def search(api_key, query, per_page):
    url = "https://api.pexels.com/videos/search?" + urllib.parse.urlencode(
        {"query": query, "orientation": "portrait", "per_page": per_page, "size": "medium"}
    )
    req = urllib.request.Request(url, headers={"Authorization": api_key, "User-Agent": UA})
    # Retried for the same reason as download(): the qg_pullups search died on a
    # bare SSL EOF on 17 Oct and silently cost that prefix both its clips.
    last = None
    for _ in range(3):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r).get("videos", [])
        except Exception as e:
            last = e
    raise last


def best_file(video):
    """Tallest portrait file at or above 1920, else the tallest available.

    Sorting by height rather than by Pexels' own quality label because the
    labels are inconsistent across uploads and height is what actually decides
    whether the vertical crop has to upscale.
    """
    portrait = [f for f in video["video_files"] if (f.get("height") or 0) > (f.get("width") or 0)]
    pool = portrait or video["video_files"]
    at_least = [f for f in pool if (f.get("height") or 0) >= H]
    return min(at_least, key=lambda f: f["height"]) if at_least else max(
        pool, key=lambda f: f.get("height") or 0
    )


def normalise(src, dst, seconds):
    """Crop to exactly 1080x1920 at 30fps, no audio.

    make_short.py loops and re-encodes scenes anyway, but normalising here keeps
    every clip in the library identical in shape, so a scene never letterboxes
    because one source was 4096 tall and another 1920.
    """
    subprocess.run(
        f'{ff()} -y -t {seconds} -i "{src}" '
        f'-vf "scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},setsar=1" '
        f'-an -c:v libx264 -preset veryfast -crf 23 -pix_fmt yuv420p "{dst}"',
        shell=True, check=True, capture_output=True,
    )


def main():
    which = sys.argv[1] if len(sys.argv) > 1 else "story"
    if which not in QUERY_SETS:
        sys.exit(f"unknown set {which!r} — choose from {', '.join(QUERY_SETS)}")
    queries = QUERY_SETS[which]
    print(f"set: {which}  ({len(queries)} queries x {PER_QUERY})")
    api_key = key()
    os.makedirs(ASSETS, exist_ok=True)
    made, skipped, failed = [], 0, []
    seen = existing_hashes()   # md5 -> filename, grows as we add

    for prefix, query in queries.items():
        try:
            videos = search(api_key, query, PER_QUERY + 8)
        except Exception as e:
            failed.append(f"{prefix}: search failed — {e}")
            continue

        n = 0
        for v in videos:
            if n >= PER_QUERY:
                break
            name = f"{prefix}{n + 1}.mp4"
            out = os.path.join(ASSETS, name)
            if os.path.exists(out):
                skipped += 1
                n += 1
                continue

            f = best_file(v)
            tmp = os.path.join("/tmp", f"pex_{v['id']}.mp4")
            try:
                download(f["link"], tmp)
                normalise(tmp, out, min(MAX_SECONDS, max(3, v.get("duration") or 6)))
                digest = hashlib.md5(open(out, "rb").read()).hexdigest()
                if digest in seen:
                    # Same footage already in the library under another name.
                    # Drop it and let the next candidate take this slot.
                    os.remove(out)
                    failed.append(f"{name}: duplicate of {seen[digest]} (pexels id {v['id']}), skipped")
                    continue
                seen[digest] = name
                made.append(f"{name}  ({f['width']}x{f['height']} -> {W}x{H}, pexels id {v['id']})")
                n += 1
            except Exception as e:
                failed.append(f"{name}: {e}")
            finally:
                if os.path.exists(tmp):
                    os.remove(tmp)

    print(f"\nnew: {len(made)}   already present: {skipped}   failed: {len(failed)}\n")
    for m in made:
        print("  +", m)
    for f in failed:
        print("  !", f)


if __name__ == "__main__":
    main()
