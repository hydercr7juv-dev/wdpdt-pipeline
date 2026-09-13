import { VideoSpec } from "../lib/video";

export const lifeVest: VideoSpec = {
  id: "LifeVest",
  title: "Why Life Vests Aren't Inflated On The Plane",
  voFile: "assets/vo_lifeVest.mp3",
  audioDuration: 37.056,
  script:
    "Why don't the life vests on an airplane come already inflated? " +
    "Some people think airlines are just being cheap, or that it's some outdated rule. But that's not actually why. " +
    "A puffed up vest is bulky and stiff, and squeezing past seats and through a narrow exit in an emergency " +
    "would be nearly impossible with one already full of air. Vests only get inflated once you're outside the aircraft, " +
    "in open air or water, where the extra bulk actually helps. If you inflate too early and the cabin fills with water, " +
    "that same vest can trap you against the ceiling instead of letting you swim free. Staying deflated until the last " +
    "second is what keeps the exit clear and keeps you alive.",
  emphasis: [
    "life",
    "vests",
    "inflated",
    "cheap",
    "outdated",
    "not",
    "why",
    "puffed",
    "bulky",
    "stiff",
    "narrow",
    "exit",
    "emergency",
    "impossible",
    "outside",
    "water",
    "trap",
    "ceiling",
    "swim",
    "free",
    "deflated",
    "alive",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 3.8, startFrom: 4 },
    { clip: "window.mp4", start: 3.8, end: 7.6, startFrom: 9 },
    { clip: "citynight.mp4", start: 7.6, end: 11.2, startFrom: 2 },
    { clip: "cabin.mp4", start: 11.2, end: 15.0, startFrom: 11 },
    { clip: "runway.mp4", start: 15.0, end: 18.6, startFrom: 5 },
    { clip: "takeoff.mp4", start: 18.6, end: 22.4, startFrom: 8 },
    { clip: "window.mp4", start: 22.4, end: 26.0, startFrom: 14 },
    { clip: "citynight.mp4", start: 26.0, end: 29.8, startFrom: 12 },
    { clip: "cabin.mp4", start: 29.8, end: 33.6, startFrom: 6 },
    { clip: "eye.mp4", start: 33.6, end: 37.556, startFrom: 3 },
  ],
};
