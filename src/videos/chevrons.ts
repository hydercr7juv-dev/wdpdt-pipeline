import { VideoSpec } from "../lib/video";

export const chevrons: VideoSpec = {
  id: "Chevrons",
  title: "Why Jet Engines Have Wavy, Zigzag Edges",
  voFile: "assets/vo_chevrons.mp3",
  audioDuration: 37.44,
  script:
    "Why do some jet engines have wavy, zigzag edges around the back instead of a smooth circle? " +
    "Some people think it's just styling. But that's not actually why. Those scalloped edges are called chevrons, " +
    "and they change how the fast engine exhaust mixes with the slower air around it. A smooth edge creates a sharp, " +
    "turbulent boundary that screams as a loud roar. The wavy chevrons blend the two airflows gradually, cutting the " +
    "noise right at the source. That's why modern jets sound calmer than older ones, even taking off near homes. " +
    "A few inches of scalloped metal keep entire neighborhoods livable under the flight path.",
  emphasis: [
    "wavy",
    "zigzag",
    "edges",
    "smooth",
    "styling",
    "why",
    "chevrons",
    "exhaust",
    "mixes",
    "turbulent",
    "roar",
    "blend",
    "airflows",
    "cutting",
    "noise",
    "calmer",
    "homes",
    "scalloped",
    "neighborhoods",
  ],
  scenes: [
    { clip: "takeoff.mp4", start: 0.0, end: 3.8, startFrom: 2 },
    { clip: "window.mp4", start: 3.8, end: 7.6, startFrom: 4 },
    { clip: "takeoff.mp4", start: 7.6, end: 11.4, startFrom: 8 },
    { clip: "runway.mp4", start: 11.4, end: 15.2, startFrom: 3 },
    { clip: "takeoff.mp4", start: 15.2, end: 19.0, startFrom: 12 },
    { clip: "citynight.mp4", start: 19.0, end: 22.8, startFrom: 5 },
    { clip: "runway.mp4", start: 22.8, end: 26.6, startFrom: 9 },
    { clip: "citynight.mp4", start: 26.6, end: 30.4, startFrom: 14 },
    { clip: "cabin.mp4", start: 30.4, end: 34.2, startFrom: 6 },
    { clip: "citynight.mp4", start: 34.2, end: 37.94, startFrom: 17 },
  ],
};
