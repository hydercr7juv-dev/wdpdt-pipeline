import { VideoSpec } from "../lib/video";

export const blackbox: VideoSpec = {
  id: "BlackBox",
  title: "Why The 'Black Box' Is Actually Orange",
  voFile: "assets/vo_blackbox.mp3",
  audioDuration: 36.36,
  script:
    "Why is a plane's black box actually painted bright orange? " +
    "Some people think it's called black because that's its real color. But that's not actually why. " +
    "The name comes from old radar and camera housings that really were black, but engineers realized that " +
    "after a crash, a black box hiding in scorched wreckage is nearly impossible to find. So they painted it " +
    "a blazing international orange and added a reflective strip and a sonar pinger, making it easy to spot " +
    "on a runway or on the ocean floor. It's built to survive fire, crushing impact, and deep water pressure " +
    "because it's the one clue that has to be found. The color was never about hiding it, it was always about being seen.",
  emphasis: [
    "black",
    "box",
    "orange",
    "real",
    "color",
    "not",
    "why",
    "radar",
    "camera",
    "crash",
    "scorched",
    "wreckage",
    "impossible",
    "blazing",
    "reflective",
    "sonar",
    "pinger",
    "runway",
    "ocean",
    "fire",
    "crushing",
    "pressure",
    "clue",
    "found",
    "seen",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 4.0, startFrom: 3 },
    { clip: "runway.mp4", start: 4.0, end: 8.0, startFrom: 5 },
    { clip: "eye.mp4", start: 8.0, end: 12.0, startFrom: 2 },
    { clip: "cabin.mp4", start: 12.0, end: 16.0, startFrom: 10 },
    { clip: "runway.mp4", start: 16.0, end: 20.0, startFrom: 8 },
    { clip: "takeoff.mp4", start: 20.0, end: 24.0, startFrom: 4 },
    { clip: "eye.mp4", start: 24.0, end: 28.0, startFrom: 6 },
    { clip: "citynight.mp4", start: 28.0, end: 32.0, startFrom: 9 },
    { clip: "runway.mp4", start: 32.0, end: 36.86, startFrom: 12 },
  ],
};
