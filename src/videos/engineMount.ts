import { VideoSpec } from "../lib/video";

export const engineMount: VideoSpec = {
  id: "EngineMount",
  title: "Why Jet Engines Hang Under The Wings",
  voFile: "assets/vo_engineMount.mp3",
  audioDuration: 35.856,
  script:
    "Why do most airliners hang their engines under the wings instead of tucking them inside the fuselage? " +
    "Some people think it's just an old-fashioned design choice. But that's not actually why. " +
    "Hanging engines on pylons keeps a fire or explosion far away from the passenger cabin, and it lets mechanics " +
    "reach every part without scaffolding. The engine's weight also sits ahead of the wing, canceling out some of " +
    "the bending force air puts on the wingtip in flight. If an engine ever fails, it can be swapped in hours " +
    "instead of grounding the whole airplane for a fuselage teardown. That simple hanging position is a safety and " +
    "maintenance decision, not an accident.",
  emphasis: [
    "engines",
    "hang",
    "wings",
    "fuselage",
    "not",
    "why",
    "fire",
    "explosion",
    "away",
    "cabin",
    "mechanics",
    "scaffolding",
    "weight",
    "canceling",
    "bending",
    "force",
    "fails",
    "swapped",
    "hours",
    "grounding",
    "safety",
    "accident",
  ],
  scenes: [
    { clip: "takeoff.mp4", start: 0.0, end: 3.6, startFrom: 2 },
    { clip: "window.mp4", start: 3.6, end: 7.2, startFrom: 5 },
    { clip: "citynight.mp4", start: 7.2, end: 10.8, startFrom: 8 },
    { clip: "cabin.mp4", start: 10.8, end: 14.4, startFrom: 3 },
    { clip: "runway.mp4", start: 14.4, end: 18.0, startFrom: 6 },
    { clip: "window.mp4", start: 18.0, end: 21.6, startFrom: 11 },
    { clip: "takeoff.mp4", start: 21.6, end: 25.2, startFrom: 9 },
    { clip: "runway.mp4", start: 25.2, end: 28.8, startFrom: 13 },
    { clip: "citynight.mp4", start: 28.8, end: 32.4, startFrom: 4 },
    { clip: "eye.mp4", start: 32.4, end: 36.356, startFrom: 7 },
  ],
};
