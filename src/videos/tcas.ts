import { VideoSpec } from "../lib/video";

export const tcas: VideoSpec = {
  id: "Tcas",
  title: "Why Airliners Carry A System That Overrules Air Traffic Control",
  voFile: "assets/vo_tcas.mp3",
  audioDuration: 31.944,
  script:
    "Why does every airliner carry a box that can overrule air traffic control? " +
    "Some people think it's just a backup radio. But that's not actually why. " +
    "It's called TCAS, and it talks directly to the collision avoidance computer on the other airplane, completely bypassing radar and radio delay. " +
    "If two planes get too close, both systems instantly agree on the fix, one climbs while the other descends, " +
    "and pilots are trained to obey that command even over a controller's instructions. " +
    "Ignore it, and you lose the one safety net built to work even when the ground gets it wrong.",
  emphasis: [
    "overrule",
    "air",
    "traffic",
    "control",
    "not",
    "why",
    "tcas",
    "collision",
    "avoidance",
    "computer",
    "bypassing",
    "radar",
    "radio",
    "delay",
    "climbs",
    "descends",
    "obey",
    "command",
    "ignore",
    "safety",
    "net",
    "wrong",
  ],
  scenes: [
    { clip: "citynight.mp4", start: 0.0, end: 3.6, startFrom: 5 },
    { clip: "window.mp4", start: 3.6, end: 7.0, startFrom: 13 },
    { clip: "eye.mp4", start: 7.0, end: 10.4, startFrom: 4 },
    { clip: "citynight.mp4", start: 10.4, end: 13.8, startFrom: 11 },
    { clip: "window.mp4", start: 13.8, end: 17.2, startFrom: 17 },
    { clip: "takeoff.mp4", start: 17.2, end: 20.6, startFrom: 8 },
    { clip: "citynight.mp4", start: 20.6, end: 24.0, startFrom: 1 },
    { clip: "window.mp4", start: 24.0, end: 27.2, startFrom: 5 },
    { clip: "eye.mp4", start: 27.2, end: 29.6, startFrom: 10 },
    { clip: "citynight.mp4", start: 29.6, end: 32.4, startFrom: 15 },
  ],
};
