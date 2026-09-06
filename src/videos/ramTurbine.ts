import { VideoSpec } from "../lib/video";

export const ramTurbine: VideoSpec = {
  id: "RamTurbine",
  title: "The Emergency Propeller Hidden Under Every Airliner",
  voFile: "assets/vo_ramTurbine.mp3",
  audioDuration: 28.392,
  script:
    "Why does a small propeller sometimes pop out from under an airplane during an emergency? " +
    "Some people think it's a broken panel or debris falling off. But that's not actually why. " +
    "That's the ram air turbine, a backup generator that drops into the airstream if every " +
    "engine loses power. Spinning blades catch the rushing wind and turn it into just enough " +
    "hydraulic and electrical power to keep the flight controls and instruments alive. " +
    "Without it, a total power loss would leave pilots with no way to steer the plane at all.",
  emphasis: [
    "propeller",
    "pop",
    "emergency",
    "broken",
    "debris",
    "not",
    "why",
    "ram",
    "turbine",
    "backup",
    "generator",
    "airstream",
    "engine",
    "power",
    "spinning",
    "blades",
    "hydraulic",
    "steer",
  ],
  scenes: [
    { clip: "takeoff.mp4", start: 0.0, end: 3.2, startFrom: 5 },
    { clip: "window.mp4", start: 3.2, end: 6.4, startFrom: 2 },
    { clip: "cabin.mp4", start: 6.4, end: 9.6, startFrom: 6 },
    { clip: "eye.mp4", start: 9.6, end: 12.8, startFrom: 4 },
    { clip: "runway.mp4", start: 12.8, end: 16.0, startFrom: 3 },
    { clip: "eye.mp4", start: 16.0, end: 19.2, startFrom: 11 },
    { clip: "citynight.mp4", start: 19.2, end: 22.4, startFrom: 6 },
    { clip: "cabin.mp4", start: 22.4, end: 25.6, startFrom: 13 },
    { clip: "takeoff.mp4", start: 25.6, end: 28.892, startFrom: 9 },
  ],
};
