import { VideoSpec } from "../lib/video";

export const whitePlanes: VideoSpec = {
  id: "WhitePlanes",
  title: "Why Almost Every Plane Is Painted White #Shorts",
  voFile: "assets/vo_white.mp3",
  audioDuration: 26.784,
  script:
    "Why is almost every plane painted white? Some people think it's just what airlines picked to look clean. " +
    "But that's not actually why. White reflects sunlight, so the cabin heats up far less while the aircraft sits " +
    "on the ground. It also doesn't fade the way coloured paint does under ultraviolet light. And on a white surface, " +
    "a fuel leak, a dent, or a hairline crack shows up instantly during a walkaround inspection. Paint is weight, too. " +
    "White is simply the cheapest, safest colour to fly.",
  emphasis: [
    "plane", "painted", "white", "clean", "not", "why", "reflects", "sunlight",
    "cabin", "heats", "ground", "fade", "coloured", "ultraviolet", "fuel",
    "leak", "dent", "crack", "instantly", "inspection", "weight", "cheapest",
    "safest", "colour",
  ],
  // Leans on the new Coverr clips (gate/terminal/clouds/planeview) — all
  // frame-checked — mixed with two proven originals for pacing.
  scenes: [
    { clip: "gate.mp4", start: 0.0, end: 3.5, startFrom: 1.5 },
    { clip: "terminal.mp4", start: 3.5, end: 7.0, startFrom: 3 },
    { clip: "clouds.mp4", start: 7.0, end: 10.5, startFrom: 2 },
    { clip: "takeoff.mp4", start: 10.5, end: 13.5, startFrom: 3 },
    { clip: "planeview.mp4", start: 13.5, end: 17.0, startFrom: 3 },
    { clip: "gate.mp4", start: 17.0, end: 20.5, startFrom: 8 },
    { clip: "terminal.mp4", start: 20.5, end: 24.0, startFrom: 10 },
    { clip: "clouds.mp4", start: 24.0, end: 27.3, startFrom: 6 },
  ],
};
