import { VideoSpec } from "../lib/video";

export const lostLuggage: VideoSpec = {
  id: "LostLuggage",
  title: "Why Airlines Really Lose Your Luggage #Shorts",
  voFile: "assets/vo_luggage.mp3",
  audioDuration: 26.784,
  script:
    "Why do airlines still lose your luggage? Some people think it's careless handlers throwing bags around. " +
    "But that's not actually why. Every bag carries a barcode tag that has to be scanned at each handover: " +
    "check in, the sorting hall, the aircraft, and every transfer. If your connection is tight, the bag physically " +
    "cannot cross the airport before the doors close. So it isn't lost. It's behind you, waiting on the next flight. " +
    "Most delayed bags catch up with their owner within a day or two.",
  emphasis: [
    "lose", "luggage", "careless", "handlers", "not", "why", "barcode", "tag",
    "scanned", "handover", "sorting", "transfer", "connection", "tight",
    "cannot", "doors", "close", "lost", "behind", "next", "flight", "catch",
  ],
  // Built from the new Coverr clips so it doesn't reuse the same six shots
  // every earlier video leans on. Only clips checked frame-by-frame are used —
  // several of the batch were unusable (out-of-focus or abstract) and were cut.
  scenes: [
    { clip: "depboard.mp4", start: 0.0, end: 3.5, startFrom: 0.5 },
    { clip: "gate.mp4", start: 3.5, end: 7.0, startFrom: 1.5 },
    { clip: "terminal.mp4", start: 7.0, end: 10.5, startFrom: 3 },
    { clip: "cabin.mp4", start: 10.5, end: 13.5, startFrom: 4 },
    { clip: "clouds.mp4", start: 13.5, end: 17.0, startFrom: 2 },
    { clip: "gate.mp4", start: 17.0, end: 20.5, startFrom: 8 },
    { clip: "depboard.mp4", start: 20.5, end: 23.5, startFrom: 6.5 },
    { clip: "planeview.mp4", start: 23.5, end: 27.3, startFrom: 3 },
  ],
};
