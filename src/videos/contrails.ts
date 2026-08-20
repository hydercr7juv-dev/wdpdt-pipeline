import { VideoSpec } from "../lib/video";

export const contrails: VideoSpec = {
  id: "Contrails",
  title: "Why Jets Leave White Trails In The Sky",
  voFile: "assets/vo_contrails.mp3",
  audioDuration: 39.792,
  script:
    "Why do jets leave long white trails across the sky? " +
    "Some people think it's leftover smoke or exhaust pollution. But that's not actually why. " +
    "Jet engines burn fuel and produce hot water vapor as a byproduct, and at cruising altitude the air outside " +
    "is brutally cold, often colder than sixty below zero. That vapor hits the freezing air, condenses, and " +
    "instantly freezes into tiny ice crystals, forming a visible cloud called a contrail. If the air is dry, " +
    "the trail vanishes in seconds. If it's humid, it can spread and linger for hours, even nudging the climate. " +
    "That thin white streak is really a sign of the sky's own hidden weather.",
  emphasis: [
    "jets",
    "white",
    "trails",
    "sky",
    "smoke",
    "pollution",
    "not",
    "why",
    "fuel",
    "water",
    "vapor",
    "cold",
    "sixty",
    "below",
    "zero",
    "freezing",
    "ice",
    "crystals",
    "contrail",
    "dry",
    "humid",
    "linger",
    "climate",
    "hidden",
    "weather",
  ],
  scenes: [
    { clip: "takeoff.mp4", start: 0.0, end: 4.0, startFrom: 2 },
    { clip: "window.mp4", start: 4.0, end: 8.0, startFrom: 5 },
    { clip: "citynight.mp4", start: 8.0, end: 12.0, startFrom: 4 },
    { clip: "runway.mp4", start: 12.0, end: 16.0, startFrom: 3 },
    { clip: "window.mp4", start: 16.0, end: 20.0, startFrom: 9 },
    { clip: "citynight.mp4", start: 20.0, end: 24.0, startFrom: 12 },
    { clip: "window.mp4", start: 24.0, end: 28.0, startFrom: 14 },
    { clip: "takeoff.mp4", start: 28.0, end: 32.0, startFrom: 7 },
    { clip: "citynight.mp4", start: 32.0, end: 36.29, startFrom: 16 },
    { clip: "window.mp4", start: 36.29, end: 40.292, startFrom: 18 },
  ],
};
