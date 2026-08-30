import { VideoSpec } from "../lib/video";

export const coffinCorner: VideoSpec = {
  id: "CoffinCorner",
  title: "Why Jets Can't Just Keep Climbing Higher",
  voFile: "assets/vo_coffinCorner.mp3",
  audioDuration: 32.28,
  script:
    "Why can't a jet just keep climbing higher to save fuel? " +
    "Some people think the engines simply run out of power up there. But that's not actually why. " +
    "In the thin air near the top of a jet's range, the speed needed to keep the wings flying and the speed " +
    "that triggers dangerous shockwaves over them creep closer and closer together. At the extreme edge that " +
    "gap can shrink to just a few knots, a zone pilots call coffin corner. Fly a little too slow and the plane " +
    "stalls, fly a little too fast and it buffets out of control, leaving almost no room to correct.",
  emphasis: [
    "climbing",
    "higher",
    "thin",
    "air",
    "wings",
    "flying",
    "shockwaves",
    "gap",
    "knots",
    "coffin",
    "corner",
    "slow",
    "stalls",
    "fast",
    "buffets",
    "control",
    "correct",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.6, startFrom: 1 },
    { clip: "cabin.mp4", start: 3.6, end: 7.2, startFrom: 2 },
    { clip: "window.mp4", start: 7.2, end: 10.8, startFrom: 5 },
    { clip: "citynight.mp4", start: 10.8, end: 14.4, startFrom: 3 },
    { clip: "eye.mp4", start: 14.4, end: 18.0, startFrom: 2 },
    { clip: "window.mp4", start: 18.0, end: 21.6, startFrom: 9 },
    { clip: "takeoff.mp4", start: 21.6, end: 25.2, startFrom: 2 },
    { clip: "citynight.mp4", start: 25.2, end: 28.8, startFrom: 12 },
    { clip: "window.mp4", start: 28.8, end: 32.78, startFrom: 16 },
  ],
};
