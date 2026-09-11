import { VideoSpec } from "../lib/video";

export const trimTank: VideoSpec = {
  id: "TrimTank",
  title: "Why Some Airliners Keep Fuel In The Tail",
  voFile: "assets/vo_trimTank.mp3",
  audioDuration: 32.688,
  script:
    "Why do some airliners store fuel inside their tail instead of just the wings? " +
    "Some people think it's only for extra range on long flights. But that's not actually why. " +
    "Modern jets pump fuel into a small tank inside the horizontal tail to shift the plane's center of gravity " +
    "backward during cruise. That lets the main wing carry the load with a smaller downward push from the tail, " +
    "cutting drag across an entire ocean crossing. Get that balance wrong and the plane burns thousands of pounds " +
    "of extra fuel for nothing. That hidden tank is basically a fuel efficiency trick hiding in plain sight.",
  emphasis: [
    "fuel",
    "tail",
    "wings",
    "range",
    "not",
    "why",
    "tank",
    "gravity",
    "backward",
    "cruise",
    "wing",
    "load",
    "drag",
    "ocean",
    "balance",
    "pounds",
    "hidden",
    "trick",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.7, startFrom: 2 },
    { clip: "cabin.mp4", start: 3.7, end: 7.4, startFrom: 4 },
    { clip: "window.mp4", start: 7.4, end: 11.1, startFrom: 7 },
    { clip: "takeoff.mp4", start: 11.1, end: 14.8, startFrom: 3 },
    { clip: "citynight.mp4", start: 14.8, end: 18.5, startFrom: 5 },
    { clip: "window.mp4", start: 18.5, end: 22.2, startFrom: 11 },
    { clip: "citynight.mp4", start: 22.2, end: 25.9, startFrom: 8 },
    { clip: "cabin.mp4", start: 25.9, end: 29.5, startFrom: 6 },
    { clip: "window.mp4", start: 29.5, end: 33.188, startFrom: 14 },
  ],
};
