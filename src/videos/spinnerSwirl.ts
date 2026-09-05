import { VideoSpec } from "../lib/video";

export const spinnerSwirl: VideoSpec = {
  id: "SpinnerSwirl",
  title: "Why Jet Engines Have A Swirl Painted On The Nose",
  voFile: "assets/vo_spinnerSwirl.mp3",
  audioDuration: 39.144,
  script:
    "Why do some jet engines have a swirl painted on the spinning cone at the front? " +
    "Some people think it's just decoration or a company logo. But that's not actually why. " +
    "When an engine spins up, the blades move so fast they become almost invisible, and a ground crew member " +
    "could walk straight into a live intake without ever seeing it turn. The swirl pattern is a visual trick, " +
    "painted in a spiral so that as the cone spins, the pattern seems to pulse and rotate wildly, making the " +
    "danger obvious from far away. It's a safety signal, not style. A spinning blur looks harmless, but a " +
    "swirling stripe screams stay back. That paint has probably saved more fingers than any warning sign.",
  emphasis: [
    "swirl",
    "painted",
    "spinning",
    "cone",
    "decoration",
    "logo",
    "blades",
    "invisible",
    "ground",
    "crew",
    "intake",
    "spiral",
    "pulse",
    "rotate",
    "danger",
    "safety",
    "signal",
    "blur",
    "harmless",
    "stripe",
  ],
  scenes: [
    { clip: "takeoff.mp4", start: 0.0, end: 4.0, startFrom: 2 },
    { clip: "runway.mp4", start: 4.0, end: 7.9, startFrom: 5 },
    { clip: "eye.mp4", start: 7.9, end: 11.8, startFrom: 3 },
    { clip: "takeoff.mp4", start: 11.8, end: 15.7, startFrom: 9 },
    { clip: "cabin.mp4", start: 15.7, end: 19.6, startFrom: 6 },
    { clip: "window.mp4", start: 19.6, end: 23.5, startFrom: 10 },
    { clip: "runway.mp4", start: 23.5, end: 27.4, startFrom: 14 },
    { clip: "eye.mp4", start: 27.4, end: 31.3, startFrom: 7 },
    { clip: "takeoff.mp4", start: 31.3, end: 35.4, startFrom: 16 },
    { clip: "citynight.mp4", start: 35.4, end: 39.644, startFrom: 11 },
  ],
};
