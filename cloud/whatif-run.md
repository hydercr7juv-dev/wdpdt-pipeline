# What If Labs slot runner

The caller gives you SLOT, 0 to 5. Everything else is here.

Generate ONE What If Labs Short and post it to YouTube AND Instagram. Then stop.

EVERYTHING happens inside COMPOSIO_REMOTE_WORKBENCH. Load it with ToolSearch
(query: COMPOSIO_REMOTE_WORKBENCH). Do not render in the routine sandbox.

## Why all six runs sit between 07:00 and 10:00 UTC

The YouTube upload quota belongs to Composio's shared Google Cloud project, used
by every Composio customer. It refills about 07:00 UTC and other people's
traffic drains it through the day. Runs at 15:00 and 19:00 hit 403 quotaExceeded.
Six separate routines now fire inside that window; they are separate routines
because one routine cannot fire more often than hourly.

403 quotaExceeded or 429 on YouTube means the pool is dry: skip YouTube, say so
plainly, and still post to Instagram, which uses a different quota entirely.

## 1. Pick this run's topic

    import datetime
    days  = (datetime.datetime.now(datetime.timezone.utc).date() - datetime.date(2026, 10, 17)).days
    index = days * 6 + SLOT

**If index < 0 or index >= 120, STOP** and report that the topic bank is used up
and needs extending. Never wrap with a modulo. The old prompt did `% 36`, which
at six a day repeated the whole channel every six days; 149 videos are already
published and the duplicates measurably cost views.

  0 the Earth stopped spinning (momentum, not gravity; oceans migrate to the poles)
  1 you fell into a black hole (tidal stretching; outside observers never see you arrive)
  2 the Sun went out (8min20s of light in transit; oceans freeze top-down; vents survive)
  3 all the ice melted (about 60m of sea level rise; ice reflects sunlight so loss compounds)
  4 Earth lost its magnetic field (slow atmospheric stripping; Mars is the case study)
  5 a solar storm hit today (induced currents in long conductors; 1859 telegraph fires)
  6 the Moon disappeared (tides drop to about a third; axial tilt destabilises)
  7 you fell through the centre of the Earth (you would oscillate; the core is hotter than the Sun's surface)
  8 you travelled at light speed (energy needed climbs without limit for anything with mass)
  9 the oceans vanished (they drive the weather; land dries, temperatures swing violently)
 10 gravity doubled (not crushed but strained; the atmosphere compresses downward)
 11 Earth had two moons (competing tides; unstable orbits over long timescales)
 12 the Earth were twice as big (higher surface gravity, thicker air, orbit much harder to reach)
 13 you could see every wavelength (you would see heat, radio, and stars invisible now)
 14 a supervolcano erupted (ash blocks sunlight; a volcanic winter lasting years)
 15 humans disappeared tomorrow (cities fail fast; what outlasts us is surprising)
 16 the Earth's orbit were a perfect circle (seasons come from axial tilt, not distance)
 17 we found life on Europa (a subsurface ocean kept liquid by tidal heating)
 18 you jumped into a volcano (you would not sink; lava is far denser than a person)
 19 time ran backwards (entropy defines the arrow of time)
 20 the Milky Way collided with Andromeda (it will; the space between stars means almost nothing hits)
 21 you could stand on Jupiter (there is no surface to stand on)
 22 the Earth's core cooled (the magnetic field dies and the atmosphere erodes)
 23 light were slower (everyday objects would show relativistic effects)
 24 the magnetic poles flipped (it has happened many times, over millennia not overnight)
 25 Earth had rings like Saturn (visible day and night, and they would shadow the surface)
 26 an asteroid the size of a city hit (the energy dwarfs every weapon ever built; dust cools the planet)
 27 you fell from the edge of space (terminal velocity; the danger is heat and spin, not the fall)
 28 the atmosphere were twice as thick (higher pressure, easier flight, very different weather)
 29 you never slept again (the brain forces microsleeps; cognition collapses within days)
 30 all insects disappeared (pollination and soil recycling fail; the knock-on reaches everything)
 31 the Sun were a red dwarf (the habitable zone sits far closer in, and planets tidally lock)
 32 you could hear sound in space (no medium carries it, but plasma waves can be converted to audio)
 33 the Earth spun twice as fast (shorter days, stronger Coriolis, a bigger equatorial bulge)
 34 we could stop a hurricane (the energy released dwarfs anything we could deploy against it)
 35 there were no Moon at all (no large tides, and a far less stable axial tilt)
 36 you were exposed to space without a suit (vacuum is not the instant freeze films show; it is pressure)
 37 the Earth had no tilt (no seasons; climate bands fixed by latitude forever)
 38 Venus and Earth swapped orbits (runaway greenhouse is about the atmosphere, not only distance)
 39 you drank a glass of neutron star material (density, and why it cannot exist outside the star)
 40 the Atlantic conveyor stopped (ocean currents move heat; northern Europe depends on it)
 41 you stood at the bottom of the Mariana Trench (over a thousand atmospheres of pressure)
 42 Saturn passed close to Earth (tidal forces, and the scale people get wrong)
 43 the Sun became a red giant (it will; Earth's fate depends on orbital drift too)
 44 you could travel to the centre of the Sun (plasma, pressure, and why light takes so long to escape)
 45 lightning struck the same place constantly (tall conductors do get struck repeatedly)
 46 Earth were tidally locked to the Sun (one burning face, one frozen, a habitable ring between)
 47 there were no friction (nothing would start or stop; walking would be impossible)
 48 you fell into Jupiter (crushing pressure long before any surface)
 49 all the world's water were one sphere (it is far smaller than people picture)
 50 a black hole the mass of a coin appeared (Hawking radiation; tiny ones evaporate violently)
 51 oxygen doubled in the atmosphere (fires spread far more easily; insects grew huge once before)
 52 the Earth's rotation slowed gradually (it is; days are getting longer, measurably)
 53 a star exploded nearby (a supernova's danger radius, and why we are not in one)
 54 you could fold a piece of paper fifty times (doubling, and the distance it reaches)
 55 you shouted for your whole life (how little energy sound actually carries)
 56 Antarctica had no ice (the land beneath is partly below sea level)
 57 we drilled straight through the crust (heat and pressure stop us long before the mantle)
 58 you were struck by a tiny meteorite (most burn up; the ones that land are slow)
 59 the Moon were closer (tides scale sharply; it is slowly moving away instead)
 60 you could breathe underwater (the oxygen dissolved in water is thousands of times less dense than air)
 61 all the clouds disappeared (clouds cool and warm; the net effect is the hard part)
 62 you could see atoms with your eyes (wavelength sets the limit, not magnification)
 63 Earth passed through a nebula (nebulae are emptier than any vacuum we can make)
 64 the Sun had a twin (many stars do; stable orbits are possible but narrow)
 65 you were inside a vacuum chamber with a feather and a hammer (they fall together; it was tested on the Moon)
 66 the Earth's atmosphere escaped slowly (lighter gases leave first; it is happening now)
 67 you could not feel pain (injuries would go unnoticed; the condition exists and is dangerous)
 68 we put a mirror on the Moon (we did; laser ranging measures the distance to millimetres)
 69 you swam in a pool on the Moon (lower gravity, higher splashes, slower waves)
 70 a comet hit the Sun (they do, regularly, and are destroyed)
 71 the seafloor stopped spreading (plate tectonics drives the carbon cycle and the mountains)
 72 you could stand on a neutron star (its gravity, and why nothing could keep a shape)
 73 Earth were in a different galaxy (the night sky, and what is visible from a dense cluster)
 74 all the sand in the world were counted (there are more stars than grains, by most estimates)
 75 you shone a torch at the Moon (how little light returns, and why we used mirrors)
 76 there were no greenhouse effect at all (Earth would freeze; the effect itself is not the problem)
 77 you fell into a volcano's crater lake (acid, heat, and dissolved gas)
 78 the ice caps froze over the whole planet (it happened; the escape route was volcanic carbon dioxide)
 79 you could run at the speed of sound (the sound barrier is about pressure, not a wall)
 80 a jet flew to the edge of the atmosphere (engines need air; above a point nothing works)
 81 we found a planet made of diamond (carbon-rich worlds, and what the claim really means)
 82 the Earth were flat and a disc (gravity would pull it into a sphere; it is unavoidable)
 83 you weighed yourself at the equator and the poles (rotation and shape change the reading slightly)
 84 all the trees were cut down (carbon, rainfall, and soil all fail together)
 85 the Sun stopped fusing hydrogen right now (pressure holds it up for a long time; light keeps arriving)
 86 you could see the Earth from Pluto (it is a dot beside the Sun's glare)
 87 you stood in a room of pure helium (voices, and the real danger, which is suffocation)
 88 the Earth had a second atmosphere layer of water (pressure and light would change everything)
 89 you were in freefall forever (orbit IS freefall; that is why astronauts float)
 90 the magnetic field doubled in strength (auroras, radiation shielding, and compasses)
 91 you could watch an ice age begin (orbital cycles; it takes thousands of years)
 92 all satellites failed at once (navigation, timing, and banking depend on them)
 93 a solar eclipse lasted a day (geometry; the shadow moves fast, and why)
 94 you touched lava with a stick (it does not splash; it is thick and slow)
 95 the Earth were hit by a glancing blow (the Moon probably formed exactly that way)
 96 you could stand inside a tornado's eye (pressure drop, and why it is not calm like a hurricane)
 97 the deepest ocean trench were filled in (nothing changes much; the volume is small)
 98 the Earth stopped orbiting the Sun (it would fall inward; how long that takes)
 99 the human eye could see infrared (we would see heat, and lose detail)
100 you lived on a planet with no night (plants, sleep, and what tidal locking does)
101 all the ice in Greenland melted alone (about seven metres of sea level rise)
102 you could hear the Sun (it is loud; the vacuum is why you cannot)
103 a planet had two suns setting (it exists; Kepler found circumbinary planets)
104 the ozone layer vanished (ultraviolet reaching the surface, and the 1987 fix that worked)
105 you tried to dig a hole to Australia (heat, pressure, and the deepest hole ever drilled)
106 a hurricane formed over land (they need warm ocean water to feed on)
107 the Earth had no water at all (plate tectonics and weather both depend on it)
108 you could compress air without heating it (compression always heats; it is why pumps get hot)
109 a space elevator were built (the material strength needed, and where it would anchor)
110 the Moon were made of iron (its density is low; that is evidence of how it formed)
111 you watched a star being born (gravity, collapse, and the moment fusion ignites)
112 the Earth's day were a year long (one side bakes; the weather would be violent)
113 all the carbon dioxide were removed (plants die first, then everything)
114 you stood on Mars without a suit (the pressure is near the Armstrong limit)
115 a river flowed uphill (siphons and pressure; it can look like it does)
116 light had mass (it does carry momentum; solar sails work on that)
117 the Sun were twice as massive (it would burn far hotter and far shorter)
118 you could survive a lightning strike (many people do; the path matters more than the energy)
119 the Earth were the only planet (no Jupiter means more impacts reaching us)

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

Keep every sleep under 45 seconds; 60 hits the tool timeout.

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

## 4. Verify BOTH accounts before posting. Mandatory.

Several brands run through this Composio account and some connections have
pointed at the wrong destination before.

    YouTube  : youtube_elt-gentoo        -> UCjcSxwyu8ecxyu5-0rGDKIA
    Instagram: instagram_damson-ruffle   -> what_if_labs1

  - YOUTUBE_GET_CHANNEL_STATISTICS {"mine": true}, account=youtube_elt-gentoo
  - INSTAGRAM_GET_USER_INFO {"ig_user_id": "me"}, account=instagram_damson-ruffle

A failed check skips THAT platform only. Never fall back to another account.

## 5. YouTube

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

## 6. The same video to Instagram

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

## 7. Report

Topic index and how many of the 120 remain, title, YouTube id, URL and
processing status, Instagram media id, both confirmed account identities. If one
platform failed, say exactly which and why. Never post to any other account.
