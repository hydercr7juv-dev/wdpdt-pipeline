import { VideoSpec } from "../lib/video";

export const dimLights: VideoSpec = {
  id: "DimLights",
  title: "Why Flight Attendants Dim The Cabin Lights",
  voFile: "assets/vo_dimLights.mp3",
  audioDuration: 38.712,
  script:
    "Why do flight attendants dim the cabin lights for every takeoff and landing? " +
    "Some people think it's just to help you relax or watch the view. But that's not actually why. " +
    "Takeoff and landing are the two moments when an emergency evacuation is statistically most likely, " +
    "and human eyes take up to thirty seconds to adjust between bright and dark environments. By dimming the cabin " +
    "ahead of time, your eyes are already adjusted to darkness in case the power fails or you need to escape through " +
    "smoke into a dark night outside. It's also why window shades go up, so crew can spot fire or hazards before " +
    "anyone opens a door. Skip the dimming, and a sudden blackout could cost the crucial seconds a real evacuation cannot spare.",
  emphasis: [
    "dim",
    "cabin lights",
    "takeoff",
    "landing",
    "not",
    "why",
    "emergency evacuation",
    "statistically",
    "eyes",
    "thirty seconds",
    "adjust",
    "dark",
    "power fails",
    "smoke",
    "window shades",
    "fire",
    "hazards",
    "blackout",
    "crucial seconds",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 4.0, startFrom: 3 },
    { clip: "eye.mp4", start: 4.0, end: 7.6, startFrom: 2 },
    { clip: "takeoff.mp4", start: 7.6, end: 11.4, startFrom: 5 },
    { clip: "cabin.mp4", start: 11.4, end: 15.2, startFrom: 10 },
    { clip: "eye.mp4", start: 15.2, end: 19.0, startFrom: 6 },
    { clip: "citynight.mp4", start: 19.0, end: 22.8, startFrom: 7 },
    { clip: "cabin.mp4", start: 22.8, end: 26.6, startFrom: 15 },
    { clip: "window.mp4", start: 26.6, end: 30.4, startFrom: 8 },
    { clip: "window.mp4", start: 30.4, end: 34.6, startFrom: 13 },
    { clip: "runway.mp4", start: 34.6, end: 39.212, startFrom: 4 },
  ],
};
