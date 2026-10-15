# WDPDT daily GENERATOR + poster — run these steps exactly, once per day

You AUTONOMOUSLY create brand-new plane Shorts and schedule them to post. Be idempotent. Work ONLY in the current working directory (a checkout of the wdpdt-pipeline repo) — do not cd elsewhere. Tools: `/opt/homebrew/bin/gcloud`, `python3 -m edge_tts`, `afinfo`, git, RemoteTrigger.

Config: BUCKET=`wdpdt-media-71552573513`, SA=`wdpdt-uploader@wdpdt-506016.iam.gserviceaccount.com`, ENV=`env_01M5JJDn8E9FCVeBeAWtuPiP`, ACCOUNT=`planes`, N = 2 (videos to make today), SLOTS_UTC = [10, 16].

## 1. Setup + idempotency
- `TODAY=$(date -u +%F)`, `NOWH=$(date -u +%-H)`. Run `git pull --quiet`.
- ToolSearch `select:RemoteTrigger`; `RemoteTrigger action=list`. If any routine name contains `WDPDT auto <TODAY>`, STOP (already done today).

## 2. Generate N brand-new videos

Do NOT invent topics. Inventing is what produced three separate "land into the wind"
videos and four "pushback" videos, which split each other's audience: the first upload
got 10,404 views and its retreads got about 2,400 each.

a. **Take the topics from the bank:** `node scripts/pick-topic.mjs <N>`. It prints N
   unused topics as JSON, each with a `slug`, a `question` and `keywords`. Use those
   exact slugs. `CompId` is the slug in PascalCase (`apuWhine` -> `ApuWhine`).

   If the bank is empty it exits non-zero and says so. In that case STOP and report
   that `content/question-bank.json` needs new topics. Never fall back to inventing.

b. **Before writing anything, verify the title is not a retread:**
   `node scripts/pick-topic.mjs --check "<your working title>"`.
   Exit 1 means it duplicates a published video: discard it and take the next topic
   from the bank. Exit 0 means proceed.

c. **Write a ~28–36s script** in this exact formula (one paragraph, plain ASCII, no line breaks):
   "Why [surprising question]? Some people think [wrong guess]. But that's not actually why. [2–3 sentences of the real mechanical explanation.] [One stakes/consequence sentence.]"

   Then append a space and this sentence, word for word, as the last thing in the script:

       Also guys, if you are a nervous flyer, go check the link in my bio.

   It sells the guide at whydoplanesdothat.gumroad.com/l/nervous-flyer, which
   Hyder puts in the channel bio. Do not reword it and do not move it earlier:
   a mid-script plug costs retention at the exact moment the explanation is
   landing.

   **The CTA is about 5 seconds, so the body must be about 4 seconds shorter
   than it used to be.** Keep the FULL script, body plus CTA, inside 28 to 36
   seconds, which is roughly 85 to 105 words at this voice and rate. Letting the
   total grow instead would cost retention on every upload, which is a worse
   trade than a slightly tighter explanation.

   Save the whole thing, CTA included, to `/tmp/<slug>.txt`.

d. **Voiceover (free Andrew):** use this exact Python (it has edge-tts): `/Library/Frameworks/Python.framework/Versions/3.11/bin/python3 -m edge_tts --voice en-US-AndrewMultilingualNeural --rate "+12%" --file /tmp/<slug>.txt --write-media public/assets/vo_<slug>.mp3`. Get its duration: `afinfo public/assets/vo_<slug>.mp3 | grep 'estimated duration'` → DUR (seconds, float).

e. **Write the spec** `src/videos/<slug>.ts`. Copy the shape of an existing file like `src/videos/windowHole.ts` EXACTLY (same imports/export), changing: `id: "<CompId>"`, `title`, `voFile: "assets/vo_<slug>.mp3"`, `audioDuration: <DUR>`, `script` (same text as /tmp/<slug>.txt), `emphasis` (10–20 vivid keywords from the script, lowercased), and `scenes`: ~9–10 cuts of ~3–4s covering 0→(DUR+0.5), each using one of the ONLY available clips in public/assets — `cabin.mp4`, `window.mp4`, `citynight.mp4`, `runway.mp4`, `takeoff.mp4`, `eye.mp4` — pick the clips that best match the sentence, vary `startFrom` (1–18), and make the last scene end at DUR+0.5.

f. **Register it:** add the import and the array entry to `src/Root.tsx` (follow the existing pattern).

g. Verify TypeScript is still valid: `npx tsc --noEmit -p tsconfig.json` (if it errors on your new files, fix them).

h. **Mark each topic consumed** so tomorrow's run cannot pick it again:
   `node scripts/pick-topic.mjs --use <slug>` for every slug you built.

Commit everything: `git add -A && git commit -m "generate <TODAY>: <slugs>" && git push --quiet`.

## 3. Schedule the cloud posts
For each new video i (slot H = SLOTS_UTC[i]; if H<=NOWH use H2=NOWH+1+i else H2=H; RUNAT=`<TODAY>T<H2 padded>:00:00Z`):
- `PUT=$(/opt/homebrew/bin/gcloud storage sign-url gs://BUCKET/renders/<slug>.mp4 --impersonate-service-account=SA --http-verb=PUT --region=us --duration=12h --format='value(signed_url)')` and same with `--http-verb=GET` → GET.
- `RemoteTrigger action=create` with this body (fresh v4 uuid; TITLE/DESCRIPTION from the script; TAGS = "aviation, planes, shorts, did you know, flying"):

  DESCRIPTION is built as three parts, in this order, every time:
  1. a 1 to 2 sentence hook drawn from the script
  2. a blank line, then exactly this, unchanged:
     `Nervous flyer? Every noise explained, gate to landing: https://whydoplanesdothat.gumroad.com/l/nervous-flyer`
  3. a blank line, then ` #Shorts #aviation #planes #flying #didyouknow`

  Part 2 is not optional and is not to be reworded. The channel has 189 videos
  and 304,000 views that carried no link at all, which is the whole reason the
  guide has sold nothing. Every new upload is a permanent doorway to it.
  ```
  {"name":"WDPDT auto <TODAY> <CompId>","run_once_at":"<RUNAT>","enabled":true,"job_config":{"ccr":{"environment_id":"env_01M5JJDn8E9FCVeBeAWtuPiP","session_context":{"model":"claude-sonnet-5","allowed_tools":["Bash","Read","Write"]},"events":[{"data":{"uuid":"<uuid>","session_id":"","type":"user","parent_tool_use_id":null,"message":{"role":"user","content":"Run the cloud video pipeline. First: git clone https://github.com/hydercr7juv-dev/wdpdt-pipeline /tmp/wdpdt . Then open /tmp/wdpdt/cloud/PIPELINE.md and execute EVERY step exactly, substituting: COMPOSITION = <CompId> ; TITLE = <TITLE> ; DESCRIPTION = <DESCRIPTION> ; TAGS = aviation, planes, shorts, did you know, flying ; PRIVACY = public ; SIGNED_PUT_URL = <PUT> ; SIGNED_GET_URL = <GET> . Report every step result and the final YouTube video id. Keep going even if a step fails and report the exact error."}}}]}}}
  ```
  Keep each URL inline exactly, no line breaks inside it.

## 4. Report
One line per video: slug, CompId, run time UTC, routine id. Note anything that failed.
