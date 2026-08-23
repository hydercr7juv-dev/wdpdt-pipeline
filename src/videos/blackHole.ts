import { VideoSpec } from "../lib/video";

// "What If Labs" channel (@whatif_786labs). NASA public-domain footage.
export const blackHole: VideoSpec = {
  id: "BlackHole",
  title: "What If You Fell Into A Black Hole? #Shorts",
  voFile: "assets/vo_blackhole.mp3",
  audioDuration: 28.056,
  script:
    "What if you fell into a black hole? Some people think you'd be crushed instantly. But that's not what happens first. Gravity pulls harder on your feet than on your head, and that difference grows fast. Long before you reach the centre you're stretched into a thin strand. Physicists genuinely call it spaghettification. Stranger still, to anyone watching from outside, you never arrive. Time slows so much near the edge that you appear to freeze there, turning red, and slowly fading away.",
  emphasis: ["black", "hole", "crushed", "instantly", "not", "gravity", "feet", "head", "stretched", "strand", "spaghettification", "outside", "never", "arrive", "time", "slows", "freeze", "red", "fading"],
  scenes: [
    { clip: "sci_bh1.mp4", start: 0.0, end: 3.57, startFrom: 1 },
    { clip: "sci_bh3.mp4", start: 3.57, end: 7.14, startFrom: 4 },
    { clip: "sci_bh2.mp4", start: 7.14, end: 10.71, startFrom: 7 },
    { clip: "sci_bh1.mp4", start: 10.71, end: 14.28, startFrom: 1 },
    { clip: "sci_bh3.mp4", start: 14.28, end: 17.85, startFrom: 4 },
    { clip: "sci_bh2.mp4", start: 17.85, end: 21.42, startFrom: 7 },
    { clip: "sci_bh1.mp4", start: 21.42, end: 24.99, startFrom: 1 },
    { clip: "sci_bh3.mp4", start: 24.99, end: 28.56, startFrom: 4 },
  ],
};
