import { VideoSpec } from "../lib/video";

export const wingFlex: VideoSpec = {
  id: "WingFlex",
  title: "Why Airplane Wings Bend So Much",
  voFile: "assets/vo_wings.mp3",
  audioDuration: 24.816,
  script:
    "Why do airplane wings bend so much in the air? Some people panic thinking they're about to snap. " +
    "But that's not actually why. Wings are engineered to flex. A Boeing 787's wingtips can bend upward " +
    "by over three metres in flight without any damage. A stiff wing would crack under turbulence, so " +
    "instead they bend and absorb the stress like a diving board. The flexing you're scared of is the " +
    "exact thing keeping the wing from breaking.",
  emphasis: [
    "wings", "bend", "snap", "not", "why", "engineered", "flex", "wingtips", "three",
    "metres", "stiff", "crack", "turbulence", "diving", "board", "scared", "breaking",
  ],
  scenes: [
    { clip: "takeoff.mp4", start: 0.0, end: 3.6, startFrom: 1 },
    { clip: "window.mp4", start: 3.6, end: 7.2, startFrom: 5 },
    { clip: "takeoff.mp4", start: 7.2, end: 11.0, startFrom: 6 },
    { clip: "window.mp4", start: 11.0, end: 15.0, startFrom: 14 },
    { clip: "citynight.mp4", start: 15.0, end: 18.5, startFrom: 6 },
    { clip: "takeoff.mp4", start: 18.5, end: 22.0, startFrom: 9 },
    { clip: "window.mp4", start: 22.0, end: 25.4, startFrom: 20 },
  ],
};
