import { VideoSpec } from "../lib/video";

export const airplaneLights: VideoSpec = {
  id: "AirplaneLights",
  title: "Why Pilots Dim The Lights Before Every Landing",
  voFile: "assets/vo.mp3",
  audioDuration: 38.766,
  script:
    "Why do pilots dim all the cabin lights right before landing? " +
    "Some people think it's just to help you relax. But that's not actually why. " +
    "It's about your eyes. At night, the cabin is far brighter than the world outside. " +
    "If something went wrong and you had to evacuate, your eyes could need up to " +
    "thirty seconds to adjust to the darkness. Time you might not have. " +
    "So the crew dims the lights early, letting your eyes adjust while you're still " +
    "safely in your seat. That way, if the doors open into darkness, you can see the " +
    "exits instantly. And every second saved could be the difference that gets everyone out.",
  emphasis: [
    "dim",
    "lights",
    "landing",
    "relax",
    "not",
    "why",
    "eyes",
    "brighter",
    "outside",
    "evacuate",
    "thirty",
    "seconds",
    "darkness",
    "have",
    "adjust",
    "seat",
    "exits",
    "instantly",
    "everyone",
    "out",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 4.0, startFrom: 1 },
    { clip: "window.mp4", start: 4.0, end: 7.2, startFrom: 2 },
    { clip: "cabin.mp4", start: 7.2, end: 10.4, startFrom: 6 },
    { clip: "eye.mp4", start: 10.4, end: 13.6, startFrom: 1 },
    { clip: "citynight.mp4", start: 13.6, end: 17.6, startFrom: 3 },
    { clip: "takeoff.mp4", start: 17.6, end: 21.4, startFrom: 2 },
    { clip: "eye.mp4", start: 21.4, end: 25.2, startFrom: 5 },
    { clip: "cabin.mp4", start: 25.2, end: 29.2, startFrom: 9 },
    { clip: "citynight.mp4", start: 29.2, end: 34.0, startFrom: 12 },
    { clip: "runway.mp4", start: 34.0, end: 39.27, startFrom: 3 },
  ],
};
