import { FPS, TAIL } from "./timing";

export type Scene = {
  clip: string; // file in public/assets
  start: number; // seconds on timeline
  end: number; // seconds on timeline
  startFrom: number; // seconds into source clip
};

// One word as the voice engine actually spoke it. Written by scripts/say.py.
export type SpokenWord = {
  text: string;
  start: number; // seconds from the start of the voiceover
  end: number;
};

export type VideoSpec = {
  id: string; // Remotion composition id
  title: string; // human title
  voFile: string; // e.g. "assets/vo_window.mp3"
  audioDuration: number; // seconds, from afinfo
  script: string;
  emphasis: string[]; // words rendered as yellow keyword pops
  scenes: Scene[];
  // Real per-word timings from the TTS engine. Optional only so the older
  // specs written before this existed still compile; every new video must
  // include it. Without it the captions fall back to an estimate that drifts
  // by over a second in the middle of a 35 second video.
  words?: SpokenWord[];
};

export const durationInFrames = (spec: VideoSpec) =>
  Math.ceil((spec.audioDuration + TAIL) * FPS);
