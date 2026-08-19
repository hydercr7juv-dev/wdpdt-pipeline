import { VideoSpec } from "../lib/video";

export const roundWindows: VideoSpec = {
  id: "RoundWindows",
  title: "Why Airplane Windows Are Round, Not Square",
  voFile: "assets/vo_round.mp3",
  audioDuration: 27.168,
  script:
    "Why are airplane windows round instead of square? Some people think it's just a style choice. " +
    "But that's not actually why. Early passenger jets had square windows, and they were catastrophic. " +
    "Sharp corners concentrate stress, and at altitude that stress cracked the windows and tore planes apart. " +
    "Round windows spread the pressure evenly around the edge, with no corner for a crack to start. " +
    "That curve in your window is a lesson written in old disasters.",
  emphasis: [
    "round", "square", "not", "why", "early", "catastrophic", "corners", "stress",
    "altitude", "cracked", "tore", "apart", "round", "pressure", "edge", "crack",
    "curve", "disasters",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 4.0, startFrom: 1 },
    { clip: "cabin.mp4", start: 4.0, end: 7.5, startFrom: 3 },
    { clip: "window.mp4", start: 7.5, end: 11.0, startFrom: 7 },
    { clip: "citynight.mp4", start: 11.0, end: 15.0, startFrom: 9 },
    { clip: "window.mp4", start: 15.0, end: 19.0, startFrom: 13 },
    { clip: "takeoff.mp4", start: 19.0, end: 23.0, startFrom: 3 },
    { clip: "window.mp4", start: 23.0, end: 27.6, startFrom: 20 },
  ],
};
