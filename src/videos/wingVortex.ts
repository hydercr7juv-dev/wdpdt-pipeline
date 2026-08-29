import { VideoSpec } from "../lib/video";

export const wingVortex: VideoSpec = {
  id: "WingVortex",
  title: "The Vapor Trails That Pour Off Wingtips On Landing",
  voFile: "assets/vo_wingVortex.mp3",
  audioDuration: 37.584,
  script:
    "Why do wispy white streamers sometimes pour off airplane wingtips during a rainy landing, even with the " +
    "engines nowhere nearby? Some people think it's smoke or exhaust. But that's not actually why. " +
    "It's wingtip vortices, the same swirling air that creates lift, spinning off the tip in cones of low pressure. " +
    "In humid air, that sudden pressure drop chills the moisture instantly, and it condenses into visible vapor, " +
    "like a cloud forming out of nothing. Dry air, no show. Thick, wet air, and you can watch the exact shape of " +
    "the invisible force holding the plane up. It's the wing's own lift, turned briefly visible.",
  emphasis: [
    "wispy",
    "streamers",
    "wingtips",
    "vortices",
    "swirling",
    "lift",
    "pressure",
    "humid",
    "chills",
    "condenses",
    "vapor",
    "cloud",
    "dry",
    "wet",
    "invisible",
    "visible",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.8, startFrom: 6 },
    { clip: "cabin.mp4", start: 3.8, end: 7.6, startFrom: 4 },
    { clip: "window.mp4", start: 7.6, end: 11.4, startFrom: 9 },
    { clip: "takeoff.mp4", start: 11.4, end: 15.2, startFrom: 3 },
    { clip: "citynight.mp4", start: 15.2, end: 19.0, startFrom: 6 },
    { clip: "window.mp4", start: 19.0, end: 22.8, startFrom: 13 },
    { clip: "cabin.mp4", start: 22.8, end: 26.6, startFrom: 8 },
    { clip: "runway.mp4", start: 26.6, end: 30.4, startFrom: 5 },
    { clip: "window.mp4", start: 30.4, end: 34.2, startFrom: 17 },
    { clip: "eye.mp4", start: 34.2, end: 38.084, startFrom: 4 },
  ],
};
