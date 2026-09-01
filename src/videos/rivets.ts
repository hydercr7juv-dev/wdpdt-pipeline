import { VideoSpec } from "../lib/video";

export const rivets: VideoSpec = {
  id: "Rivets",
  title: "Why Airplane Skin Is Covered In Tiny Bumps",
  voFile: "assets/vo_rivets.mp3",
  audioDuration: 35.472,
  script:
    "Why is an airplane's skin covered in thousands of tiny bumps instead of being smooth? " +
    "Some people think they're just leftover manufacturing marks. But that's not actually why. " +
    "Those bumps are rivets, and engineers choose them over welding on purpose. A weld fuses metal " +
    "into one piece, so a single crack can race clean across the whole panel. Rivets hold separate " +
    "sheets together, so a crack starting in one sheet hits the rivet line and stops. That's called " +
    "crack arrest, and it's why a fuselage can survive thousands of pressurization cycles without " +
    "tearing apart. Those tiny bumps are quietly holding the whole plane together.",
  emphasis: [
    "bumps",
    "smooth",
    "rivets",
    "engineers",
    "weld",
    "crack",
    "race",
    "panel",
    "sheets",
    "stop",
    "arrest",
    "fuselage",
    "pressurization",
    "tearing",
    "apart",
    "tiny",
    "holding",
    "together",
  ],
  scenes: [
    { clip: "runway.mp4", start: 0.0, end: 4.0, startFrom: 3 },
    { clip: "window.mp4", start: 4.0, end: 8.0, startFrom: 5 },
    { clip: "takeoff.mp4", start: 8.0, end: 12.0, startFrom: 1 },
    { clip: "cabin.mp4", start: 12.0, end: 15.8, startFrom: 4 },
    { clip: "window.mp4", start: 15.8, end: 19.6, startFrom: 9 },
    { clip: "citynight.mp4", start: 19.6, end: 23.4, startFrom: 6 },
    { clip: "cabin.mp4", start: 23.4, end: 27.2, startFrom: 12 },
    { clip: "takeoff.mp4", start: 27.2, end: 31.2, startFrom: 7 },
    { clip: "runway.mp4", start: 31.2, end: 35.972, startFrom: 14 },
  ],
};
