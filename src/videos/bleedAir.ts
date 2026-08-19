import { VideoSpec } from "../lib/video";

export const bleedAir: VideoSpec = {
  id: "BleedAir",
  title: "You're Breathing Engine Air Right Now",
  voFile: "assets/vo_bleed.mp3",
  audioDuration: 35.4,
  script:
    "The air you breathe on a plane comes straight through the engines. " +
    "Some people think there are huge oxygen tanks hidden somewhere on board. " +
    "But that's not actually why the cabin stays breathable. At thirty five thousand feet, " +
    "the air outside is far too thin to keep you alive. So the engines grab that thin air as they spin, " +
    "squeeze it until it's dense and warm, and bleed some of it off before it gets burned. " +
    "That's literally called bleed air. It's cooled, filtered, and pumped through the cabin, " +
    "refreshing completely every few minutes. So the air keeping you breathing up there was, " +
    "just seconds ago, screaming through a jet engine at hundreds of miles an hour.",
  emphasis: [
    "air", "breathe", "engines", "oxygen", "tanks", "not", "why", "thin",
    "alive", "spin", "squeeze", "dense", "warm", "bleed", "cooled", "filtered",
    "cabin", "minutes", "screaming", "jet", "engine", "hundreds",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 4.0, startFrom: 1 },
    { clip: "cabin.mp4", start: 4.0, end: 7.6, startFrom: 6 },
    { clip: "window.mp4", start: 7.6, end: 11.2, startFrom: 3 },
    { clip: "takeoff.mp4", start: 11.2, end: 15.0, startFrom: 1 },
    { clip: "takeoff.mp4", start: 15.0, end: 18.6, startFrom: 7 },
    { clip: "cabin.mp4", start: 18.6, end: 22.2, startFrom: 10 },
    { clip: "cabin.mp4", start: 22.2, end: 26.0, startFrom: 2 },
    { clip: "citynight.mp4", start: 26.0, end: 30.0, startFrom: 8 },
    { clip: "takeoff.mp4", start: 30.0, end: 35.9, startFrom: 3 },
  ],
};
