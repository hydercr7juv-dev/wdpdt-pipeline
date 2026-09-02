import { VideoSpec } from "../lib/video";

export const wingSweep: VideoSpec = {
  id: "WingSweep",
  title: "Why Jet Wings Point Backward",
  voFile: "assets/vo_wingSweep.mp3",
  audioDuration: 33.192,
  script:
    "Why are airplane wings swept backward instead of pointing straight out? " +
    "Some people think it's purely for looks or better fuel economy. But that's not actually why. " +
    "Near the speed of sound, air rushing over a straight wing can hit its own shockwave before the plane " +
    "does, causing violent buffeting and loss of control. Sweeping the wing back stretches out the airflow, " +
    "so the wing only feels a slower, angled slice of the plane's true speed, pushing that shockwave further away. " +
    "Without the sweep, a jet cruising near the speed of sound would shake itself apart long before reaching cruising altitude.",
  emphasis: [
    "swept",
    "backward",
    "straight",
    "speed",
    "sound",
    "shockwave",
    "violent",
    "buffeting",
    "control",
    "angled",
    "slower",
    "stretches",
    "cruising",
    "shake",
    "apart",
    "altitude",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.7, startFrom: 4 },
    { clip: "takeoff.mp4", start: 3.7, end: 7.4, startFrom: 3 },
    { clip: "window.mp4", start: 7.4, end: 11.1, startFrom: 9 },
    { clip: "citynight.mp4", start: 11.1, end: 14.8, startFrom: 5 },
    { clip: "eye.mp4", start: 14.8, end: 18.5, startFrom: 2 },
    { clip: "window.mp4", start: 18.5, end: 22.2, startFrom: 14 },
    { clip: "runway.mp4", start: 22.2, end: 25.9, startFrom: 6 },
    { clip: "cabin.mp4", start: 25.9, end: 29.6, startFrom: 10 },
    { clip: "window.mp4", start: 29.6, end: 33.692, startFrom: 17 },
  ],
};
