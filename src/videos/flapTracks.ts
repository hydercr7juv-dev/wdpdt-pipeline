import { VideoSpec } from "../lib/video";

export const flapTracks: VideoSpec = {
  id: "FlapTracks",
  title: "Those Canoe Bumps Under Airplane Wings",
  voFile: "assets/vo_flapTracks.mp3",
  audioDuration: 37.8,
  script:
    "Why do airliner wings have those long canoe-shaped bumps sticking out underneath them? " +
    "Some people think they're extra fuel tanks or sensors. But that's not actually why. " +
    "Inside each one sits a track and a set of screw jacks that push the flaps backward and down " +
    "during takeoff and landing, extending the wing's surface area so it can generate enough lift at low speed. " +
    "Those mechanisms are simply too big and too rigid to fold flush inside the thin wing itself, so engineers " +
    "wrap a smooth teardrop fairing around them to cut drag instead of hiding them away. Without that housing, " +
    "the exposed machinery would wreck the airflow and burn far more fuel on every single flight.",
  emphasis: [
    "canoe",
    "bumps",
    "wings",
    "underneath",
    "not",
    "why",
    "track",
    "screw",
    "jacks",
    "flaps",
    "backward",
    "extending",
    "lift",
    "low",
    "speed",
    "rigid",
    "flush",
    "fairing",
    "drag",
    "housing",
    "exposed",
    "wreck",
    "airflow",
    "fuel",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 4.0, startFrom: 3 },
    { clip: "cabin.mp4", start: 4.0, end: 7.6, startFrom: 2 },
    { clip: "window.mp4", start: 7.6, end: 11.2, startFrom: 9 },
    { clip: "takeoff.mp4", start: 11.2, end: 15.0, startFrom: 5 },
    { clip: "window.mp4", start: 15.0, end: 19.0, startFrom: 14 },
    { clip: "runway.mp4", start: 19.0, end: 23.0, startFrom: 6 },
    { clip: "window.mp4", start: 23.0, end: 27.0, startFrom: 17 },
    { clip: "citynight.mp4", start: 27.0, end: 31.0, startFrom: 8 },
    { clip: "window.mp4", start: 31.0, end: 35.0, startFrom: 4 },
    { clip: "takeoff.mp4", start: 35.0, end: 38.3, startFrom: 11 },
  ],
};
