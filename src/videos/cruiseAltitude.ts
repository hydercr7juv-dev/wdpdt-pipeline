import { VideoSpec } from "../lib/video";

export const cruiseAltitude: VideoSpec = {
  id: "CruiseAltitude",
  title: "Why Planes Fly At 35,000 Feet #Shorts",
  voFile: "assets/vo_cruise.mp3",
  audioDuration: 29.568,
  script:
    "Why do planes fly so high, at thirty five thousand feet? Some people think it's just to get above the clouds. " +
    "But that's not actually why. Up there the air is so thin that the plane meets far less drag, so it burns much " +
    "less fuel and flies noticeably faster. It's also above most storms and turbulence, which is why the ride gets " +
    "smoother once you level off. And if an engine ever failed, that height buys the pilots precious minutes to glide " +
    "and restart. Thin air is the sweet spot between speed, safety, and fuel.",
  emphasis: [
    "high", "thirty", "thousand", "clouds", "not", "why", "thin", "drag", "fuel",
    "faster", "storms", "turbulence", "smoother", "engine", "failed", "glide",
    "minutes", "sweet", "spot", "safety",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.5, startFrom: 2 },
    { clip: "citynight.mp4", start: 3.5, end: 7.0, startFrom: 3 },
    { clip: "takeoff.mp4", start: 7.0, end: 11.0, startFrom: 1 },
    { clip: "window.mp4", start: 11.0, end: 15.0, startFrom: 8 },
    { clip: "citynight.mp4", start: 15.0, end: 18.5, startFrom: 10 },
    { clip: "window.mp4", start: 18.5, end: 22.0, startFrom: 14 },
    { clip: "takeoff.mp4", start: 22.0, end: 26.0, startFrom: 5 },
    { clip: "citynight.mp4", start: 26.0, end: 30.07, startFrom: 6 },
  ],
};
