import { VideoSpec } from "../lib/video";

export const runwayNumbers: VideoSpec = {
  id: "RunwayNumbers",
  title: "Why Runways Get Renumbered",
  voFile: "assets/vo_runwayNumbers.mp3",
  audioDuration: 37.488,
  script:
    "Why do some runways get a whole new number painted on them every few decades? " +
    "Some people think it's just repaving or fresh asphalt. But that's not actually why. " +
    "Runway numbers aren't random, they're the compass heading a plane flies on landing, " +
    "rounded to the nearest ten with the last zero dropped. Earth's magnetic north drifts " +
    "a little every single year, so the compass heading of a runway that never physically " +
    "moves slowly shifts too. Once that drift adds up enough to cross into a new rounded " +
    "number, airports have to repaint the runway and update every chart. Get it wrong, and " +
    "a pilot flying by instruments is trusting a number the sky no longer agrees with.",
  emphasis: [
    "runway",
    "number",
    "painted",
    "compass",
    "heading",
    "rounded",
    "magnetic",
    "north",
    "drifts",
    "shifts",
    "repaint",
    "chart",
    "pilot",
    "instruments",
    "sky",
    "agrees",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.8, startFrom: 1 },
    { clip: "takeoff.mp4", start: 3.8, end: 7.6, startFrom: 3 },
    { clip: "runway.mp4", start: 7.6, end: 11.4, startFrom: 6 },
    { clip: "citynight.mp4", start: 11.4, end: 15.2, startFrom: 2 },
    { clip: "window.mp4", start: 15.2, end: 19.0, startFrom: 9 },
    { clip: "runway.mp4", start: 19.0, end: 22.8, startFrom: 12 },
    { clip: "eye.mp4", start: 22.8, end: 26.6, startFrom: 4 },
    { clip: "takeoff.mp4", start: 26.6, end: 30.4, startFrom: 8 },
    { clip: "runway.mp4", start: 30.4, end: 34.2, startFrom: 15 },
    { clip: "citynight.mp4", start: 34.2, end: 37.988, startFrom: 11 },
  ],
};
