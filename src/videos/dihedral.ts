import { VideoSpec } from "../lib/video";

export const dihedral: VideoSpec = {
  id: "Dihedral",
  title: "Why Airplane Wings Tilt Up Like A Shallow V",
  voFile: "assets/vo_dihedral.mp3",
  audioDuration: 36.456,
  script:
    "Why do airplane wings tilt slightly upward, like a shallow V, instead of sticking out flat? " +
    "Some people think it's just for looks, or to fit more engines underneath. But that's not actually why. " +
    "That upward angle is called dihedral, and it's a built-in self-correction system. If a gust of wind tips " +
    "the plane sideways, the lower wing suddenly points more level to the airflow and makes more lift, while the " +
    "raised wing makes less, and the plane rolls itself back level without the pilot touching a thing. Without " +
    "that tilt, every gentle side gust would need constant manual correction. It's a shape that fights turbulence " +
    "before the pilot even notices it.",
  emphasis: [
    "wings",
    "tilt",
    "upward",
    "shallow",
    "dihedral",
    "self-correction",
    "gust",
    "wind",
    "tips",
    "sideways",
    "lift",
    "rolls",
    "level",
    "turbulence",
    "pilot",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.7, startFrom: 1 },
    { clip: "window.mp4", start: 3.7, end: 7.3, startFrom: 5 },
    { clip: "cabin.mp4", start: 7.3, end: 11.0, startFrom: 2 },
    { clip: "window.mp4", start: 11.0, end: 14.6, startFrom: 9 },
    { clip: "takeoff.mp4", start: 14.6, end: 18.2, startFrom: 3 },
    { clip: "window.mp4", start: 18.2, end: 21.8, startFrom: 13 },
    { clip: "citynight.mp4", start: 21.8, end: 25.4, startFrom: 4 },
    { clip: "window.mp4", start: 25.4, end: 29.0, startFrom: 17 },
    { clip: "cabin.mp4", start: 29.0, end: 32.6, startFrom: 6 },
    { clip: "window.mp4", start: 32.6, end: 36.956, startFrom: 1 },
  ],
};
