# The Quiet Grind slot runner

The caller gives you SLOT, 0 to 5. Everything else is here.

## Fetching this file

Read it with `curl`, not WebFetch. WebFetch summarises and refuses to reproduce
a long file verbatim on quote limits, which cost the 09:05 plane run a turn on
17 Oct before it fell back to curl. Use:

    curl -sS https://raw.githubusercontent.com/hydercr7juv-dev/wdpdt-pipeline/main/cloud/qg-run.md -o /tmp/run.md -w '%{http_code}\n'

then read /tmp/run.md. A status other than 200 means STOP and report.

Generate ONE Quiet Grind Short and post it to YouTube. Then stop.

The channel is thirty second scripts on discipline, attention and time, aimed at
14 to 19 year olds. Calm and blunt. Never shouts, never says hustle or grindset,
never uses a famous quote.

EVERYTHING happens inside COMPOSIO_REMOTE_WORKBENCH. Load it with ToolSearch
(query: COMPOSIO_REMOTE_WORKBENCH). Do not render in the routine sandbox.

## Why all six runs sit between 07:00 and 10:00 UTC

The YouTube upload quota belongs to Composio's shared Google Cloud project, used
by every Composio customer. It refills about 07:00 UTC and other people's
traffic drains it within a few hours. Runs later in the day failed with 403
quotaExceeded and 429. Six separate routines now fire inside that window; they
are separate routines because one routine cannot fire more often than hourly.

If anything returns 403 quotaExceeded or 429, the pool is dry. Name the script
that was lost, say the quota caused it, and stop. Do not retry or switch account.

## 1. Script

    import requests, datetime
    bank = requests.get('https://raw.githubusercontent.com/hydercr7juv-dev/wdpdt-pipeline/main/content/quiet-grind-scripts.json', timeout=60).json()['bank']
    days  = (datetime.datetime.now(datetime.timezone.utc).date() - datetime.date(2026, 10, 17)).days
    index = days * 6 + SLOT
    print('index', index, 'of', len(bank))

**If index < 0 or index >= len(bank), STOP** and report that the bank is empty
and needs more scripts written. Never wrap, never clamp, never invent one.

SCRIPT   = bank[index]['script'] VERBATIM. Do not rewrite, shorten, lengthen or
add a sign off. It is already timed to about 30 seconds at this voice and rate.
EMPHASIS = bank[index]['emphasis'].split(', ')
TITLE    = bank[index]['hook'] + ' #Shorts'   (under 100 characters)

There is no call to action on this channel yet. Do not add one, do not mention a
product, link or bio. The audience comes first.

## 2. Build, in the background, then poll

Poll with ONE short sleep per call: `time.sleep(30)`, print whether /tmp/done
exists, nothing more. The whole workbench call must return within 45 seconds.

Do NOT write a retry loop inside a single call. `for _ in range(4):
time.sleep(30)` totals 120 seconds and the MCP gateway kills the call at 60
("timed out after 60s"). Every run on 17 Oct lost a turn to exactly that, on
both the plane and the What If Labs routines. One sleep per call, then return.

    import subprocess, json
    subprocess.run("pip install -q edge-tts imageio-ffmpeg", shell=True, timeout=600)
    subprocess.run("pkill -9 -f build.py; pkill -9 -f ffmpeg", shell=True)
    subprocess.run("rm -f /tmp/done /tmp/out.mp4 /tmp/src_* /tmp/scene_* /tmp/caps_*", shell=True)
    subprocess.run("curl -sfL -o /tmp/ms.py https://raw.githubusercontent.com/hydercr7juv-dev/wdpdt-pipeline/main/cloud/make_short.py", shell=True)
    json.dump({"script": SCRIPT, "emph": EMPHASIS, "clips": CLIPS}, open("/tmp/job.json","w"))
    open("/tmp/build.py","w").write('''
    import sys, json, traceback
    sys.path.insert(0,"/tmp")
    import ms
    j=json.load(open("/tmp/job.json"))
    try:
        ms.build(j["script"], j["emph"], j["clips"], out="/tmp/out.mp4")
        open("/tmp/done","w").write("OK")
    except Exception:
        open("/tmp/done","w").write("ERR\\n"+traceback.format_exc()[-500:])
    ''')
    subprocess.Popen("nohup python3 /tmp/build.py > /tmp/b.log 2>&1 &", shell=True)

CLIPS: EIGHT, matched to `bank[index]['keywords']`. ONLY clips beginning `qg_`.
Never an aviation, `sci_`, `story_` or `shop_` clip.

  qg_sunrise1 qg_sunrise2 qg_alarm1 qg_alarm2 qg_desklamp1 qg_desklamp2
  qg_writing1 qg_writing2 qg_rainwindow1 qg_rainwindow2 qg_train1 qg_street1
  qg_street2 qg_crowd1 qg_phoneglow1 qg_phoneglow2 qg_scroll1 qg_scroll2
  qg_gym1 qg_gym2 qg_running1 qg_running2 qg_stairs1 qg_stairs2 qg_laptop1
  qg_laptop2 qg_books1 qg_books2 qg_clock1 qg_clock2 qg_calendar1 qg_calendar2
  qg_door1 qg_door2 qg_road1 qg_rest1 qg_city1 qg_city2 qg_tidydesk1 qg_tidydesk2

All need the `.mp4` extension. The look is ordinary life, not rented wealth:
stock luxury with an AI voice is the most duplicated format on Shorts and is
what YouTube's inauthentic content policy targets.

If `/tmp/done` says ERR, read the traceback, fix it (usually a wrong clip name)
and retry ONCE. Twice failed: report the exact error and stop.

## 3. Verify the channel BEFORE uploading. Mandatory.

    account : youtube_combed-mero
    channel : UCc1UHI5kNuquWr4Hy5tpUYw   (The Quiet Grind, @thequietgrind7861)

YOUTUBE_GET_CHANNEL_STATISTICS `{"mine": true}` with that account. If the id
differs, STOP and report what you got. Never try another account. A DIFFERENT
channel is also called The Quiet Grind (UCVXCxe5iBzDvYvf69nI1uVw, handle
@thequietgrind) and is not this one.

## 4. Upload

    up, _ = upload_local_file("/tmp/out.mp4")
    run_composio_tool("YOUTUBE_MULTIPART_UPLOAD_VIDEO", {
        "videoFile": {"s3key": up["s3key"], "name": "short.mp4", "mimetype": "video/mp4"},
        "title": TITLE,
        "description": <one or two sentences from the script's own idea> + "\n\n#shorts #discipline #focus #study #motivation #habits",
        "tags": ["shorts","discipline","focus","study","habits","motivation"],
        "categoryId": "27", "privacyStatus": "public"
    }, account="youtube_combed-mero")

`videoFile` must be an OBJECT. Category 27 is Education, the honest category and
the one that keeps this out of the entertainment pool where the recycled
motivation accounts sit.

Confirm it processed: wait ~25s then YOUTUBE_GET_VIDEO_DETAILS_BATCH
`{"id": [vid], "parts": ["status","processingDetails"]}`. Anything other than
processed or succeeded means rejected: say so and give the id.

## 5. Report

Index used and how many remain, slug and hook, video id, URL, processing status,
clips used, confirmed channel id. If nothing posted, say exactly why. If fewer
than 6 scripts remain, say so loudly: the channel stops rather than repeats.
