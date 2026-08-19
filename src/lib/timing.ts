// Reusable caption-timing engine.
// The voiceover reads `script` verbatim; total audio length is known from the
// TTS step. We distribute each word across that duration weighted by its length,
// inserting natural pauses at punctuation, for tight karaoke sync with no
// transcription pass.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const LEAD = 0.1; // small lead-in before first word
export const TAIL = 0.5; // hold after VO ends

export type Word = {
  text: string;
  start: number;
  end: number;
  emphasis: boolean;
};

export type Group = {
  words: Word[];
  start: number;
  end: number;
};

const alnum = (s: string) => s.replace(/[^a-zA-Z0-9']/g, "");

function pauseAfter(token: string): number {
  if (/[.?!]$/.test(token)) return 0.32;
  if (/[,;:]$/.test(token)) return 0.16;
  return 0;
}

export function buildWords(
  script: string,
  audioDuration: number,
  emphasis: string[],
): Word[] {
  const emph = new Set(emphasis.map((w) => w.toLowerCase()));
  const tokens = script.trim().split(/\s+/);
  const weights = tokens.map((t) => Math.max(2, alnum(t).length));
  const pauses = tokens.map(pauseAfter);
  const totalPause = pauses.reduce((a, b) => a + b, 0);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const speakTime = audioDuration - LEAD - totalPause;

  const words: Word[] = [];
  let t = LEAD;
  tokens.forEach((tok, i) => {
    const dur = (weights[i] / totalWeight) * speakTime;
    const start = t;
    const end = t + dur;
    t = end + pauses[i];
    const clean = tok.replace(/^[^a-zA-Z0-9']+|[^a-zA-Z0-9']+$/g, "");
    words.push({
      text: clean,
      start,
      end,
      emphasis: emph.has(alnum(tok).toLowerCase()),
    });
  });
  return words;
}

export function buildGroups(
  script: string,
  words: Word[],
  audioDuration: number,
): Group[] {
  const tokens = script.trim().split(/\s+/);
  const groups: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    if (cur.length >= 3 || pauseAfter(tokens[i]) > 0) {
      groups.push(cur);
      cur = [];
    }
  });
  if (cur.length) groups.push(cur);

  return groups.map((g, i, arr) => {
    const start = g[0].start;
    const next = arr[i + 1];
    const end = next ? next[0].start : audioDuration + TAIL;
    return { words: g, start, end };
  });
}
