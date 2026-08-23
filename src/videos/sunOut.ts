import { VideoSpec } from "../lib/video";

// "What If Labs" channel (@whatif_786labs). NASA public-domain footage.
export const sunOut: VideoSpec = {
  id: "SunOut",
  title: "What If The Sun Went Out? #Shorts",
  voFile: "assets/vo_sunout.mp3",
  audioDuration: 26.952,
  script:
    "What if the Sun just went out? For eight minutes and twenty seconds, nothing happens. That's how long its light takes to reach us, so we'd carry on completely unaware. Then the sky goes dark. Within a week the average surface temperature drops below freezing. Within a year it's around minus seventy. The oceans freeze from the top down, which actually insulates the water underneath, and deep sea vents, which never needed sunlight, would keep their ecosystems alive in the dark.",
  emphasis: ["Sun", "out", "eight", "minutes", "twenty", "seconds", "light", "unaware", "dark", "week", "freezing", "year", "minus", "seventy", "oceans", "freeze", "insulates", "vents", "sunlight", "alive"],
  scenes: [
    { clip: "sci_flare1.mp4", start: 0.0, end: 3.43, startFrom: 1 },
    { clip: "sci_earth1.mp4", start: 3.43, end: 6.86, startFrom: 4 },
    { clip: "sci_flare2.mp4", start: 6.86, end: 10.29, startFrom: 7 },
    { clip: "sci_storm1.mp4", start: 10.29, end: 13.72, startFrom: 1 },
    { clip: "sci_ice1.mp4", start: 13.72, end: 17.16, startFrom: 4 },
    { clip: "sci_earth2.mp4", start: 17.16, end: 20.59, startFrom: 7 },
    { clip: "sci_ice2.mp4", start: 20.59, end: 24.02, startFrom: 1 },
    { clip: "sci_flare1.mp4", start: 24.02, end: 27.45, startFrom: 4 },
  ],
};
