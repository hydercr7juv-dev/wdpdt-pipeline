import { VideoSpec } from "../lib/video";

export const vortexGenerators: VideoSpec = {
  id: "VortexGenerators",
  title: "Those Tiny Tabs On Airplane Wings",
  voFile: "assets/vo_vortexGenerators.mp3",
  audioDuration: 37.536,
  script:
    "Why do some airplane wings and tails have tiny rows of metal tabs sticking straight up? " +
    "Some people think they're just cooling fins or leftover rivets. But that's not actually why. " +
    "Those little tabs are vortex generators. Each one spins up a small tornado of air that drags fast moving air " +
    "down onto the wing's surface, keeping the airflow attached even when the plane flies slow with its nose tilted up. " +
    "Without them, that airflow would separate early, the wing would stall sooner, and pilots would lose lift right " +
    "when they need it most, on final approach. Those tiny tabs quietly buy the whole airplane extra safety margin.",
  emphasis: [
    "tiny",
    "tabs",
    "wings",
    "cooling",
    "fins",
    "rivets",
    "not",
    "why",
    "vortex",
    "generators",
    "tornado",
    "airflow",
    "attached",
    "slow",
    "nose",
    "stall",
    "lift",
    "approach",
    "safety",
    "margin",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.8, startFrom: 1 },
    { clip: "cabin.mp4", start: 3.8, end: 7.6, startFrom: 3 },
    { clip: "window.mp4", start: 7.6, end: 11.2, startFrom: 5 },
    { clip: "eye.mp4", start: 11.2, end: 15.0, startFrom: 2 },
    { clip: "window.mp4", start: 15.0, end: 18.8, startFrom: 9 },
    { clip: "runway.mp4", start: 18.8, end: 22.4, startFrom: 4 },
    { clip: "window.mp4", start: 22.4, end: 26.2, startFrom: 13 },
    { clip: "takeoff.mp4", start: 26.2, end: 30.0, startFrom: 6 },
    { clip: "runway.mp4", start: 30.0, end: 34.0, startFrom: 10 },
    { clip: "window.mp4", start: 34.0, end: 38.036, startFrom: 17 },
  ],
};
