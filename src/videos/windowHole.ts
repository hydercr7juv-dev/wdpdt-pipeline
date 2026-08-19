import { VideoSpec } from "../lib/video";

export const windowHole: VideoSpec = {
  id: "WindowHole",
  title: "The Tiny Hole In Every Airplane Window",
  voFile: "assets/vo_window.mp3",
  audioDuration: 38.184,
  script:
    "Why is there a tiny hole in the bottom of every airplane window? " +
    "Some people think it's a scratch, or a manufacturing mistake. But that's not actually why. " +
    "Every window is really three layers. The outer pane holds back the massive pressure difference " +
    "between the cabin and the thin, freezing air outside. The inner pane you can touch does almost nothing. " +
    "And that little hole is called the breather hole. It lets the pressure balance out, so the middle pane " +
    "takes almost all the stress, and the outer pane stays a backup. Without it, both panes would strain at once, " +
    "ice would fog over the glass, and the only thing between you and thirty five thousand feet could crack. " +
    "That tiny hole is doing a very big job.",
  emphasis: [
    "tiny",
    "hole",
    "window",
    "scratch",
    "mistake",
    "not",
    "why",
    "three",
    "layers",
    "outer",
    "pane",
    "pressure",
    "freezing",
    "outside",
    "nothing",
    "breather",
    "balance",
    "stress",
    "backup",
    "strain",
    "ice",
    "crack",
    "big",
    "job",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 4.0, startFrom: 1 },
    { clip: "cabin.mp4", start: 4.0, end: 7.6, startFrom: 2 },
    { clip: "window.mp4", start: 7.6, end: 11.2, startFrom: 6 },
    { clip: "citynight.mp4", start: 11.2, end: 15.2, startFrom: 3 },
    { clip: "cabin.mp4", start: 15.2, end: 18.6, startFrom: 8 },
    { clip: "window.mp4", start: 18.6, end: 22.2, startFrom: 11 },
    { clip: "takeoff.mp4", start: 22.2, end: 26.0, startFrom: 2 },
    { clip: "window.mp4", start: 26.0, end: 30.0, startFrom: 16 },
    { clip: "citynight.mp4", start: 30.0, end: 34.2, startFrom: 10 },
    { clip: "window.mp4", start: 34.2, end: 38.7, startFrom: 21 },
  ],
};
