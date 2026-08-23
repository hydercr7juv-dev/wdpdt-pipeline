import { VideoSpec } from "../lib/video";

export const toiletFlush: VideoSpec = {
  id: "ToiletFlush",
  title: "Why Airplane Toilets Are So Loud",
  voFile: "assets/vo_toiletFlush.mp3",
  audioDuration: 30.504,
  script:
    "Why do airplane toilets sound like they're trying to suck you into the sky? " +
    "Some people think it's just a badly designed pump. But that's not actually why. " +
    "Regular flush toilets use gravity and gallons of water, which would be way too heavy and messy " +
    "for a plane. So airplane toilets use a vacuum system instead, powered by the pressure difference " +
    "between the cabin and the thin air outside. Opening the valve creates a rush of air that drags " +
    "waste away using barely a cup of water. That vacuum design saves hundreds of pounds of water " +
    "weight on every single flight.",
  emphasis: [
    "toilets",
    "suck",
    "pump",
    "not",
    "why",
    "gravity",
    "gallons",
    "heavy",
    "messy",
    "vacuum",
    "pressure",
    "cabin",
    "outside",
    "valve",
    "rush",
    "waste",
    "cup",
    "hundreds",
    "pounds",
    "weight",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 3.4, startFrom: 6 },
    { clip: "window.mp4", start: 3.4, end: 6.8, startFrom: 1 },
    { clip: "cabin.mp4", start: 6.8, end: 10.0, startFrom: 13 },
    { clip: "eye.mp4", start: 10.0, end: 13.2, startFrom: 4 },
    { clip: "cabin.mp4", start: 13.2, end: 16.6, startFrom: 2 },
    { clip: "window.mp4", start: 16.6, end: 19.8, startFrom: 8 },
    { clip: "cabin.mp4", start: 19.8, end: 23.0, startFrom: 17 },
    { clip: "citynight.mp4", start: 23.0, end: 26.2, startFrom: 6 },
    { clip: "cabin.mp4", start: 26.2, end: 27.8, startFrom: 10 },
    { clip: "window.mp4", start: 27.8, end: 31.0, startFrom: 14 },
  ],
};
