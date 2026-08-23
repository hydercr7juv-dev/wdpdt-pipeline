import { VideoSpec } from "../lib/video";

// First video for the "What If Labs" channel (@whatif_786labs) rather than the
// aviation channel. Same Slouch structure, science footage: all NASA public
// domain (images-assets.nasa.gov), cropped to vertical.
export const earthStopped: VideoSpec = {
  id: "EarthStopped",
  title: "What If The Earth Stopped Spinning? #Shorts",
  voFile: "assets/vo_earthstop.mp3",
  audioDuration: 29.76,
  script:
    "What if the Earth just stopped spinning? Some people think we'd all float off into space. " +
    "But that's not what happens. Gravity doesn't change at all. The problem is momentum. At the equator " +
    "the ground is carrying you sideways at about a thousand miles an hour. Stop the ground, and everything " +
    "that isn't anchored to bedrock keeps going. The air keeps moving too, so the surface gets scoured by " +
    "permanent, hurricane force wind. And the oceans would slowly drain toward the poles, leaving one " +
    "enormous dry continent around the middle.",
  emphasis: [
    "Earth", "stopped", "spinning", "float", "space", "not", "gravity",
    "momentum", "equator", "thousand", "miles", "hour", "bedrock", "keeps",
    "going", "air", "scoured", "hurricane", "wind", "oceans", "poles",
    "continent",
  ],
  scenes: [
    { clip: "sci_earth1.mp4", start: 0.0, end: 3.5, startFrom: 1 },
    { clip: "sci_storm1.mp4", start: 3.5, end: 7.0, startFrom: 2 },
    { clip: "sci_earth2.mp4", start: 7.0, end: 10.5, startFrom: 3 },
    { clip: "sci_storm2.mp4", start: 10.5, end: 14.0, startFrom: 2 },
    { clip: "sci_aurora1.mp4", start: 14.0, end: 17.5, startFrom: 3 },
    { clip: "sci_storm3.mp4", start: 17.5, end: 21.5, startFrom: 2 },
    { clip: "sci_earth2.mp4", start: 21.5, end: 25.5, startFrom: 9 },
    { clip: "sci_storm1.mp4", start: 25.5, end: 30.3, startFrom: 8 },
  ],
};
