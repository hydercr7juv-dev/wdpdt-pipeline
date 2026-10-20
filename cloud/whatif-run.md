# What If Labs slot runner

The caller gives you SLOT, 0 to 5. Everything else is here.

## Fetching this file

Read it with `curl`, not WebFetch. WebFetch summarises and refuses to reproduce
a long file verbatim on quote limits, which cost the 09:05 plane run a turn on
17 Oct before it fell back to curl. Use:

    curl -sS https://raw.githubusercontent.com/hydercr7juv-dev/wdpdt-pipeline/main/cloud/whatif-run.md -o /tmp/run.md -w '%{http_code}\n'

then read /tmp/run.md. A status other than 200 means STOP and report.

Generate ONE What If Labs Short and post it to YouTube AND Instagram. Then stop.

EVERYTHING happens inside COMPOSIO_REMOTE_WORKBENCH. Load it with ToolSearch
(query: COMPOSIO_REMOTE_WORKBENCH). Do not render in the routine sandbox.

## Why the runs sit between 07:00 and 10:00 UTC

Two separate ceilings, both real.

The **YouTube upload quota** belongs to Composio's shared Google Cloud project
(`project_number:1068312718386`), used by every Composio customer. It refills
about 07:00 UTC and other people's traffic drains it through the day, so runs
later on hit 403 quotaExceeded.

The **Claude weekly limit** is the one that actually stopped everything. On 18
and 19 October all three channels produced nothing: every run was rejected in
under ten seconds with `rate_limit: rejected (seven_day)`. Eighteen agent runs a
day was more than the plan sustains, so on 20 October this channel dropped to
three a day while the plane channel kept six.

## 1. Verify the accounts FIRST, then pick the topic

The YouTube check comes first because it also supplies the number the topic
index needs.

    YouTube  : youtube_elt-gentoo        -> UCjcSxwyu8ecxyu5-0rGDKIA
    Instagram: instagram_damson-ruffle   -> what_if_labs1

  - YOUTUBE_GET_CHANNEL_STATISTICS {"mine": true}, account=youtube_elt-gentoo
    Keep `data.channels[0].statistics.videoCount` as an integer.
  - INSTAGRAM_GET_USER_INFO {"ig_user_id": "me"}, account=instagram_damson-ruffle

A failed check skips THAT platform only. Never fall back to another account.
403 quotaExceeded or 429 on YouTube means the shared pool is dry: skip YouTube,
say so, and still post to Instagram, whose quota is separate.

Then:

    index = int(videoCount) - 152

**Why the video count and not the date.** It used to be
`day_of_year * 6 + slot`. On 18 and 19 October every run was rejected before it
started because the Claude account hit its weekly limit, and a calendar index
silently skips the topics belonging to a dead day — they are simply never
posted. Counting published videos is self-correcting: a failed day costs
nothing, because the count does not move.

152 is this channel's video count on 20 October, when the bank was rewritten to
contain only unpublished topics. Do not change it unless the bank is rewritten.

**If index < 0 or index >= 84, STOP** and report that the bank needs extending.
Never wrap, never clamp, never invent a topic.

**Duplicate guard.** Before building, list the channel's recent uploads (its
uploads playlist, or whichever list tool this connection exposes — search the
available tools rather than guessing a name) and compare titles. If the topic at
`index` is already published, step FORWARD to the next one that is not, and say
so in the report. Never step backwards. If no list tool is available, note that
and continue.

**Every topic here is one this channel has never published.** The original 36
were removed on 20 October. The old `% 36` had published them over and over and
the damage is measurable: "What If You Fell Into a Black Hole" went out five
times for 518, 394, 16, 8 and 1 views; "The Sun Were a Red Dwarf" four times for
944, 9, 7 and 5. The first upload of a topic earns; every retread dies. Never
re-add them and never wrap this list.

  0 you were exposed to space without a suit (vacuum is not the instant freeze films show; it is pressure)
  1 the Earth had no tilt (no seasons; climate bands fixed by latitude forever)
  2 Venus and Earth swapped orbits (runaway greenhouse is about the atmosphere, not only distance)
  3 you drank a glass of neutron star material (density, and why it cannot exist outside the star)
  4 the Atlantic conveyor stopped (ocean currents move heat; northern Europe depends on it)
  5 you stood at the bottom of the Mariana Trench (over a thousand atmospheres of pressure)
  6 Saturn passed close to Earth (tidal forces, and the scale people get wrong)
  7 the Sun became a red giant (it will; Earth's fate depends on orbital drift too)
  8 you could travel to the centre of the Sun (plasma, pressure, and why light takes so long to escape)
  9 lightning struck the same place constantly (tall conductors do get struck repeatedly)
 10 Earth were tidally locked to the Sun (one burning face, one frozen, a habitable ring between)
 11 there were no friction (nothing would start or stop; walking would be impossible)
 12 you fell into Jupiter (crushing pressure long before any surface)
 13 all the world's water were one sphere (it is far smaller than people picture)
 14 a black hole the mass of a coin appeared (Hawking radiation; tiny ones evaporate violently)
 15 oxygen doubled in the atmosphere (fires spread far more easily; insects grew huge once before)
 16 the Earth's rotation slowed gradually (it is; days are getting longer, measurably)
 17 a star exploded nearby (a supernova's danger radius, and why we are not in one)
 18 you could fold a piece of paper fifty times (doubling, and the distance it reaches)
 19 you shouted for your whole life (how little energy sound actually carries)
 20 Antarctica had no ice (the land beneath is partly below sea level)
 21 we drilled straight through the crust (heat and pressure stop us long before the mantle)
 22 you were struck by a tiny meteorite (most burn up; the ones that land are slow)
 23 the Moon were closer (tides scale sharply; it is slowly moving away instead)
 24 you could breathe underwater (the oxygen dissolved in water is thousands of times less dense than air)
 25 all the clouds disappeared (clouds cool and warm; the net effect is the hard part)
 26 you could see atoms with your eyes (wavelength sets the limit, not magnification)
 27 Earth passed through a nebula (nebulae are emptier than any vacuum we can make)
 28 the Sun had a twin (many stars do; stable orbits are possible but narrow)
 29 you were inside a vacuum chamber with a feather and a hammer (they fall together; it was tested on the Moon)
 30 the Earth's atmosphere escaped slowly (lighter gases leave first; it is happening now)
 31 you could not feel pain (injuries would go unnoticed; the condition exists and is dangerous)
 32 we put a mirror on the Moon (we did; laser ranging measures the distance to millimetres)
 33 you swam in a pool on the Moon (lower gravity, higher splashes, slower waves)
 34 a comet hit the Sun (they do, regularly, and are destroyed)
 35 the seafloor stopped spreading (plate tectonics drives the carbon cycle and the mountains)
 36 you could stand on a neutron star (its gravity, and why nothing could keep a shape)
 37 Earth were in a different galaxy (the night sky, and what is visible from a dense cluster)
 38 all the sand in the world were counted (there are more stars than grains, by most estimates)
 39 you shone a torch at the Moon (how little light returns, and why we used mirrors)
 40 there were no greenhouse effect at all (Earth would freeze; the effect itself is not the problem)
 41 you fell into a volcano's crater lake (acid, heat, and dissolved gas)
 42 the ice caps froze over the whole planet (it happened; the escape route was volcanic carbon dioxide)
 43 you could run at the speed of sound (the sound barrier is about pressure, not a wall)
 44 a jet flew to the edge of the atmosphere (engines need air; above a point nothing works)
 45 we found a planet made of diamond (carbon-rich worlds, and what the claim really means)
 46 the Earth were flat and a disc (gravity would pull it into a sphere; it is unavoidable)
 47 you weighed yourself at the equator and the poles (rotation and shape change the reading slightly)
 48 all the trees were cut down (carbon, rainfall, and soil all fail together)
 49 the Sun stopped fusing hydrogen right now (pressure holds it up for a long time; light keeps arriving)
 50 you could see the Earth from Pluto (it is a dot beside the Sun's glare)
 51 you stood in a room of pure helium (voices, and the real danger, which is suffocation)
 52 the Earth had a second atmosphere layer of water (pressure and light would change everything)
 53 you were in freefall forever (orbit IS freefall; that is why astronauts float)
 54 the magnetic field doubled in strength (auroras, radiation shielding, and compasses)
 55 you could watch an ice age begin (orbital cycles; it takes thousands of years)
 56 all satellites failed at once (navigation, timing, and banking depend on them)
 57 a solar eclipse lasted a day (geometry; the shadow moves fast, and why)
 58 you touched lava with a stick (it does not splash; it is thick and slow)
 59 the Earth were hit by a glancing blow (the Moon probably formed exactly that way)
 60 you could stand inside a tornado's eye (pressure drop, and why it is not calm like a hurricane)
 61 the deepest ocean trench were filled in (nothing changes much; the volume is small)
 62 the Earth stopped orbiting the Sun (it would fall inward; how long that takes)
 63 the human eye could see infrared (we would see heat, and lose detail)
 64 you lived on a planet with no night (plants, sleep, and what tidal locking does)
 65 all the ice in Greenland melted alone (about seven metres of sea level rise)
 66 you could hear the Sun (it is loud; the vacuum is why you cannot)
 67 a planet had two suns setting (it exists; Kepler found circumbinary planets)
 68 the ozone layer vanished (ultraviolet reaching the surface, and the 1987 fix that worked)
 69 you tried to dig a hole to Australia (heat, pressure, and the deepest hole ever drilled)
 70 a hurricane formed over land (they need warm ocean water to feed on)
 71 the Earth had no water at all (plate tectonics and weather both depend on it)
 72 you could compress air without heating it (compression always heats; it is why pumps get hot)
 73 a space elevator were built (the material strength needed, and where it would anchor)
 74 the Moon were made of iron (its density is low; that is evidence of how it formed)
 75 you watched a star being born (gravity, collapse, and the moment fusion ignites)
 76 the Earth's day were a year long (one side bakes; the weather would be violent)
 77 all the carbon dioxide were removed (plants die first, then everything)
 78 you stood on Mars without a suit (the pressure is near the Armstrong limit)
 79 a river flowed uphill (siphons and pressure; it can look like it does)
 80 light had mass (it does carry momentum; solar sails work on that)
 81 the Sun were twice as massive (it would burn far hotter and far shorter)
 82 you could survive a lightning strike (many people do; the path matters more than the energy)
 83 the Earth were the only planet (no Jupiter means more impacts reaching us)
Use the topic at that index. Research nothing you are not sure of.

## 2. Write the script (house format, follow exactly)

Question hook -> "Some people think X" -> "But that's not what happens" -> the
mechanism, plainly -> a short closing line.

85 to 100 words for that body. Plain spoken English, British spelling. Every
factual claim must be one you are confident is true. If unsure of a number,
describe it qualitatively rather than inventing a figure. Never state a
statistic you are not sure of: being right is this channel's only real asset.

Then append a space and this sentence, WORD FOR WORD, as the last thing:

    Also, if you want this stuff on your wall, I have made four science posters where every number is a real measurement. Link in my bio.

It sells hydermoedeen.gumroad.com/l/science-posters, linked in the YouTube and
Instagram bios, so "link in my bio" is correct on both. Do not reword it, do not
move it earlier: a plug in the middle costs retention at the moment the
explanation lands. It adds about 8 seconds, so the video runs a little over 30.

EMPHASIS: 18 to 24 words from the script (nouns, numbers, pivot words). They
render yellow. Include "posters", "measurement" and "bio".

## 3. Build in the background, then poll

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

CLIPS: EIGHT, science only. Never an aviation, `qg_`, `story_` or `shop_` clip.

  sci_earth1.mp4 sci_earth2.mp4 sci_storm1.mp4 sci_storm2.mp4 sci_storm3.mp4
  sci_aurora1.mp4 sci_aurora2.mp4 sci_flare1.mp4 sci_flare2.mp4
  sci_bh1.mp4 sci_bh2.mp4 sci_bh3.mp4 sci_ice1.mp4 sci_ice2.mp4 sci_ice3.mp4

Repeating a clip is fine. Match the shot to what is being said.

If `/tmp/done` says ERR, read the traceback, fix it (usually a wrong clip name)
and retry ONCE. Twice failed: report the error and post nothing.

## 4. YouTube

    up, _ = upload_local_file("/tmp/out.mp4")
    run_composio_tool("YOUTUBE_MULTIPART_UPLOAD_VIDEO", {
        "videoFile": {"s3key": up["s3key"], "name": "short.mp4", "mimetype": "video/mp4"},
        "title": <title> + " #Shorts",
        "description": <the payoff in a sentence or two> + "\n\nFour science posters where every number is a real measurement: https://hydermoedeen.gumroad.com/l/science-posters\n\nFootage: NASA (public domain)\n\n#shorts #science #space #whatif #physics",
        "tags": ["shorts","science","space","whatif","physics"],
        "categoryId": "28", "privacyStatus": "public"
    }, account="youtube_elt-gentoo")

`videoFile` must be an OBJECT. Title under 100 characters. A returned id is not
success: wait ~25s then YOUTUBE_GET_VIDEO_DETAILS_BATCH `{"id": [vid], "parts":
["status","processingDetails"]}`. Anything but processed or succeeded means it
was rejected: say so and give the id.

## 5. The same video to Instagram

Reuse the s3key. Instagram's quota is separate, so do this even if YouTube
failed on quota.

    run_composio_tool("INSTAGRAM_POST_IG_USER_MEDIA", {
        "ig_user_id": "28104900562482809",
        "video_file": {"s3key": up["s3key"], "name": "short.mp4", "mimetype": "video/mp4"},
        "media_type": "REELS",
        "caption": <hook line> + "\n\n" + <the payoff> + "\n\nFour science posters, every number a real measurement. Link in our bio.\n\nFootage: NASA (public domain)\n\n#science #space #physics #whatif #didyouknow #astronomy #universe #spacefacts",
        "share_to_feed": True
    }, account="instagram_damson-ruffle")

If YouTube failed on quota you still need the s3key: call `upload_local_file`
before this step.

Take the container id from data.id (or data.creation_id), poll
INSTAGRAM_GET_POST_STATUS `{"creation_id": "<id>"}` every 6s up to 20 times:

  - FINISHED      : publish.
  - ERROR/EXPIRED : STOP and report. Never reuse a creation_id, it is single-use.
  - IN_PROGRESS after 20 polls: STOP and report. Do not publish.

    run_composio_tool("INSTAGRAM_CREATE_POST", {"ig_user_id": "28104900562482809", "creation_id": "<id>"}, account="instagram_damson-ruffle")

Publish exactly ONCE. If it errors, report it; a retry can double-post.

Write the Instagram caption for Instagram, hook first, hashtags last.

## 6. Report

Topic index and how many of the 120 remain, title, YouTube id, URL and
processing status, Instagram media id, both confirmed account identities. If one
platform failed, say exactly which and why. Never post to any other account.
