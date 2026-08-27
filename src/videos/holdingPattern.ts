import { VideoSpec } from "../lib/video";

export const holdingPattern: VideoSpec = {
  id: "HoldingPattern",
  title: "Why Planes Fly In Circles Before Landing",
  voFile: "assets/vo_holdingPattern.mp3",
  audioDuration: 35.256,
  script:
    "Why do airplanes sometimes fly in slow circles before landing? " +
    "Some people think it's because the pilot got lost, or air traffic control simply forgot about them. " +
    "But that's not actually why. Airports can only land one plane at a time on each runway, so when traffic " +
    "backs up, controllers stack incoming flights into a holding pattern, a racetrack shaped loop at a specific " +
    "altitude. Each aircraft gets its own altitude layer, spaced a thousand feet apart, so dozens of planes can " +
    "wait safely in the same patch of sky. Get that spacing wrong by even a little, and two planes could end up " +
    "far too close for comfort.",
  emphasis: [
    "circles",
    "landing",
    "lost",
    "why",
    "airports",
    "runway",
    "traffic",
    "controllers",
    "holding",
    "pattern",
    "racetrack",
    "altitude",
    "layer",
    "spaced",
    "sky",
    "close",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.9, startFrom: 2 },
    { clip: "window.mp4", start: 3.9, end: 7.6, startFrom: 5 },
    { clip: "citynight.mp4", start: 7.6, end: 11.2, startFrom: 8 },
    { clip: "cabin.mp4", start: 11.2, end: 14.8, startFrom: 3 },
    { clip: "window.mp4", start: 14.8, end: 18.4, startFrom: 12 },
    { clip: "takeoff.mp4", start: 18.4, end: 22.0, startFrom: 6 },
    { clip: "citynight.mp4", start: 22.0, end: 25.6, startFrom: 15 },
    { clip: "eye.mp4", start: 25.6, end: 29.2, startFrom: 4 },
    { clip: "window.mp4", start: 29.2, end: 35.756, startFrom: 18 },
  ],
};
