import { VideoSpec } from "../lib/video";

export const noStepWing: VideoSpec = {
  id: "NoStepWing",
  title: "Why Wings Say NO STEP",
  voFile: "assets/vo_noStepWing.mp3",
  audioDuration: 33.072,
  script:
    "Why does an airplane wing have the words NO STEP stenciled right onto the metal? " +
    "Some people think it's just an old warning for careless walkers. But that's not actually why. " +
    "Only certain panels on a wing are built to carry a person's weight, thick ribs and spars " +
    "reinforced underneath the skin. The thin aluminum over the fuel tanks and control surfaces " +
    "flexes, and it can dent or even crack under a boot. So the stencil marks the safe path for " +
    "mechanics doing walk-around checks in the dark or in a hurry. Step in the wrong spot, and " +
    "you could crush the exact surface that keeps the plane flying smoothly.",
  emphasis: [
    "wing",
    "stenciled",
    "metal",
    "warning",
    "panels",
    "weight",
    "ribs",
    "spars",
    "reinforced",
    "aluminum",
    "fuel",
    "flexes",
    "dent",
    "crack",
    "boot",
    "mechanics",
    "dark",
    "crush",
    "flying",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.8, startFrom: 2 },
    { clip: "cabin.mp4", start: 3.8, end: 7.5, startFrom: 5 },
    { clip: "window.mp4", start: 7.5, end: 11.2, startFrom: 10 },
    { clip: "eye.mp4", start: 11.2, end: 14.9, startFrom: 3 },
    { clip: "window.mp4", start: 14.9, end: 18.6, startFrom: 14 },
    { clip: "cabin.mp4", start: 18.6, end: 22.3, startFrom: 7 },
    { clip: "window.mp4", start: 22.3, end: 26.0, startFrom: 17 },
    { clip: "takeoff.mp4", start: 26.0, end: 29.7, startFrom: 6 },
    { clip: "window.mp4", start: 29.7, end: 33.572, startFrom: 1 },
  ],
};
