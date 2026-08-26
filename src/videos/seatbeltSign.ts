import { VideoSpec } from "../lib/video";

export const seatbeltSign: VideoSpec = {
  id: "SeatbeltSign",
  title: "Why The Seatbelt Sign Stays On In Calm Air",
  voFile: "assets/vo_seatbeltSign.mp3",
  audioDuration: 33.432,
  script:
    "Why does the seatbelt sign stay on even when the air feels perfectly calm? " +
    "Some people think pilots just forget to switch it off. But that's not actually why. " +
    "Clear air turbulence can form with zero warning, no clouds, and nothing on radar to show it coming, " +
    "especially near jet streams and mountain ranges. Pilots often get reports from planes ahead, or feel a " +
    "hint through the controls, long before passengers feel a thing. Keeping the sign on means everyone is " +
    "already buckled in when it hits, instead of getting thrown into the ceiling. That glowing light is a bet " +
    "on turbulence nobody can see yet.",
  emphasis: [
    "seatbelt",
    "sign",
    "calm",
    "clear",
    "turbulence",
    "zero",
    "warning",
    "radar",
    "jet",
    "streams",
    "pilots",
    "buckled",
    "ceiling",
    "glowing",
    "bet",
  ],
  // Scene list rebuilt on the wider clip library — the generated original
  // reused cabin four times and window three, which reads as one repeated shot.
  scenes: [
    { clip: "seatbelt.mp4", start: 0.0, end: 3.6, startFrom: 1 },
    { clip: "windowseat.mp4", start: 3.6, end: 7.1, startFrom: 2 },
    { clip: "clouds.mp4", start: 7.1, end: 10.6, startFrom: 2 },
    { clip: "cockpit.mp4", start: 10.6, end: 14.1, startFrom: 1 },
    { clip: "clouds2.mp4", start: 14.1, end: 17.6, startFrom: 3 },
    { clip: "cabin.mp4", start: 17.6, end: 21.1, startFrom: 8 },
    { clip: "sunsetflight.mp4", start: 21.1, end: 24.6, startFrom: 2 },
    { clip: "planeview.mp4", start: 24.6, end: 28.1, startFrom: 3 },
    { clip: "beltoff.mp4", start: 28.1, end: 30.9, startFrom: 6 },
    { clip: "climbout.mp4", start: 30.9, end: 33.932, startFrom: 6 },
  ],
};
