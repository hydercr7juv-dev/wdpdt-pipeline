import { VideoSpec } from "../lib/video";

export const windowShades: VideoSpec = {
  id: "WindowShades",
  title: "Why You Must Open The Window Shade For Landing #Shorts",
  voFile: "assets/vo_shades.mp3",
  audioDuration: 24.456,
  script:
    "Why do they make you open the window shade for landing? Some people think it's just so you can enjoy the view. " +
    "But that's not actually why. If something goes wrong in those final seconds, the crew has about ninety seconds " +
    "to get everyone out. Open shades let your eyes adjust to the light outside, so nobody is blinded at the exit. " +
    "They also let the crew spot fire or debris on that side before opening a door into it. Ninety seconds decides everything.",
  emphasis: [
    "shade", "landing", "view", "not", "why", "wrong", "seconds", "crew",
    "ninety", "out", "eyes", "adjust", "blinded", "exit", "fire", "debris",
    "door", "decides", "everything",
  ],
  scenes: [
    { clip: "window.mp4", start: 0.0, end: 3.5, startFrom: 4 },
    { clip: "cabin.mp4", start: 3.5, end: 7.0, startFrom: 2 },
    { clip: "eye.mp4", start: 7.0, end: 10.0, startFrom: 1 },
    { clip: "window.mp4", start: 10.0, end: 13.5, startFrom: 11 },
    { clip: "cabin.mp4", start: 13.5, end: 17.0, startFrom: 7 },
    { clip: "runway.mp4", start: 17.0, end: 21.0, startFrom: 2 },
    { clip: "window.mp4", start: 21.0, end: 25.0, startFrom: 16 },
  ],
};
