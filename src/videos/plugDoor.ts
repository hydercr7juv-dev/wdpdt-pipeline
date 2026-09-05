import { VideoSpec } from "../lib/video";

export const plugDoor: VideoSpec = {
  id: "PlugDoor",
  title: "Why Airplane Doors Can't Blow Open Mid-Flight",
  voFile: "assets/vo_plugDoor.mp3",
  audioDuration: 36.528,
  script:
    "Why don't airplane doors blow open in mid-flight, when the air pressure inside is so much higher than outside? " +
    "Some people think it's just a heavy-duty lock holding it shut. But that's not actually why. " +
    "Most aircraft doors are built as plug doors, actually larger than the doorframe itself. To open one, " +
    "it swings inward first, tilts through the frame, then rotates outward. That shape means cabin pressure " +
    "pushing outward can never squeeze the door through the hole, it just jams the plug tighter against the frame, " +
    "the same way a cork seals a bottle. The locks barely do any work. A two hundred mile an hour pressure " +
    "difference can't force it open, only the plug shape can stop it.",
  emphasis: [
    "doors",
    "blow",
    "mid-flight",
    "pressure",
    "lock",
    "plug",
    "doorframe",
    "larger",
    "swings",
    "inward",
    "tilts",
    "rotates",
    "outward",
    "jams",
    "cork",
    "seals",
    "bottle",
    "force",
    "stop",
  ],
  scenes: [
    { clip: "cabin.mp4", start: 0.0, end: 3.7, startFrom: 2 },
    { clip: "window.mp4", start: 3.7, end: 7.4, startFrom: 5 },
    { clip: "cabin.mp4", start: 7.4, end: 11.0, startFrom: 9 },
    { clip: "runway.mp4", start: 11.0, end: 14.7, startFrom: 3 },
    { clip: "takeoff.mp4", start: 14.7, end: 18.3, startFrom: 6 },
    { clip: "cabin.mp4", start: 18.3, end: 22.0, startFrom: 12 },
    { clip: "window.mp4", start: 22.0, end: 25.6, startFrom: 14 },
    { clip: "eye.mp4", start: 25.6, end: 29.3, startFrom: 4 },
    { clip: "cabin.mp4", start: 29.3, end: 33.0, startFrom: 17 },
    { clip: "citynight.mp4", start: 33.0, end: 37.028, startFrom: 8 },
  ],
};
