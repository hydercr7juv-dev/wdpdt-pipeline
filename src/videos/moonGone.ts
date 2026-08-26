import { VideoSpec } from "../lib/video";

export const moonGone: VideoSpec = {
  id: "MoonGone",
  title: "What If The Moon Disappeared? #Shorts",
  voFile: "assets/vo_moongone.mp3",
  audioDuration: 22.968,
  script:
    "What if the Moon just disappeared? Some people think Earth would spin out of orbit. It wouldn't. Our orbit around the Sun barely notices. What changes is closer to home. Tides would shrink to about a third, because most of the pull is lunar. Nights would go genuinely dark. And over time the Moon's gravity stops steadying our tilt, so Earth's axis could wander, which would make the seasons far less predictable than they are now.",
  emphasis: ["Moon", "disappeared", "spin", "orbit", "wouldn't", "Sun", "barely", "notices", "tides", "shrink", "third", "pull", "lunar", "nights", "dark", "gravity", "steadying", "tilt", "axis", "wander", "seasons", "predictable"],
  scenes: [
    { clip: "sci_earth1.mp4", start: 0.0, end: 2.93, startFrom: 1 },
    { clip: "sci_storm1.mp4", start: 2.93, end: 5.87, startFrom: 3 },
    { clip: "sci_earth2.mp4", start: 5.87, end: 8.8, startFrom: 5 },
    { clip: "sci_aurora1.mp4", start: 8.8, end: 11.73, startFrom: 1 },
    { clip: "sci_storm2.mp4", start: 11.73, end: 14.67, startFrom: 3 },
    { clip: "sci_earth1.mp4", start: 14.67, end: 17.6, startFrom: 5 },
    { clip: "sci_ice1.mp4", start: 17.6, end: 20.54, startFrom: 1 },
    { clip: "sci_earth2.mp4", start: 20.54, end: 23.47, startFrom: 3 },
  ],
};
