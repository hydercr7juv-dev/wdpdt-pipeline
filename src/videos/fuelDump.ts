import { VideoSpec } from "../lib/video";

export const fuelDump: VideoSpec = {
  id: "FuelDump",
  title: "Why Planes Dump Fuel In The Sky Before Landing",
  voFile: "assets/vo_fuel.mp3",
  audioDuration: 41.328,
  script:
    "Why do planes dump thousands of gallons of fuel into the sky before landing? " +
    "Some people think the pilots are panicking, or wasting it. But that's not actually why. " +
    "A plane can take off far heavier than it's allowed to land. Normally it burns that weight away " +
    "over hours, and lands light and safe. But in an emergency right after takeoff, it's still far too heavy. " +
    "Landing that heavy could slam the gear straight through the wings. So it opens valves near the wingtips " +
    "and sprays the fuel out, high enough that it turns to vapor before it reaches the ground. In minutes, " +
    "a plane too heavy to survive the runway becomes light enough to land gently. It looks wasteful. " +
    "It's the difference between everyone walking away and a broken aircraft.",
  emphasis: [
    "dump", "fuel", "sky", "landing", "panicking", "wasting", "not", "why",
    "heavier", "land", "hours", "emergency", "takeoff", "heavy", "gear",
    "wings", "valves", "wingtips", "vapor", "ground", "gently", "wasteful",
    "walking", "broken",
  ],
  scenes: [
    { clip: "takeoff.mp4", start: 0.0, end: 4.0, startFrom: 1 },
    { clip: "cabin.mp4", start: 4.0, end: 7.6, startFrom: 3 },
    { clip: "takeoff.mp4", start: 7.6, end: 11.2, startFrom: 6 },
    { clip: "window.mp4", start: 11.2, end: 15.2, startFrom: 4 },
    { clip: "takeoff.mp4", start: 15.2, end: 18.8, startFrom: 9 },
    { clip: "runway.mp4", start: 18.8, end: 22.4, startFrom: 2 },
    { clip: "citynight.mp4", start: 22.4, end: 26.4, startFrom: 5 },
    { clip: "window.mp4", start: 26.4, end: 30.4, startFrom: 14 },
    { clip: "runway.mp4", start: 30.4, end: 34.4, startFrom: 10 },
    { clip: "takeoff.mp4", start: 34.4, end: 38.0, startFrom: 4 },
    { clip: "runway.mp4", start: 38.0, end: 41.9, startFrom: 16 },
  ],
};
