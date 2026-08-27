import { VideoSpec } from "../lib/video";

export const staticWicks: VideoSpec = {
  id: "StaticWicks",
  title: "The Tiny Spikes On Every Wingtip",
  voFile: "assets/vo_staticWicks.mp3",
  audioDuration: 37.992,
  script:
    "Why do airplane wings have tiny spikes trailing off the back edge? " +
    "Some people think they're antennas, or just structural fasteners. But that's not actually why. " +
    "Flying through clouds and dust builds up static electricity across the whole aircraft, sometimes tens of " +
    "thousands of volts. Those spikes, called static wicks, are designed to bleed that charge off quietly into " +
    "the air instead of letting it build up. Without them, the charge would eventually jump off the airframe " +
    "in a sudden discharge, and that discharge can scramble radio signals right when a pilot needs them most. " +
    "A few thin metal spikes are quietly protecting every radio call you never hear go silent.",
  emphasis: [
    "wings",
    "spikes",
    "antennas",
    "why",
    "clouds",
    "static",
    "electricity",
    "volts",
    "wicks",
    "bleed",
    "charge",
    "discharge",
    "radio",
    "signals",
    "pilot",
    "silent",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.8, startFrom: 4 },
    { clip: "takeoff.mp4", start: 3.8, end: 7.4, startFrom: 3 },
    { clip: "citynight.mp4", start: 7.4, end: 11.0, startFrom: 6 },
    { clip: "window.mp4", start: 11.0, end: 14.8, startFrom: 9 },
    { clip: "cabin.mp4", start: 14.8, end: 18.2, startFrom: 5 },
    { clip: "eye.mp4", start: 18.2, end: 21.8, startFrom: 2 },
    { clip: "window.mp4", start: 21.8, end: 25.4, startFrom: 14 },
    { clip: "citynight.mp4", start: 25.4, end: 29.0, startFrom: 12 },
    { clip: "takeoff.mp4", start: 29.0, end: 34.0, startFrom: 7 },
    { clip: "window.mp4", start: 34.0, end: 38.492, startFrom: 17 },
  ],
};
