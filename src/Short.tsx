import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Anton";
import { buildWords, buildGroups, Word, Group } from "./lib/timing";
import { VideoSpec } from "./lib/video";

const { fontFamily } = loadFont();

const EMPH = "#FFD93B"; // popping keyword color
const WHITE = "#FFFFFF";

const SceneClip: React.FC<{
  clip: string;
  startFrom: number;
  durationInFrames: number;
}> = ({ clip, startFrom, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1.06, 1.14], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={staticFile(`assets/${clip}`)}
          startFrom={Math.round(startFrom * fps)}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const WordSpan: React.FC<{ word: Word; t: number }> = ({ word, t }) => {
  const active = t >= word.start && t < word.end;
  const spoken = t >= word.end;
  const color = active ? EMPH : WHITE;
  const scale = active ? 1.14 : 1;
  const opacity = active || spoken ? 1 : 0.92;
  // Outline built from layered shadows (reliable in Chromium, unlike
  // -webkit-text-stroke) so the white fill stays crisp on bright footage.
  const outline =
    "-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000," +
    "-3px 0 0 #000, 3px 0 0 #000, 0 -3px 0 #000, 0 3px 0 #000," +
    "0 6px 16px rgba(0,0,0,0.85)";
  return (
    <span
      style={{
        color,
        opacity,
        display: "inline-block",
        transform: `scale(${scale})`,
        margin: "0 12px",
        textShadow: outline,
      }}
    >
      {word.text}
    </span>
  );
};

const Captions: React.FC<{ groups: Group[] }> = ({ groups }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const group = groups.find((g) => t >= g.start && t < g.end) ?? groups[0];
  const entry = spring({
    frame: frame - group.start * fps,
    fps,
    config: { damping: 200, mass: 0.5 },
    durationInFrames: 8,
  });
  const translateY = interpolate(entry, [0, 1], [40, 0]);
  // Full opacity throughout — the pop is carried by the slide + per-word scale.
  // (A fade-in ramp made captions briefly faint/muddy over bright footage.)
  const opacity = 1;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 430,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 104,
          lineHeight: 1.05,
          textAlign: "center",
          maxWidth: 940,
          textTransform: "uppercase",
          letterSpacing: 1,
          transform: `translateY(${translateY}px)`,
          opacity,
          padding: "10px 34px",
          borderRadius: 24,
          background: "rgba(0,0,0,0.42)",
        }}
      >
        {group.words.map((w, i) => (
          <WordSpan key={`${group.start}-${i}`} word={w} t={t} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 8, width: "100%", background: "rgba(255,255,255,0.15)" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: EMPH }} />
      </div>
    </AbsoluteFill>
  );
};

export const Short: React.FC<{ spec: VideoSpec }> = ({ spec }) => {
  const { fps } = useVideoConfig();
  const groups = useMemo(() => {
    const words = buildWords(spec.script, spec.audioDuration, spec.emphasis);
    return buildGroups(spec.script, words, spec.audioDuration);
  }, [spec]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {spec.scenes.map((s, i) => {
        const from = Math.round(s.start * fps);
        const durationInFrames = Math.max(1, Math.round((s.end - s.start) * fps));
        return (
          <Sequence key={i} from={from} durationInFrames={durationInFrames}>
            <SceneClip
              clip={s.clip}
              startFrom={s.startFrom}
              durationInFrames={durationInFrames}
            />
          </Sequence>
        );
      })}

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 45%)",
        }}
      />

      <Captions groups={groups} />
      <ProgressBar />

      <Audio src={staticFile(spec.voFile)} />
    </AbsoluteFill>
  );
};
