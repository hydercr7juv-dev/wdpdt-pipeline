import { VideoSpec } from "../lib/video";

export const solarStorm: VideoSpec = {
  id: "SolarStorm",
  title: "What If A Solar Storm Hit Earth Today? #Shorts",
  voFile: "assets/vo_solarstorm.mp3",
  audioDuration: 27.048,
  script:
    "What if a solar storm hit Earth today? Some people think it would fry everyone instantly. But that's not what happens. You'd be fine. The grid wouldn't be. A big enough eruption slams charged particles into Earth's magnetic field, and that shifting field induces currents in anything long and metal, which means power lines and transformers. In eighteen fifty nine a storm this size set telegraph offices on fire. Today, the same storm meets a planet that runs on electricity.",
  emphasis: ["solar", "storm", "Earth", "fry", "instantly", "not", "fine", "grid", "eruption", "charged", "particles", "magnetic", "field", "induces", "currents", "metal", "power", "lines", "transformers", "telegraph", "fire", "electricity"],
  scenes: [
    { clip: "sci_flare1.mp4", start: 0.0, end: 3.44, startFrom: 1 },
    { clip: "sci_aurora1.mp4", start: 3.44, end: 6.89, startFrom: 3 },
    { clip: "sci_flare2.mp4", start: 6.89, end: 10.33, startFrom: 5 },
    { clip: "sci_earth1.mp4", start: 10.33, end: 13.78, startFrom: 1 },
    { clip: "sci_aurora2.mp4", start: 13.78, end: 17.22, startFrom: 3 },
    { clip: "sci_storm1.mp4", start: 17.22, end: 20.66, startFrom: 5 },
    { clip: "sci_flare1.mp4", start: 20.66, end: 24.11, startFrom: 1 },
    { clip: "sci_earth2.mp4", start: 24.11, end: 27.55, startFrom: 3 },
  ],
};
