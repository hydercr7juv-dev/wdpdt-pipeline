import { VideoSpec } from "../lib/video";

export const nitrogenTires: VideoSpec = {
  id: "NitrogenTires",
  title: "Why Airplane Tires Are Filled With Nitrogen",
  voFile: "assets/vo_nitrogenTires.mp3",
  audioDuration: 36.192,
  script:
    "Why do airline mechanics fill airplane tires with pure nitrogen instead of regular air? " +
    "Some people think it's just to save money. But that's not actually why. " +
    "Regular air carries moisture, and at cruising altitude the wheel well can plunge to minus sixty degrees, " +
    "freezing that moisture and swinging the tire pressure wildly. Nitrogen is bone dry and barely reacts to " +
    "temperature, so pressure stays steady from a scorching runway to freezing altitude. It's also inert, so it " +
    "can't feed a fire if an overheated brake ever ignites near the wheel. Get that pressure wrong, and a landing " +
    "at over a hundred and fifty miles an hour could end in a blowout.",
  emphasis: [
    "nitrogen",
    "tires",
    "moisture",
    "altitude",
    "wheel",
    "freezing",
    "pressure",
    "wildly",
    "dry",
    "steady",
    "scorching",
    "inert",
    "fire",
    "brake",
    "ignites",
    "blowout",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.7, startFrom: 2 },
    { clip: "cabin.mp4", start: 3.7, end: 7.4, startFrom: 3 },
    { clip: "window.mp4", start: 7.4, end: 11.1, startFrom: 5 },
    { clip: "citynight.mp4", start: 11.1, end: 14.8, startFrom: 4 },
    { clip: "runway.mp4", start: 14.8, end: 18.5, startFrom: 9 },
    { clip: "takeoff.mp4", start: 18.5, end: 22.2, startFrom: 2 },
    { clip: "runway.mp4", start: 22.2, end: 25.9, startFrom: 12 },
    { clip: "takeoff.mp4", start: 25.9, end: 29.6, startFrom: 7 },
    { clip: "eye.mp4", start: 29.6, end: 33.3, startFrom: 3 },
    { clip: "runway.mp4", start: 33.3, end: 36.692, startFrom: 15 },
  ],
};
