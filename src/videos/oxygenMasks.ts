import { VideoSpec } from "../lib/video";

export const oxygenMasks: VideoSpec = {
  id: "OxygenMasks",
  title: "Why The Oxygen Masks Aren't Connected To A Tank",
  voFile: "assets/vo_oxygenMasks.mp3",
  audioDuration: 35.4,
  script:
    "Why don't the oxygen masks that drop from the ceiling actually connect to a tank of oxygen? " +
    "Some people assume a hidden canister feeds every mask on the plane. But that's not actually why they work. " +
    "Above each row sits a small chemical generator packed with sodium chlorate, and pulling the mask down " +
    "triggers a reaction that produces oxygen gas on the spot, along with a burst of heat you can sometimes " +
    "smell as burning plastic. That's also why the bag never fully inflates, since the mix of oxygen and cabin " +
    "air is still enough to keep you conscious. It only runs for about fifteen minutes, just long enough for " +
    "the pilots to dive to a safe altitude.",
  emphasis: [
    "oxygen",
    "masks",
    "ceiling",
    "tank",
    "canister",
    "not",
    "why",
    "chemical",
    "generator",
    "sodium",
    "chlorate",
    "reaction",
    "heat",
    "burning",
    "inflates",
    "conscious",
    "fifteen",
    "minutes",
    "dive",
    "altitude",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 3.6, startFrom: 2 },
    { clip: "window.mp4", start: 3.6, end: 7.2, startFrom: 4 },
    { clip: "eye.mp4", start: 7.2, end: 10.8, startFrom: 1 },
    { clip: "cabin.mp4", start: 10.8, end: 14.4, startFrom: 7 },
    { clip: "window.mp4", start: 14.4, end: 18.0, startFrom: 10 },
    { clip: "eye.mp4", start: 18.0, end: 21.6, startFrom: 5 },
    { clip: "cabin.mp4", start: 21.6, end: 25.2, startFrom: 12 },
    { clip: "runway.mp4", start: 25.2, end: 28.8, startFrom: 3 },
    { clip: "takeoff.mp4", start: 28.8, end: 32.4, startFrom: 6 },
    { clip: "cabin.mp4", start: 32.4, end: 35.9, startFrom: 15 },
  ],
};
