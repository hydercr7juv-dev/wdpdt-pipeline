# WDPDT slot runner

The caller gives you SLOT, a number 0 to 5. Everything else is here.

Generate ONE brand-new aviation Short and post it to YouTube. Then stop.

EVERYTHING happens inside COMPOSIO_REMOTE_WORKBENCH, the only sandbox that
reaches the voice endpoint and the uploader. Load it with ToolSearch (query:
COMPOSIO_REMOTE_WORKBENCH). Do not render in the routine sandbox.

## Why the six runs are packed into 07:05 to 08:45

The YouTube upload quota belongs to Composio's shared Google Cloud project,
used by every Composio customer. It refills about 07:00 UTC and other people's
traffic drains it within roughly two hours. Runs later in the day failed all
day with 403 quotaExceeded: across 15 and 16 October the only uploads that got
through were at 08:2x and 09:2x, one a day instead of six.

Six separate routines now fire 20 minutes apart inside that window. They are
separate routines because a single routine cannot fire more often than hourly.

If anything returns 403 quotaExceeded or 429, the pool is already dry. Name the
topic that was lost, say the quota caused it, and stop. Do not retry, do not
wait, do not switch account.

## 1. Topic

    import requests, datetime
    bank = requests.get('https://raw.githubusercontent.com/hydercr7juv-dev/wdpdt-pipeline/main/content/question-bank.json', timeout=60).json()['bank']
    days  = (datetime.datetime.now(datetime.timezone.utc).date() - datetime.date(2026, 10, 17)).days
    index = days * 6 + SLOT
    print('index', index, 'of', len(bank))

Use `bank[index]`, which has `slug`, `question`, `keywords`.

**If index < 0 or index >= len(bank), STOP** and report that the bank needs more
topics. Never wrap, never clamp, never invent a topic.

The index runs forward and never wraps on purpose. The old prompt used
`(day_of_year * 6 + slot) % 30`, cycling a 30 topic list every five days. It
produced three cabin pressure videos in ten days, two luggage videos and two
taxi-on-one-engine videos. The first upload on a topic got 10,404 views and each
retread about 2,400, because they split the same audience. The bank holds 119
unused topics, about twenty days at six a day.

## 2. Script

Question hook -> "Some people think X" -> "But that's not actually why" -> the
mechanism, plainly -> a short stakes line to close.

85 to 100 words for that body. Plain spoken English, British spelling. Every
factual claim must be one you are confident is true; if unsure of a number, stay
qualitative rather than invent one.

Then append a space and this sentence, WORD FOR WORD, as the last thing:

    Also guys, if you are a nervous flyer, I have made a PDF guide that explains every noise on a flight, gate to landing, and why the crew are never worried. Link in my bio.

It sells whydoplanesdothat.gumroad.com/l/nervous-flyer, linked in the channel
bio. Do not reword it and do not move it earlier: a plug mid-script costs
retention at exactly the moment the explanation lands. It adds about 10 seconds,
so the finished video runs around 34 seconds. That is intended.

Pick 18 to 24 EMPHASIS words (nouns, numbers, pivot words) including "nervous",
"flyer", "guide" and "bio". They render yellow.

## 3. Build, in the background, then poll

The build outlives the 60 second tool timeout. Run it in the BACKGROUND and poll
in short calls. Keep every sleep under 45 seconds; 60 hits the timeout.

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

CLIPS: pick EIGHT, aviation only. Never a clip starting with `sci_`, `story_`,
`shop_` or `qg_`; those belong to other channels and would look wrong here.

  apron.mp4 apronplanes.mp4 beltoff.mp4 boardsteps.mp4 cabin.mp4 citynight.mp4
  climbout.mp4 clouds.mp4 clouds2.mp4 cockpit.mp4 depboard.mp4 engine.mp4 eye.mp4
  gate.mp4 jets.mp4 landing.mp4 passenger.mp4 planeview.mp4 runway.mp4
  seatbelt.mp4 skyplane.mp4 suitcases.mp4 sunsetflight.mp4 takeoff.mp4
  taxiqueue.mp4 terminal.mp4 window.mp4 windowseat.mp4

Repeating a clip is fine. Open on a shot that visually answers the hook.

If `/tmp/done` says ERR, read the traceback, fix the cause (usually a wrong clip
filename) and retry ONCE. If it fails twice, report the exact error and stop.
Never post a broken file.

## 4. Verify the channel BEFORE uploading. Mandatory.

Several Composio accounts resolve to the WRONG channel. This has caused real
mistakes.

    account : planes
    channel : UCcdxIkAxSDYZmxkDT97rLyg   (Why Do Planes Do That)

Run YOUTUBE_GET_CHANNEL_STATISTICS `{"mine": true}` with account `planes`. If
the id is not UCcdxIkAxSDYZmxkDT97rLyg, STOP and report what you got. Never try
another account.

If this check itself fails with 403 quotaExceeded, the pool is dry and the
upload will fail too. Report it and stop before building anything.

## 5. Upload

    up, _ = upload_local_file("/tmp/out.mp4")
    run_composio_tool("YOUTUBE_MULTIPART_UPLOAD_VIDEO", {
        "videoFile": {"s3key": up["s3key"], "name": "short.mp4", "mimetype": "video/mp4"},
        "title": <title> + " #Shorts",
        "description": <payoff in a sentence or two> + "\n\nNervous flyer? Every noise on a flight explained, gate to landing: https://whydoplanesdothat.gumroad.com/l/nervous-flyer\n\n#shorts #aviation #planes #flying #avgeek",
        "tags": ["shorts","aviation","planes","flying","avgeek"],
        "categoryId": "28", "privacyStatus": "public"
    }, account="planes")

`videoFile` must be an OBJECT, not a string. Title under 100 characters.

Then confirm it processed. A returned id does NOT mean success; YouTube silently
rejects files it cannot process. Wait about 25 seconds, then
YOUTUBE_GET_VIDEO_DETAILS_BATCH `{"id": [vid], "parts": ["status","processingDetails"]}`
with account `planes`. "processed" or "succeeded" is good. Anything else means
it was rejected: say so and give the id so it can be deleted.

## 6. Report

One paragraph: the index used and how many remain in the bank, the slug and
title, the video id, URL and processing status, the clips used, and the
confirmed channel id. If nothing posted, say exactly why, naming the quota if
that was the cause. If fewer than 12 topics remain, say so clearly.
