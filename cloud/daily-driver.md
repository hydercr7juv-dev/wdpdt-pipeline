# WDPDT daily GENERATOR + poster — run these steps exactly, once per day

You AUTONOMOUSLY create brand-new plane Shorts and schedule them to post. Be idempotent. Work ONLY in the current working directory (a checkout of the wdpdt-pipeline repo) — do not cd elsewhere. Tools: `/opt/homebrew/bin/gcloud`, `python3 -m edge_tts`, `afinfo`, git, RemoteTrigger.

Config: BUCKET=`wdpdt-media-71552573513`, SA=`wdpdt-uploader@wdpdt-506016.iam.gserviceaccount.com`, ENV=`env_01M5JJDn8E9FCVeBeAWtuPiP`, ACCOUNT=`planes`, N = 2 (videos to make today), SLOTS_UTC = [10, 16].

## 1. Setup + idempotency
- `TODAY=$(date -u +%F)`, `NOWH=$(date -u +%-H)`. Run `git pull --quiet`.
- ToolSearch `select:RemoteTrigger`; `RemoteTrigger action=list`. If any routine name contains `WDPDT auto <TODAY>`, STOP (already done today).

## 2. Generate N brand-new videos
List existing topics: `ls src/videos/*.ts`. Each file is an already-used topic — do NOT repeat any of them. For each of N new videos:

a. **Invent a fresh, true, surprising plane/aviation "why" topic** not already covered. Pick a `slug` (lowercase, e.g. `contrails`) and a `CompId` (PascalCase, e.g. `Contrails`).

b. **Write a ~28–36s script** in this exact formula (one paragraph, plain ASCII, no line breaks):
   "Why [surprising question]? Some people think [wrong guess]. But that's not actually why. [2–3 sentences of the real mechanical explanation.] [One stakes/consequence sentence.]"
   Save it to `/tmp/<slug>.txt`.

c. **Voiceover (free Andrew):** `python3 -m edge_tts --voice en-US-AndrewMultilingualNeural --rate "+12%" --file /tmp/<slug>.txt --write-media public/assets/vo_<slug>.mp3`. Get its duration: `afinfo public/assets/vo_<slug>.mp3 | grep 'estimated duration'` → DUR (seconds, float).

d. **Write the spec** `src/videos/<slug>.ts`. Copy the shape of an existing file like `src/videos/windowHole.ts` EXACTLY (same imports/export), changing: `id: "<CompId>"`, `title`, `voFile: "assets/vo_<slug>.mp3"`, `audioDuration: <DUR>`, `script` (same text as /tmp/<slug>.txt), `emphasis` (10–20 vivid keywords from the script, lowercased), and `scenes`: ~9–10 cuts of ~3–4s covering 0→(DUR+0.5), each using one of the ONLY available clips in public/assets — `cabin.mp4`, `window.mp4`, `citynight.mp4`, `runway.mp4`, `takeoff.mp4`, `eye.mp4` — pick the clips that best match the sentence, vary `startFrom` (1–18), and make the last scene end at DUR+0.5.

e. **Register it:** add the import and the array entry to `src/Root.tsx` (follow the existing pattern).

f. Verify TypeScript is still valid: `npx tsc --noEmit -p tsconfig.json` (if it errors on your new files, fix them).

Commit everything: `git add -A && git commit -m "generate <TODAY>: <slugs>" && git push --quiet`.

## 3. Schedule the cloud posts
For each new video i (slot H = SLOTS_UTC[i]; if H<=NOWH use H2=NOWH+1+i else H2=H; RUNAT=`<TODAY>T<H2 padded>:00:00Z`):
- `PUT=$(/opt/homebrew/bin/gcloud storage sign-url gs://BUCKET/renders/<slug>.mp4 --impersonate-service-account=SA --http-verb=PUT --region=us --duration=12h --format='value(signed_url)')` and same with `--http-verb=GET` → GET.
- `RemoteTrigger action=create` with this body (fresh v4 uuid; TITLE/DESCRIPTION from the script — description = a 1–2 sentence hook + " #Shorts #aviation #planes #flying #didyouknow"; TAGS = "aviation, planes, shorts, did you know, flying"):
  ```
  {"name":"WDPDT auto <TODAY> <CompId>","run_once_at":"<RUNAT>","enabled":true,"job_config":{"ccr":{"environment_id":"env_01M5JJDn8E9FCVeBeAWtuPiP","session_context":{"model":"claude-sonnet-5","allowed_tools":["Bash","Read","Write"]},"events":[{"data":{"uuid":"<uuid>","session_id":"","type":"user","parent_tool_use_id":null,"message":{"role":"user","content":"Run the cloud video pipeline. First: git clone https://github.com/hydercr7juv-dev/wdpdt-pipeline /tmp/wdpdt . Then open /tmp/wdpdt/cloud/PIPELINE.md and execute EVERY step exactly, substituting: COMPOSITION = <CompId> ; TITLE = <TITLE> ; DESCRIPTION = <DESCRIPTION> ; TAGS = aviation, planes, shorts, did you know, flying ; PRIVACY = public ; SIGNED_PUT_URL = <PUT> ; SIGNED_GET_URL = <GET> . Report every step result and the final YouTube video id. Keep going even if a step fails and report the exact error."}}}]}}}
  ```
  Keep each URL inline exactly, no line breaks inside it.

## 4. Report
One line per video: slug, CompId, run time UTC, routine id. Note anything that failed.
