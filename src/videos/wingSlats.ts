import { VideoSpec } from "../lib/video";

export const wingSlats: VideoSpec = {
  id: "WingSlats",
  title: "Why The Wing's Edge Droops Before Landing",
  voFile: "assets/vo_wingSlats.mp3",
  audioDuration: 31.68,
  script:
    "Why does the front edge of the wing slide forward and droop down right before takeoff or landing? " +
    "Some people think it's just the flaps or spoilers at work. But that's not actually why. " +
    "Those moving panels at the very front of the wing are called slats. They open a slot that lets fast air " +
    "flow over the top of the wing at very low speed, which stops the wing from stalling when the plane is barely " +
    "fast enough to fly. Without slats, a jet would need much higher speed to land and take off safely. " +
    "That small droop up front is buying the wing extra lift exactly when it needs it most.",
  emphasis: [
    "front",
    "edge",
    "wing",
    "droop",
    "flaps",
    "spoilers",
    "not",
    "why",
    "slats",
    "slot",
    "fast",
    "air",
    "low",
    "speed",
    "stalling",
    "barely",
    "fly",
    "higher",
    "safely",
    "lift",
    "most",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.6, startFrom: 7 },
    { clip: "takeoff.mp4", start: 3.6, end: 7.2, startFrom: 4 },
    { clip: "window.mp4", start: 7.2, end: 10.8, startFrom: 13 },
    { clip: "runway.mp4", start: 10.8, end: 14.4, startFrom: 9 },
    { clip: "window.mp4", start: 14.4, end: 18.0, startFrom: 17 },
    { clip: "takeoff.mp4", start: 18.0, end: 21.6, startFrom: 15 },
    { clip: "citynight.mp4", start: 21.6, end: 25.2, startFrom: 6 },
    { clip: "runway.mp4", start: 25.2, end: 28.7, startFrom: 1 },
    { clip: "window.mp4", start: 28.7, end: 32.18, startFrom: 5 },
  ],
};
