# WDPDT daily poster — run these steps exactly, once per day

You schedule today's YouTube Shorts for the "Why Do Planes Do That" channel. Be idempotent: if today is already scheduled, do nothing. Work ONLY in the current working directory (a checkout of the wdpdt-pipeline repo) — do not cd elsewhere. Use the gcloud at `/opt/homebrew/bin/gcloud`.

## 1. Today + freshest manifest
- `TODAY=$(date -u +%F)` and `NOWH=$(date -u +%-H)` (current UTC hour).
- `git pull --quiet` to get the latest manifest, then Read `content/manifest.json`.

## 2. Idempotency
- Load the scheduler: ToolSearch `select:RemoteTrigger`. Call `RemoteTrigger action=list`.
- If ANY routine's name contains `WDPDT auto <TODAY>`, today is already handled — report "already scheduled for <TODAY>" and STOP. Do nothing else.

## 3. Pick today's videos (fresh only — never re-post recent content)
- Eligible = videos whose `last_posted` is empty OR strictly more than 10 days before TODAY. (This prevents duplicate re-uploads, which YouTube penalises.)
- Sort eligible by `last_posted` ascending (empty first). Take the first `manifest.cadence_per_day`. These are today's picks, paired in order with `manifest.slot_hours_utc`.
- If there are NO eligible videos, schedule nothing, print `NO_FRESH_CONTENT — add more videos to content/manifest.json`, and STOP (this is a normal state, not an error).

## 4. For each picked video (index i, slot hour H = slot_hours_utc[i])
a. If H <= NOWH (slot already passed today), set the run time to `H2 = NOWH + 1 + i` instead (spread the rest of today). Otherwise H2 = H. Build `RUNAT = <TODAY>T<H2 zero-padded>:00:00Z`.
b. Generate two 12-hour signed links (substitute BUCKET=`manifest.bucket`, SA=`manifest.service_account`, OBJ=`video.object`):
   ```
   PUT=$(/opt/homebrew/bin/gcloud storage sign-url gs://BUCKET/renders/OBJ.mp4 --impersonate-service-account=SA --http-verb=PUT --region=us --duration=12h --format='value(signed_url)')
   GET=$(/opt/homebrew/bin/gcloud storage sign-url gs://BUCKET/renders/OBJ.mp4 --impersonate-service-account=SA --http-verb=GET --region=us --duration=12h --format='value(signed_url)')
   ```
c. Create the scheduled post with `RemoteTrigger action=create`. Use this EXACT body, filling the slots (generate a fresh lowercase v4 uuid for each). Get the URLs, TITLE, DESCRIPTION, TAGS from the video entry; PRIVACY is `public`:
   ```
   {"name":"WDPDT auto <TODAY> <video.id>","run_once_at":"<RUNAT>","enabled":true,
    "job_config":{"ccr":{"environment_id":"env_01M5JJDn8E9FCVeBeAWtuPiP",
      "session_context":{"model":"claude-sonnet-5","allowed_tools":["Bash","Read","Write"]},
      "events":[{"data":{"uuid":"<fresh-uuid>","session_id":"","type":"user","parent_tool_use_id":null,
        "message":{"role":"user","content":"Run the cloud video pipeline. First: git clone https://github.com/hydercr7juv-dev/wdpdt-pipeline /tmp/wdpdt . Then open /tmp/wdpdt/cloud/PIPELINE.md and execute EVERY step exactly, substituting: COMPOSITION = <video.id> ; TITLE = <video.title> ; DESCRIPTION = <video.description> ; TAGS = <video.tags> ; PRIVACY = public ; SIGNED_PUT_URL = <PUT> ; SIGNED_GET_URL = <GET> . Report every step result and the final YouTube video id. Keep going even if a step fails and report the exact error."}}}]}}}
   ```
   The message content is ONE JSON string — keep the URLs inline exactly, no line breaks inside them.
d. In the manifest object, set that video's `last_posted = <TODAY>`.

## 5. Save state
- Write the updated `content/manifest.json`. Then: `git add content/manifest.json && git commit -m "daily: scheduled <TODAY>" && git push --quiet`.

## 6. Report
- One line per scheduled video: id, run time (UTC), and the routine id returned. If the manifest had fewer fresh-enough videos than the cadence, schedule what you can and note it.
