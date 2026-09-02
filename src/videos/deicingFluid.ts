import { VideoSpec } from "../lib/video";

export const deicingFluid: VideoSpec = {
  id: "DeicingFluid",
  title: "Why Planes Get Sprayed Orange In Winter",
  voFile: "assets/vo_deicingFluid.mp3",
  audioDuration: 33.288,
  script:
    "Why do airplanes get sprayed with thick orange fluid before takeoff in winter? " +
    "Some people think it's just to clean the plane. But that's not actually why. " +
    "That fluid is a glycol deicer, first used to strip existing ice and snow off the wings, since even a thin " +
    "layer disrupts the smooth airflow a wing needs to generate lift. A second, syrupy anti-ice fluid is often " +
    "layered on top, designed to shear off as the plane accelerates down the runway, carrying new ice away with it. " +
    "Skip that spray, and a wing coated in frost can lose enough lift to never get the plane off the ground.",
  emphasis: [
    "orange",
    "fluid",
    "winter",
    "glycol",
    "deicer",
    "ice",
    "snow",
    "airflow",
    "lift",
    "syrupy",
    "shear",
    "accelerates",
    "frost",
    "ground",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.75, startFrom: 2 },
    { clip: "window.mp4", start: 3.75, end: 7.5, startFrom: 7 },
    { clip: "cabin.mp4", start: 7.5, end: 11.25, startFrom: 4 },
    { clip: "window.mp4", start: 11.25, end: 15.0, startFrom: 12 },
    { clip: "runway.mp4", start: 15.0, end: 18.75, startFrom: 9 },
    { clip: "eye.mp4", start: 18.75, end: 22.5, startFrom: 3 },
    { clip: "window.mp4", start: 22.5, end: 26.25, startFrom: 16 },
    { clip: "takeoff.mp4", start: 26.25, end: 30.0, startFrom: 5 },
    { clip: "citynight.mp4", start: 30.0, end: 33.788, startFrom: 8 },
  ],
};
