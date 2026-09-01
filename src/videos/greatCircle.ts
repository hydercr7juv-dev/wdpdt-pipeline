import { VideoSpec } from "../lib/video";

export const greatCircle: VideoSpec = {
  id: "GreatCircle",
  title: "Why Flight Paths Curve Toward The Pole",
  voFile: "assets/vo_greatCircle.mp3",
  audioDuration: 33.072,
  script:
    "Why does your flight tracker show the plane curving way up near the pole instead of flying " +
    "straight across the map? Some people think the pilots are dodging weather or off course. " +
    "But that's not actually why. The Earth is a sphere, and flat maps stretch and distort the " +
    "distance near the poles. The shortest path between two points on a globe is called a great " +
    "circle, and it often bends toward the pole even though the map makes that look longer. Flying " +
    "that curved path can save hundreds of miles and thousands of pounds of fuel compared to the " +
    "straight line drawn on a flat chart. The strange curve on the screen is actually the shortcut.",
  emphasis: [
    "flight",
    "tracker",
    "curving",
    "pole",
    "straight",
    "map",
    "sphere",
    "globe",
    "distort",
    "shortest",
    "great",
    "circle",
    "bends",
    "shortcut",
    "fuel",
    "miles",
    "curve",
    "screen",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.6, startFrom: 2 },
    { clip: "citynight.mp4", start: 3.6, end: 7.2, startFrom: 8 },
    { clip: "cabin.mp4", start: 7.2, end: 10.8, startFrom: 3 },
    { clip: "window.mp4", start: 10.8, end: 14.4, startFrom: 13 },
    { clip: "citynight.mp4", start: 14.4, end: 18.0, startFrom: 4 },
    { clip: "cabin.mp4", start: 18.0, end: 21.6, startFrom: 10 },
    { clip: "window.mp4", start: 21.6, end: 25.2, startFrom: 17 },
    { clip: "citynight.mp4", start: 25.2, end: 29.2, startFrom: 11 },
    { clip: "window.mp4", start: 29.2, end: 33.572, startFrom: 6 },
  ],
};
