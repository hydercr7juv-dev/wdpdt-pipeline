import { VideoSpec } from "../lib/video";

// "What If Labs" channel (@whatif_786labs). NASA public-domain footage.
export const iceMelt: VideoSpec = {
  id: "IceMelt",
  title: "What If All The Ice Melted? #Shorts",
  voFile: "assets/vo_icemelt.mp3",
  audioDuration: 26.664,
  script:
    "What if all the ice on Earth melted? Some people picture the whole planet underwater. It's not quite that dramatic, but it is enough. There's roughly enough ice to raise sea level by about sixty metres. That doesn't drown the continents, it redraws them. Florida, Bangladesh, the Netherlands and most major coastal cities go under. And it compounds, because bright ice reflects sunlight back into space. Losing it means Earth absorbs more heat and warms faster still.",
  emphasis: ["ice", "Earth", "melted", "underwater", "not", "enough", "sea", "level", "sixty", "metres", "drown", "redraws", "Florida", "Bangladesh", "coastal", "cities", "under", "reflects", "sunlight", "absorbs", "warms"],
  scenes: [
    { clip: "sci_ice1.mp4", start: 0.0, end: 3.4, startFrom: 1 },
    { clip: "sci_ice2.mp4", start: 3.4, end: 6.79, startFrom: 4 },
    { clip: "sci_earth1.mp4", start: 6.79, end: 10.19, startFrom: 7 },
    { clip: "sci_ice3.mp4", start: 10.19, end: 13.58, startFrom: 1 },
    { clip: "sci_storm2.mp4", start: 13.58, end: 16.98, startFrom: 4 },
    { clip: "sci_earth2.mp4", start: 16.98, end: 20.37, startFrom: 7 },
    { clip: "sci_ice1.mp4", start: 20.37, end: 23.77, startFrom: 1 },
    { clip: "sci_storm1.mp4", start: 23.77, end: 27.16, startFrom: 4 },
  ],
};
