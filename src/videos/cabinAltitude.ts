import { VideoSpec } from "../lib/video";

export const cabinAltitude: VideoSpec = {
  id: "CabinAltitude",
  title: "Why The Cabin Isn't Pressurized To Sea Level",
  voFile: "assets/vo_cabinAltitude.mp3",
  audioDuration: 38.808,
  script:
    "Why does a plane at thirty five thousand feet only pressurize the cabin to about eight thousand feet? " +
    "Some people think it should just match sea level so nobody feels a thing. But that's not actually why it works this way. " +
    "The fuselage is a tube being inflated like a balloon every single flight, and the bigger that pressure difference, " +
    "the harder the skin gets stretched and fatigued with each cycle. Engineers deliberately allow a thinner cabin pressure " +
    "so the structure only has to fight a smaller bulge, letting the same airframe survive tens of thousands of flights " +
    "instead of a few thousand. Push it to true sea level and you'd need heavier walls on every jet, or you'd be grounding " +
    "planes decades sooner from metal fatigue.",
  emphasis: [
    "thirty five thousand",
    "eight thousand",
    "sea level",
    "not",
    "why",
    "fuselage",
    "tube",
    "balloon",
    "pressure difference",
    "stretched",
    "fatigued",
    "engineers",
    "bulge",
    "airframe",
    "tens of thousands",
    "heavier",
    "grounding",
    "metal fatigue",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 4.0, startFrom: 2 },
    { clip: "window.mp4", start: 4.0, end: 7.6, startFrom: 5 },
    { clip: "citynight.mp4", start: 7.6, end: 11.2, startFrom: 4 },
    { clip: "cabin.mp4", start: 11.2, end: 15.0, startFrom: 9 },
    { clip: "window.mp4", start: 15.0, end: 18.8, startFrom: 12 },
    { clip: "takeoff.mp4", start: 18.8, end: 22.6, startFrom: 3 },
    { clip: "cabin.mp4", start: 22.6, end: 26.4, startFrom: 14 },
    { clip: "window.mp4", start: 26.4, end: 30.2, startFrom: 16 },
    { clip: "citynight.mp4", start: 30.2, end: 34.5, startFrom: 11 },
    { clip: "window.mp4", start: 34.5, end: 39.308, startFrom: 18 },
  ],
};
