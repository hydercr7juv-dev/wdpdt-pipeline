import { VideoSpec } from "../lib/video";

export const etops: VideoSpec = {
  id: "Etops",
  title: "Why Twin Engine Jets Can Fly Hours From Any Airport",
  voFile: "assets/vo_etops.mp3",
  audioDuration: 27.744,
  script:
    "Why are twin engine jets allowed to fly hours from the nearest airport, far out over open ocean? " +
    "Some people think it's just modern engines being powerful enough. But that's not actually why. " +
    "It's a certification called ETOPS, and it forces airlines to prove an engine can run for hours " +
    "without failure, then plan every route around exactly how far a plane can glide to a diversion " +
    "airport if one engine quits. Cross that boundary without the rating, and there's no runway close " +
    "enough to save you.",
  emphasis: [
    "twin",
    "engine",
    "jets",
    "ocean",
    "etops",
    "certification",
    "airlines",
    "prove",
    "failure",
    "route",
    "glide",
    "diversion",
    "quits",
    "boundary",
    "rating",
    "save",
  ],
  scenes: [
    { clip: "citynight.mp4", start: 0.0, end: 3.4, startFrom: 4 },
    { clip: "window.mp4", start: 3.4, end: 6.8, startFrom: 10 },
    { clip: "eye.mp4", start: 6.8, end: 10.2, startFrom: 2 },
    { clip: "takeoff.mp4", start: 10.2, end: 13.6, startFrom: 6 },
    { clip: "citynight.mp4", start: 13.6, end: 17.0, startFrom: 13 },
    { clip: "window.mp4", start: 17.0, end: 20.4, startFrom: 16 },
    { clip: "eye.mp4", start: 20.4, end: 23.8, startFrom: 9 },
    { clip: "citynight.mp4", start: 23.8, end: 28.244, startFrom: 1 },
  ],
};
