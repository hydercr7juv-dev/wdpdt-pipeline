import { VideoSpec } from "../lib/video";

export const v1Speed: VideoSpec = {
  id: "V1Speed",
  title: "Why Pilots Commit To Takeoff Before Leaving The Ground",
  voFile: "assets/vo_v1Speed.mp3",
  audioDuration: 32.424,
  script:
    "Why do pilots commit to takeoff before the plane even leaves the ground? " +
    "Some people think they can always abort if something goes wrong. But that's not actually why. " +
    "Every takeoff has a speed called V1, calculated from weight, runway length, and wind, past which stopping " +
    "safely is no longer guaranteed. Below V1, pilots slam the brakes and reject. Above it, they're safer flying " +
    "than trying to stop. It's not a feeling, it's math done before the wheels ever started rolling. " +
    "Miss that number, and there might not be enough runway left to save you.",
  emphasis: [
    "takeoff",
    "abort",
    "wrong",
    "v1",
    "weight",
    "runway",
    "wind",
    "stopping",
    "brakes",
    "reject",
    "flying",
    "math",
    "wheels",
    "rolling",
    "miss",
    "save",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.6, startFrom: 2 },
    { clip: "takeoff.mp4", start: 3.6, end: 7.0, startFrom: 5 },
    { clip: "cabin.mp4", start: 7.0, end: 10.6, startFrom: 3 },
    { clip: "runway.mp4", start: 10.6, end: 14.2, startFrom: 9 },
    { clip: "eye.mp4", start: 14.2, end: 17.6, startFrom: 6 },
    { clip: "takeoff.mp4", start: 17.6, end: 21.2, startFrom: 12 },
    { clip: "window.mp4", start: 21.2, end: 24.6, startFrom: 4 },
    { clip: "runway.mp4", start: 24.6, end: 28.2, startFrom: 15 },
    { clip: "takeoff.mp4", start: 28.2, end: 32.924, startFrom: 8 },
  ],
};
