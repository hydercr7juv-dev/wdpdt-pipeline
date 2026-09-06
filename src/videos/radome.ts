import { VideoSpec } from "../lib/video";

export const radome: VideoSpec = {
  id: "Radome",
  title: "Why The Nose Of A Plane Is A Different Color",
  voFile: "assets/vo_radome.mp3",
  audioDuration: 31.272,
  script:
    "Why is the nose of an airplane a different color than the rest of the fuselage? " +
    "Some people think it's just cheap paint or a patch job. But that's not actually why. " +
    "That nose cone is called a radome, and engineers build it from fiberglass or composite " +
    "instead of metal, because metal would block the radar signal hiding just behind it. " +
    "The weather radar needs to send and receive its beam straight through that material " +
    "to spot storms far ahead. If the nose were solid aluminum like the rest of the plane, " +
    "pilots would be flying blind into turbulence and lightning they never saw coming.",
  emphasis: [
    "nose",
    "different",
    "color",
    "fuselage",
    "cheap",
    "paint",
    "patch",
    "not",
    "why",
    "radome",
    "fiberglass",
    "composite",
    "metal",
    "block",
    "radar",
    "beam",
    "storms",
    "aluminum",
    "blind",
    "lightning",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.5, startFrom: 2 },
    { clip: "window.mp4", start: 3.5, end: 7.0, startFrom: 1 },
    { clip: "cabin.mp4", start: 7.0, end: 10.5, startFrom: 4 },
    { clip: "eye.mp4", start: 10.5, end: 14.0, startFrom: 3 },
    { clip: "citynight.mp4", start: 14.0, end: 17.5, startFrom: 5 },
    { clip: "eye.mp4", start: 17.5, end: 21.0, startFrom: 9 },
    { clip: "citynight.mp4", start: 21.0, end: 24.5, startFrom: 12 },
    { clip: "takeoff.mp4", start: 24.5, end: 28.0, startFrom: 4 },
    { clip: "runway.mp4", start: 28.0, end: 31.772, startFrom: 7 },
  ],
};
