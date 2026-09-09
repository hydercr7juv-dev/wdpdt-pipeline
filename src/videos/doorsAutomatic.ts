import { VideoSpec } from "../lib/video";

export const doorsAutomatic: VideoSpec = {
  id: "DoorsAutomatic",
  title: "Why Flight Attendants Say Doors To Automatic",
  voFile: "assets/vo_doorsAutomatic.mp3",
  audioDuration: 34.392,
  script:
    "Why do flight attendants say doors to automatic and cross check before every takeoff? " +
    "Some people think it's just a routine announcement. But that's not actually why. " +
    "Every airplane door has a folding evacuation slide packed into its base, connected to a metal bar called the girt bar. " +
    "In automatic mode that bar locks to the floor, so opening the door instantly fires the slide before anyone even has to think. " +
    "Forget to switch it back to manual before opening the door at the gate, and the slide can blast out and slam into the jet bridge in seconds, " +
    "which is why that cross check is treated as a life or death step, not a formality.",
  emphasis: [
    "doors",
    "automatic",
    "cross",
    "check",
    "not",
    "why",
    "evacuation",
    "slide",
    "girt",
    "bar",
    "locks",
    "floor",
    "instantly",
    "fires",
    "forget",
    "manual",
    "gate",
    "blast",
    "jet",
    "bridge",
    "life",
    "death",
    "formality",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 3.8, startFrom: 4 },
    { clip: "window.mp4", start: 3.8, end: 7.4, startFrom: 9 },
    { clip: "cabin.mp4", start: 7.4, end: 10.8, startFrom: 12 },
    { clip: "runway.mp4", start: 10.8, end: 14.4, startFrom: 3 },
    { clip: "cabin.mp4", start: 14.4, end: 17.8, startFrom: 6 },
    { clip: "takeoff.mp4", start: 17.8, end: 21.4, startFrom: 5 },
    { clip: "eye.mp4", start: 21.4, end: 24.8, startFrom: 2 },
    { clip: "cabin.mp4", start: 24.8, end: 28.4, startFrom: 15 },
    { clip: "citynight.mp4", start: 28.4, end: 31.6, startFrom: 7 },
    { clip: "cabin.mp4", start: 31.6, end: 34.9, startFrom: 17 },
  ],
};
