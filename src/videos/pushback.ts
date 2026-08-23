import { VideoSpec } from "../lib/video";

export const pushback: VideoSpec = {
  id: "Pushback",
  title: "Why Planes Get Pushed Back Instead Of Reversing #Shorts",
  voFile: "assets/vo_pushback.mp3",
  audioDuration: 27.288,
  script:
    "Why does a plane need a truck to push it away from the gate? Some people think jet engines simply can't run backwards. " +
    "But that's not actually why. Most airliners can reverse. Thrust reversers flip the exhaust forward, and that's exactly " +
    "what slows the aircraft down on landing. The problem is doing it on a crowded apron. That blast fires grit and debris " +
    "straight back into the engines, and it can knock over the equipment and the crew behind the aircraft. " +
    "A tug is cheaper, quieter and far safer.",
  emphasis: [
    "truck", "push", "gate", "engines", "backwards", "not", "why", "reverse",
    "thrust", "reversers", "exhaust", "forward", "landing", "crowded", "apron",
    "blast", "grit", "debris", "engines", "crew", "tug", "cheaper", "safer",
  ],
  // Opens on the pushback tug already coupled to the nose — the shot answers
  // the hook before the narration does.
  scenes: [
    { clip: "gate.mp4", start: 0.0, end: 3.5, startFrom: 1.5 },
    { clip: "taxiqueue.mp4", start: 3.5, end: 7.0, startFrom: 2 },
    { clip: "engine.mp4", start: 7.0, end: 10.5, startFrom: 2 },
    { clip: "apronplanes.mp4", start: 10.5, end: 14.0, startFrom: 3 },
    { clip: "terminal.mp4", start: 14.0, end: 17.5, startFrom: 6 },
    { clip: "jets.mp4", start: 17.5, end: 21.0, startFrom: 2 },
    { clip: "gate.mp4", start: 21.0, end: 24.5, startFrom: 8 },
    { clip: "apronplanes.mp4", start: 24.5, end: 27.8, startFrom: 10 },
  ],
};
