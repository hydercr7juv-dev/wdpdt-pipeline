import { VideoSpec } from "../lib/video";

export const wakeTurbulence: VideoSpec = {
  id: "WakeTurbulence",
  title: "Why Planes Wait Two Minutes Before Takeoff",
  voFile: "assets/vo_wakeTurbulence.mp3",
  audioDuration: 38.664,
  script:
    "Why do planes sometimes wait a full two minutes before taking off after a big jet leaves the runway? " +
    "Some people think it's just paperwork or a scheduling gap. But that's not actually why. " +
    "A large jet doesn't just fly through the air, it tears two massive spinning tornadoes off its wingtips, " +
    "invisible funnels of rotating air that can flip a smaller plane upside down if it flies through them too soon. " +
    "Air traffic control spaces departures and arrivals by time and distance specifically to let those vortices " +
    "drift apart and weaken before the next aircraft arrives. Skip that gap, and a light plane following a jumbo jet " +
    "can lose control in seconds, even in clear, calm skies.",
  emphasis: [
    "wait",
    "two",
    "minutes",
    "takeoff",
    "big",
    "jet",
    "not",
    "why",
    "tears",
    "massive",
    "spinning",
    "tornadoes",
    "wingtips",
    "invisible",
    "funnels",
    "flip",
    "upside",
    "down",
    "spaces",
    "vortices",
    "weaken",
    "lose",
    "control",
    "calm",
  ],
  scenes: [
    { clip: "takeoff.mp4", start: 0.0, end: 4.0, startFrom: 2 },
    { clip: "runway.mp4", start: 4.0, end: 7.6, startFrom: 1 },
    { clip: "takeoff.mp4", start: 7.6, end: 11.2, startFrom: 8 },
    { clip: "eye.mp4", start: 11.2, end: 15.0, startFrom: 3 },
    { clip: "window.mp4", start: 15.0, end: 19.0, startFrom: 5 },
    { clip: "citynight.mp4", start: 19.0, end: 23.0, startFrom: 4 },
    { clip: "runway.mp4", start: 23.0, end: 27.0, startFrom: 9 },
    { clip: "takeoff.mp4", start: 27.0, end: 31.0, startFrom: 14 },
    { clip: "cabin.mp4", start: 31.0, end: 35.0, startFrom: 6 },
    { clip: "window.mp4", start: 35.0, end: 39.164, startFrom: 12 },
  ],
};
