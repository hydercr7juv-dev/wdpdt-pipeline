import { VideoSpec } from "../lib/video";

export const windshieldHeat: VideoSpec = {
  id: "WindshieldHeat",
  title: "The Invisible Gold Wiring In Every Cockpit Window",
  voFile: "assets/vo_windshieldHeat.mp3",
  audioDuration: 35.352,
  script:
    "Why do airplane cockpit windows never fog up or ice over at cruising altitude? " +
    "Some people think the cabin heat alone keeps them clear. But that's not actually why. " +
    "Buried inside each windshield pane is a thin, transparent layer of gold film, wired straight into the plane's " +
    "electrical system. It heats the glass evenly to around a hundred degrees, melting ice on contact and stopping " +
    "fog before it ever forms. That same heat also makes the windshield tougher, so it can survive a bird strike " +
    "at four hundred miles an hour without shattering. Without that invisible gold wiring, pilots could lose their " +
    "view in seconds.",
  emphasis: [
    "fog",
    "ice",
    "altitude",
    "cabin",
    "heat",
    "why",
    "gold",
    "film",
    "wired",
    "electrical",
    "heats",
    "glass",
    "melting",
    "tougher",
    "bird",
    "strike",
    "shattering",
    "invisible",
    "wiring",
    "seconds",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.585, startFrom: 1 },
    { clip: "cabin.mp4", start: 3.585, end: 7.17, startFrom: 3 },
    { clip: "window.mp4", start: 7.17, end: 10.755, startFrom: 7 },
    { clip: "eye.mp4", start: 10.755, end: 14.34, startFrom: 2 },
    { clip: "window.mp4", start: 14.34, end: 17.925, startFrom: 10 },
    { clip: "eye.mp4", start: 17.925, end: 21.51, startFrom: 6 },
    { clip: "window.mp4", start: 21.51, end: 25.095, startFrom: 14 },
    { clip: "takeoff.mp4", start: 25.095, end: 28.68, startFrom: 4 },
    { clip: "window.mp4", start: 28.68, end: 32.265, startFrom: 17 },
    { clip: "eye.mp4", start: 32.265, end: 35.852, startFrom: 9 },
  ],
};
