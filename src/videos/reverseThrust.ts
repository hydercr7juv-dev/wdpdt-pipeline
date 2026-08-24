import { VideoSpec } from "../lib/video";

export const reverseThrust: VideoSpec = {
  id: "ReverseThrust",
  title: "Why Plane Engines Roar After Landing",
  voFile: "assets/vo_reverseThrust.mp3",
  audioDuration: 33.84,
  script:
    "Why do engines roar so loudly right after a plane lands? Some people think the pilot is speeding up by mistake. " +
    "But that's not actually why. The moment the wheels touch down, doors inside the engine swing shut and redirect " +
    "the blast of exhaust forward instead of backward. That reversed thrust pushes against the plane's forward motion, " +
    "working alongside the brakes to slow hundreds of tons of metal down fast. On short runways or in heavy rain, that " +
    "extra shove can be the difference between stopping safely and running out of pavement. That deafening roar is the " +
    "engine hitting the brakes.",
  emphasis: [
    "roar",
    "loudly",
    "lands",
    "mistake",
    "not",
    "why",
    "wheels",
    "doors",
    "redirect",
    "reversed",
    "thrust",
    "brakes",
    "slow",
    "tons",
    "runways",
    "rain",
    "stopping",
    "deafening",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.8, startFrom: 2 },
    { clip: "takeoff.mp4", start: 3.8, end: 7.6, startFrom: 6 },
    { clip: "cabin.mp4", start: 7.6, end: 11.4, startFrom: 4 },
    { clip: "window.mp4", start: 11.4, end: 15.2, startFrom: 8 },
    { clip: "runway.mp4", start: 15.2, end: 19.0, startFrom: 10 },
    { clip: "takeoff.mp4", start: 19.0, end: 22.8, startFrom: 13 },
    { clip: "window.mp4", start: 22.8, end: 26.6, startFrom: 15 },
    { clip: "runway.mp4", start: 26.6, end: 30.4, startFrom: 15 },
    { clip: "cabin.mp4", start: 30.4, end: 34.34, startFrom: 9 },
  ],
};
