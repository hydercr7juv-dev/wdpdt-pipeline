import { VideoSpec } from "../lib/video";

export const apu: VideoSpec = {
  id: "Apu",
  title: "Why Parked Planes Keep Humming With No Engines On",
  voFile: "assets/vo_apu.mp3",
  audioDuration: 35.28,
  script:
    "Why does a parked airplane keep humming even after both engines shut down? " +
    "Some people think it's just leftover engine noise, or a power truck idling nearby. But that's not actually why. " +
    "Tucked inside the tail is a small hidden jet engine called the auxiliary power unit. It spins all on its own, " +
    "making electricity for the cabin lights and screens, and blowing compressed air that starts the real engines " +
    "and runs the air conditioning. Without it, every plane would need special ground trucks to plug in power and " +
    "blast air through the cabin before each flight. That tiny engine in the tail is what lets a jet start itself, " +
    "anywhere on earth.",
  emphasis: [
    "humming",
    "engines",
    "shut",
    "down",
    "leftover",
    "noise",
    "not",
    "why",
    "hidden",
    "auxiliary",
    "power",
    "unit",
    "electricity",
    "lights",
    "screens",
    "compressed",
    "air",
    "starts",
    "trucks",
    "start",
    "itself",
    "anywhere",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.6, startFrom: 2 },
    { clip: "citynight.mp4", start: 3.6, end: 7.2, startFrom: 5 },
    { clip: "eye.mp4", start: 7.2, end: 10.8, startFrom: 3 },
    { clip: "cabin.mp4", start: 10.8, end: 14.4, startFrom: 4 },
    { clip: "window.mp4", start: 14.4, end: 18.0, startFrom: 7 },
    { clip: "cabin.mp4", start: 18.0, end: 21.6, startFrom: 10 },
    { clip: "takeoff.mp4", start: 21.6, end: 25.2, startFrom: 3 },
    { clip: "runway.mp4", start: 25.2, end: 28.8, startFrom: 8 },
    { clip: "citynight.mp4", start: 28.8, end: 32.4, startFrom: 12 },
    { clip: "takeoff.mp4", start: 32.4, end: 35.78, startFrom: 14 },
  ],
};
