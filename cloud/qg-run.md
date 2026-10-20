# The Quiet Grind slot runner

The caller gives you SLOT, 0 to 5. Everything else is here.

## Fetching this file

Read it with `curl`, not WebFetch. WebFetch summarises and refuses to reproduce
a long file verbatim on quote limits, which cost the 09:05 plane run a turn on
17 Oct before it fell back to curl. Use:

    curl -sS https://raw.githubusercontent.com/hydercr7juv-dev/wdpdt-pipeline/main/cloud/qg-run.md -o /tmp/run.md -w '%{http_code}
'

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

## 1. Verify the channel FIRST. Mandatory.

This comes first because it also supplies the number the script index needs.

    account : youtube_combed-mero
    channel : UCc1UHI5kNuquWr4Hy5tpUYw   (The Quiet Grind, @thequietgrind7861)

    res, err = run_composio_tool("YOUTUBE_GET_CHANNEL_STATISTICS", {"mine": True},
                                 account="youtube_combed-mero")
    # -> data.channels[0].id and data.channels[0].statistics.videoCount

If the id is not UCc1UHI5kNuquWr4Hy5tpUYw, STOP and report what you got. Never
try another account. A DIFFERENT channel is also called The Quiet Grind
(UCVXCxe5iBzDvYvf69nI1uVw, handle @thequietgrind) and is not this one.

If this fails with 403 quotaExceeded or 429, the shared pool is dry. Say so and
stop before building anything.

Keep `videoCount` as an integer. You need it next.

## 2. Pick the script from the video count, not the date

    import requests
    bank = requests.get('https://raw.githubusercontent.com/hydercr7juv-dev/wdpdt-pipeline/main/content/quiet-grind-scripts.json', timeout=60).json()['bank']
    index = int(videoCount) - 4
    print('index', index, 'of', len(bank))

**Why not the date.** It used to be `days_since_epoch * 6 + SLOT`. On 18 and 19
October every run was rejected before it started, because the Claude account hit
its weekly limit, and since the index came from the calendar, indices 6 to 17
were silently skipped and would never have posted. Twelve finished scripts lost
to two bad days. Counting published videos is self-correcting: a day that fails
costs nothing, because the count does not move.

The 4 is the channel's video count when the bank was rewritten on 20 October,
with the three already-published scripts removed from it. So `videoCount - 4` is
the next unpublished script. Do not change that number unless the bank is
rewritten again.

**If index < 0 or index >= len(bank), STOP** and report that the bank needs more
scripts written. Never wrap, never clamp, never invent one.

**Duplicate guard.** The six slots run 30 minutes apart and a build takes about
five, so the previous video is normally live before the next run reads the count.
If two runs ever do collide they would compute the same index, so check before
posting: list the channel's recent uploads (the uploads playlist via
YOUTUBE_LIST_PLAYLIST_ITEMS, or whichever list tool this connection exposes —
search the available tools rather than guessing a name) and compare titles. If
`bank[index]['hook']` is already published, step FORWARD to the next index whose
hook is not, and say in the report that you skipped and why. Never step
backwards and never post a hook twice: a repeated topic measurably halved views
on the plane channel. If no list tool is available, note that in the report and
continue — the count arithmetic is still the primary mechanism.

SCRIPT   = bank[index]['script'] VERBATIM. Do not rewrite, shorten, lengthen or
add a sign off. It is already timed to about 30 seconds at this voice and rate.
EMPHASIS = bank[index]['emphasis'].split(', ')
TITLE    = bank[index]['hook'] + ' #Shorts'   (under 100 characters)

There is no call to action on this channel yet. Do not add one, do not mention a
product, link or bio. The audience comes first.

## 3. Build, in the background, then poll

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
        open("/tmp/done","w").write("ERR\
"+traceback.format_exc()[-500:])
    ''')
    subprocess.Popen("nohup python3 /tmp/build.py > /tmp/b.log 2>&1 &", shell=True)

CLIPS: EIGHT, matched to `bank[index]['keywords']`.

**Only the clips in this list.** The look is one person training alone in the
dark. Every clip here was checked by eye: nothing in daylight, nothing with a
second person in shot, nothing from a busy gym.

  qg_dpush1 qg_dcore1 qg_dcore2 qg_dpull1
  qg_dpull2 qg_drope1 qg_drope2 qg_dbag1
  qg_dbox1 qg_dlift1 qg_dlift2 qg_dstairs2
  qg_dtread2 qg_dwindow1 qg_dwindow2 qg_ddesk1
  qg_ddesk2 qg_skipping1 qg_skipping2 qg_shadowbox1
  qg_weights2 qg_nightgym2 qg_nightwalk1 qg_nightwalk2
  qg_nightcity1 qg_nightcity2 qg_nightdesk2

All need the `.mp4` extension. Repeating a clip inside one video is fine; vary
them between runs so the channel does not look like a single loop.

**Do not use any other `qg_` clip.** The original library still sits in the repo
(qg_sunrise, qg_alarm, qg_calendar, qg_tidydesk, qg_books, qg_crowd, qg_street,
qg_city, qg_door, qg_train, qg_road, qg_rest, qg_laptop, qg_writing,
qg_desklamp, qg_rainwindow, qg_clock, qg_phoneglow, qg_scroll, qg_stairs) and is
deliberately retired: it was too soft and too crowded for this voice. Never an
aviation, `sci_`, `story_` or `shop_` clip either.

The look is ordinary effort, not rented wealth. There are no supercars or
watches here on purpose: stock luxury with an AI voice is the most duplicated
format on Shorts and is what YouTube's inauthentic content policy targets.

If `/tmp/done` says ERR, read the traceback, fix it (usually a wrong clip name)
and retry ONCE. Twice failed: report the exact error and stop.

## 4. Upload

    up, _ = upload_local_file("/tmp/out.mp4")
    run_composio_tool("YOUTUBE_MULTIPART_UPLOAD_VIDEO", {
        "videoFile": {"s3key": up["s3key"], "name": "short.mp4", "mimetype": "video/mp4"},
        "title": TITLE,
        "description": <one or two sentences from the script's own idea> + "

#shorts #discipline #focus #study #motivation #habits",
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
