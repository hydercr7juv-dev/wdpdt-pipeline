import { FPS, TAIL } from "./timing";

export type Scene = {
  clip: string; // file in public/assets
  start: number; // seconds on timeline
  end: number; // seconds on timeline
  startFrom: number; // seconds into source clip
};

export type VideoSpec = {
  id: string; // Remotion composition id
  title: string; // human title
  voFile: string; // e.g. "assets/vo_window.mp3"
  audioDuration: number; // seconds, from afinfo
  script: string;
  emphasis: string[]; // words rendered as yellow keyword pops
  scenes: Scene[];
};

export const durationInFrames = (spec: VideoSpec) =>
  Math.ceil((spec.audioDuration + TAIL) * FPS);
