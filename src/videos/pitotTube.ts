import { VideoSpec } from "../lib/video";

export const pitotTube: VideoSpec = {
  id: "PitotTube",
  title: "The Tiny Tube Ground Crews Cover On Every Plane",
  voFile: "assets/vo_pitotTube.mp3",
  audioDuration: 30.504,
  script:
    "Why do ground crews cover a tiny tube on every plane's nose the moment it lands? " +
    "Some people think it's just an antenna or a sensor for decoration. But that's not actually why. " +
    "That thin forward facing probe catches rushing air pressure, and that pressure is the only way the cockpit " +
    "instruments actually know how fast the plane is flying. If insects, ice, or a forgotten cover block that " +
    "opening, the speed readings can turn dangerously wrong without any warning at all. That one clogged tube " +
    "has already been blamed for real fatal crashes.",
  emphasis: [
    "tiny",
    "tube",
    "nose",
    "antenna",
    "probe",
    "pressure",
    "cockpit",
    "instruments",
    "speed",
    "insects",
    "ice",
    "block",
    "dangerously",
    "wrong",
    "clogged",
    "fatal",
    "crashes",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.5, startFrom: 1 },
    { clip: "eye.mp4", start: 3.5, end: 7.0, startFrom: 2 },
    { clip: "cabin.mp4", start: 7.0, end: 10.5, startFrom: 3 },
    { clip: "window.mp4", start: 10.5, end: 14.0, startFrom: 4 },
    { clip: "eye.mp4", start: 14.0, end: 17.5, startFrom: 8 },
    { clip: "runway.mp4", start: 17.5, end: 21.0, startFrom: 6 },
    { clip: "takeoff.mp4", start: 21.0, end: 24.5, startFrom: 3 },
    { clip: "window.mp4", start: 24.5, end: 27.5, startFrom: 12 },
    { clip: "eye.mp4", start: 27.5, end: 31.004, startFrom: 14 },
  ],
};
