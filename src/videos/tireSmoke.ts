import { VideoSpec } from "../lib/video";

export const tireSmoke: VideoSpec = {
  id: "TireSmoke",
  title: "Why Plane Tires Smoke On Landing",
  voFile: "assets/vo_tireSmoke.mp3",
  audioDuration: 31.248,
  script:
    "Why do airplane tires puff out smoke the moment they touch the runway? " +
    "Some people think it's the brakes slamming on too hard. But that's not actually why. " +
    "The wheels sit completely still in the wheel well for the entire flight, so when a jet touches down " +
    "at over one hundred and fifty miles an hour, the tire itself isn't spinning yet. That split second " +
    "where the rubber skids before it catches up to the plane's speed is what scorches the tread and throws " +
    "off that visible puff. Engineers actually rely on that friction to help scrub off speed the instant the " +
    "wheels hit the ground.",
  emphasis: [
    "tires",
    "smoke",
    "runway",
    "brakes",
    "not",
    "why",
    "wheels",
    "still",
    "spinning",
    "speed",
    "skids",
    "catches",
    "scorches",
    "tread",
    "puff",
    "friction",
    "scrub",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.5, startFrom: 2 },
    { clip: "cabin.mp4", start: 3.5, end: 7.0, startFrom: 3 },
    { clip: "window.mp4", start: 7.0, end: 10.5, startFrom: 5 },
    { clip: "cabin.mp4", start: 10.5, end: 14.0, startFrom: 9 },
    { clip: "takeoff.mp4", start: 14.0, end: 17.5, startFrom: 4 },
    { clip: "eye.mp4", start: 17.5, end: 21.0, startFrom: 2 },
    { clip: "runway.mp4", start: 21.0, end: 24.5, startFrom: 8 },
    { clip: "citynight.mp4", start: 24.5, end: 28.0, startFrom: 6 },
    { clip: "runway.mp4", start: 28.0, end: 31.748, startFrom: 14 },
  ],
};
