import { VideoSpec } from "../lib/video";

export const earsPop: VideoSpec = {
  id: "EarsPop",
  title: "Why Your Ears Pop On A Plane #Shorts",
  voFile: "assets/vo_ears.mp3",
  audioDuration: 27.144,
  script:
    "Why do your ears pop when a plane climbs? Some people think it's because the cabin isn't pressurised. " +
    "But that's not actually why. The cabin is pressurised, just to roughly the air pressure you'd feel on a mountain. " +
    "As the plane climbs, the air already trapped behind your eardrum stays at ground pressure, so it pushes outward " +
    "until a narrow tube in your throat opens and lets it escape. That click is the pressure equalising. " +
    "Swallowing opens that tube sooner, which is why chewing actually helps.",
  emphasis: [
    "ears", "pop", "climbs", "cabin", "pressurised", "not", "why", "mountain",
    "trapped", "eardrum", "ground", "pushes", "outward", "narrow", "tube",
    "throat", "escape", "click", "equalising", "swallowing", "chewing", "helps",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 3.5, startFrom: 1 },
    { clip: "eye.mp4", start: 3.5, end: 6.5, startFrom: 2 },
    { clip: "takeoff.mp4", start: 6.5, end: 10.0, startFrom: 2 },
    { clip: "climbout.mp4", start: 10.0, end: 13.5, startFrom: 2 },
    { clip: "window.mp4", start: 13.5, end: 17.0, startFrom: 6 },
    { clip: "clouds.mp4", start: 17.0, end: 20.5, startFrom: 3 },
    { clip: "cabin.mp4", start: 20.5, end: 24.0, startFrom: 7 },
    { clip: "planeview.mp4", start: 24.0, end: 27.7, startFrom: 4 },
  ],
};
