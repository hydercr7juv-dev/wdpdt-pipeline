import { VideoSpec } from "../lib/video";

export const boardingLeft: VideoSpec = {
  id: "BoardingLeft",
  title: "Why You Always Board A Plane From The Left #Shorts",
  voFile: "assets/vo_boarding.mp3",
  audioDuration: 24.456,
  script:
    "Why do you always board a plane from the left side? Some people think it's just how the airport gates are built. " +
    "But that's not actually why. The left side is kept clear for people because the right side belongs to the ground crew. " +
    "Fuel goes into the wing from the right, catering loads from the right, and the cargo doors are on the right. " +
    "Keeping passengers on one side and thousands of litres of jet fuel on the other means the two never cross. " +
    "It's separation, not tradition.",
  emphasis: [
    "board", "left", "side", "gates", "not", "why", "clear", "right",
    "ground", "crew", "fuel", "wing", "catering", "cargo", "doors",
    "passengers", "litres", "cross", "separation", "tradition",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.5, startFrom: 1 },
    { clip: "cabin.mp4", start: 3.5, end: 7.0, startFrom: 5 },
    { clip: "window.mp4", start: 7.0, end: 10.5, startFrom: 6 },
    { clip: "runway.mp4", start: 10.5, end: 14.0, startFrom: 6 },
    { clip: "takeoff.mp4", start: 14.0, end: 17.5, startFrom: 2 },
    { clip: "citynight.mp4", start: 17.5, end: 21.0, startFrom: 4 },
    { clip: "runway.mp4", start: 21.0, end: 25.0, startFrom: 10 },
  ],
};
