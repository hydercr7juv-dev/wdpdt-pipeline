import { VideoSpec } from "../lib/video";

export const winglets: VideoSpec = {
  id: "Winglets",
  title: "Why Airplane Wingtips Curve Upward",
  voFile: "assets/vo_winglets.mp3",
  audioDuration: 36.96,
  script:
    "Why do airplane wingtips curve upward? Some people think it's just a stylish shape for airlines to show off. " +
    "But that's not actually why. As a wing generates lift, high pressure air underneath spills around the tip toward " +
    "the low pressure air on top, twisting into a spinning vortex that trails behind the plane. That vortex steals " +
    "energy from the wing and adds drag, forcing the engines to burn more fuel to push through it. The upward curve " +
    "of a winglet blocks that spillover, recovering lift that would otherwise be wasted and smoothing out the vortex. " +
    "Without winglets, airlines would burn millions more gallons of fuel every year just fighting their own turbulence.",
  emphasis: [
    "wingtips",
    "curve",
    "upward",
    "stylish",
    "not",
    "why",
    "lift",
    "pressure",
    "spills",
    "vortex",
    "trails",
    "steals",
    "energy",
    "drag",
    "fuel",
    "winglet",
    "recovering",
    "wasted",
    "turbulence",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.7, startFrom: 2 },
    { clip: "takeoff.mp4", start: 3.7, end: 7.4, startFrom: 4 },
    { clip: "window.mp4", start: 7.4, end: 11.1, startFrom: 9 },
    { clip: "citynight.mp4", start: 11.1, end: 14.8, startFrom: 5 },
    { clip: "window.mp4", start: 14.8, end: 18.5, startFrom: 14 },
    { clip: "cabin.mp4", start: 18.5, end: 22.2, startFrom: 3 },
    { clip: "window.mp4", start: 22.2, end: 25.9, startFrom: 17 },
    { clip: "takeoff.mp4", start: 25.9, end: 29.6, startFrom: 9 },
    { clip: "citynight.mp4", start: 29.6, end: 33.3, startFrom: 12 },
    { clip: "window.mp4", start: 33.3, end: 37.46, startFrom: 6 },
  ],
};
