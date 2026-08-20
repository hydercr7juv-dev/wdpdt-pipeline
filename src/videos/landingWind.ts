import { VideoSpec } from "../lib/video";

export const landingWind: VideoSpec = {
  id: "LandingIntoWind",
  title: "Why Planes Always Land Into The Wind #Shorts",
  voFile: "assets/vo_landingWind.mp3",
  audioDuration: 28.944,
  script:
    "Why do planes almost always take off and land facing into the wind? Some people think it's just tradition or a habit pilots picked up. " +
    "But that's not actually why. A headwind flows over the wings faster than the plane is actually moving across the ground, so the wings make " +
    "enough lift at a lower, safer ground speed. That means a shorter takeoff roll, a slower touchdown, and a shorter stopping distance once the " +
    "wheels hit pavement. Landing with the wind instead of against it can add hundreds of extra feet the runway might not have.",
  emphasis: [
    "wind", "takeoff", "land", "tradition", "not", "why", "headwind", "wings",
    "lift", "ground", "speed", "shorter", "touchdown", "stopping", "distance", "runway",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.3, startFrom: 1 },
    { clip: "takeoff.mp4", start: 3.3, end: 6.6, startFrom: 3 },
    { clip: "window.mp4", start: 6.6, end: 9.9, startFrom: 8 },
    { clip: "runway.mp4", start: 9.9, end: 13.2, startFrom: 6 },
    { clip: "takeoff.mp4", start: 13.2, end: 16.5, startFrom: 10 },
    { clip: "window.mp4", start: 16.5, end: 19.8, startFrom: 14 },
    { clip: "citynight.mp4", start: 19.8, end: 23.1, startFrom: 5 },
    { clip: "runway.mp4", start: 23.1, end: 26.3, startFrom: 12 },
    { clip: "takeoff.mp4", start: 26.3, end: 29.444, startFrom: 15 },
  ],
};
