import { VideoSpec } from "../lib/video";

export const tireBurst: VideoSpec = {
  id: "TireBurst",
  title: "Why Airplane Tires Don't Blow Out On Landing #Shorts",
  voFile: "assets/vo_tireBurst.mp3",
  audioDuration: 29.112,
  script:
    "Why don't airplane tires blow out landing at over a hundred and fifty miles an hour? Some people think it's just thick rubber. " +
    "But that's not actually why. Each tire is filled with nitrogen to roughly two hundred pounds per square inch, about six times a car tire, " +
    "and built from dozens of layers of steel reinforced cord that flex without tearing. The smoke you see at touchdown isn't the tire straining, " +
    "it's rubber scorching as it spins up from zero to that speed in a fraction of a second. Skip that pressure and the wheel would collapse " +
    "under the full weight of the jet.",
  emphasis: [
    "tires", "blow", "rubber", "not", "why", "nitrogen", "pressure", "steel",
    "reinforced", "flex", "smoke", "touchdown", "scorching", "spins", "collapse", "weight", "jet",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 3.3, startFrom: 2 },
    { clip: "takeoff.mp4", start: 3.3, end: 6.6, startFrom: 4 },
    { clip: "runway.mp4", start: 6.6, end: 9.9, startFrom: 9 },
    { clip: "window.mp4", start: 9.9, end: 13.2, startFrom: 3 },
    { clip: "takeoff.mp4", start: 13.2, end: 16.5, startFrom: 12 },
    { clip: "runway.mp4", start: 16.5, end: 19.8, startFrom: 15 },
    { clip: "citynight.mp4", start: 19.8, end: 23.1, startFrom: 7 },
    { clip: "takeoff.mp4", start: 23.1, end: 26.4, startFrom: 17 },
    { clip: "runway.mp4", start: 26.4, end: 29.612, startFrom: 18 },
  ],
};
