import { VideoSpec } from "../lib/video";

// "What If Labs" channel (@whatif_786labs). NASA public-domain footage.
export const magField: VideoSpec = {
  id: "MagField",
  title: "What If Earth Lost Its Magnetic Field? #Shorts",
  voFile: "assets/vo_magfield.mp3",
  audioDuration: 26.76,
  script:
    "What if Earth lost its magnetic field? Some people think we'd be fried instantly. But that's not what happens. The atmosphere by itself still blocks most of the radiation, so you wouldn't feel anything on day one. The real damage is slow. The field deflects the solar wind, and without it that wind strips the upper atmosphere away, a little at a time. That's the leading explanation for how Mars, which lost its field billions of years ago, went from wet to barren.",
  emphasis: ["Earth", "magnetic", "field", "fried", "instantly", "not", "atmosphere", "blocks", "radiation", "damage", "slow", "deflects", "solar", "wind", "strips", "upper", "Mars", "billions", "wet", "barren"],
  scenes: [
    { clip: "sci_aurora1.mp4", start: 0.0, end: 3.41, startFrom: 1 },
    { clip: "sci_flare1.mp4", start: 3.41, end: 6.82, startFrom: 4 },
    { clip: "sci_aurora2.mp4", start: 6.82, end: 10.22, startFrom: 7 },
    { clip: "sci_earth1.mp4", start: 10.22, end: 13.63, startFrom: 1 },
    { clip: "sci_flare2.mp4", start: 13.63, end: 17.04, startFrom: 4 },
    { clip: "sci_storm3.mp4", start: 17.04, end: 20.45, startFrom: 7 },
    { clip: "sci_aurora1.mp4", start: 20.45, end: 23.85, startFrom: 1 },
    { clip: "sci_earth2.mp4", start: 23.85, end: 27.26, startFrom: 4 },
  ],
};
