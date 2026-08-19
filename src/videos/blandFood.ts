import { VideoSpec } from "../lib/video";

export const blandFood: VideoSpec = {
  id: "BlandFood",
  title: "Why Airplane Food Tastes So Bland",
  voFile: "assets/vo_food.mp3",
  audioDuration: 27.096,
  script:
    "Why does airplane food taste so bland? Some people think airlines just use cheap ingredients. " +
    "But that's not actually why. At cruising altitude, the low pressure and dry air in the cabin " +
    "actually numb your taste buds, cutting your ability to taste sweet and salty by up to thirty percent. " +
    "It's the same feeling as having a heavy cold. That's why airlines over-season everything and why " +
    "tomato juice suddenly tastes amazing up there. Your food didn't change. Your tongue did.",
  emphasis: [
    "bland", "cheap", "not", "why", "altitude", "pressure", "numb", "taste", "buds",
    "thirty", "percent", "cold", "over-season", "tomato", "amazing", "food", "tongue",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 3.8, startFrom: 2 },
    { clip: "cabin.mp4", start: 3.8, end: 7.0, startFrom: 7 },
    { clip: "window.mp4", start: 7.0, end: 11.0, startFrom: 3 },
    { clip: "citynight.mp4", start: 11.0, end: 15.0, startFrom: 4 },
    { clip: "cabin.mp4", start: 15.0, end: 18.5, startFrom: 11 },
    { clip: "window.mp4", start: 18.5, end: 22.0, startFrom: 12 },
    { clip: "takeoff.mp4", start: 22.0, end: 25.0, startFrom: 2 },
    { clip: "cabin.mp4", start: 25.0, end: 27.6, startFrom: 4 },
  ],
};
