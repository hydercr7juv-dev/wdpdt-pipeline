import { VideoSpec } from "../lib/video";

export const lightningStrike: VideoSpec = {
  id: "LightningStrike",
  title: "Why Lightning Doesn't Bring Down A Plane",
  voFile: "assets/vo_lightningStrike.mp3",
  audioDuration: 34.272,
  script:
    "Why don't planes get knocked out of the sky by lightning? " +
    "Some people think the plane must have some kind of invisible shield. But that's not actually why. " +
    "Airliners get struck by lightning more often than you'd think, roughly once every couple thousand " +
    "flight hours. The metal skin actually works like a Faraday cage, guiding the massive current around " +
    "the outside of the fuselage instead of through it. Static wicks on the wingtips then release the " +
    "charge safely back into the air, away from the fuel tanks and everyone inside. Without that " +
    "conductive shell, one strike could ignite the fuel or fry the cockpit electronics in seconds.",
  emphasis: [
    "lightning",
    "shield",
    "not",
    "why",
    "struck",
    "thousand",
    "faraday",
    "cage",
    "current",
    "fuselage",
    "static",
    "wicks",
    "charge",
    "fuel",
    "conductive",
    "ignite",
    "fry",
    "electronics",
    "seconds",
  ],
  scenes: [
    { clip: "citynight.mp4", start: 0.0, end: 3.6, startFrom: 4 },
    { clip: "window.mp4", start: 3.6, end: 7.0, startFrom: 3 },
    { clip: "takeoff.mp4", start: 7.0, end: 10.6, startFrom: 5 },
    { clip: "citynight.mp4", start: 10.6, end: 14.2, startFrom: 12 },
    { clip: "window.mp4", start: 14.2, end: 17.8, startFrom: 9 },
    { clip: "runway.mp4", start: 17.8, end: 21.4, startFrom: 2 },
    { clip: "citynight.mp4", start: 21.4, end: 24.8, startFrom: 7 },
    { clip: "window.mp4", start: 24.8, end: 28.2, startFrom: 15 },
    { clip: "cabin.mp4", start: 28.2, end: 31.4, startFrom: 5 },
    { clip: "citynight.mp4", start: 31.4, end: 34.77, startFrom: 17 },
  ],
};
