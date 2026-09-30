"use client";

import SpeakButton from "@/components/SpeakButton";
import type { Word } from "@/lib/vocabulary";

type Tone = "light" | "dark" | "white";
type Scale = "hero" | "read" | "inline";

const scaleClass: Record<Scale, string> = {
  hero: "arabic arabic-hero",
  read: "arabic arabic-read",
  inline: "arabic arabic-inline",
};

interface ArabicFormsProps {
  word: Pick<Word, "arabic" | "transliteration" | "arabicF" | "transliterationF">;
  tone?: Tone;
  scale?: Scale;
  /** Stack male and female. Compact uses the inline size for quiz options. */
  compact?: boolean;
}

const toneColor: Record<Tone, { text: string; label: string; trans: string }> = {
  light: { text: "var(--gold-light)", label: "rgba(255,255,255,0.55)", trans: "rgba(255,255,255,0.7)" },
  dark: { text: "var(--navy)", label: "#888", trans: "var(--gold)" },
  white: { text: "white", label: "rgba(255,255,255,0.75)", trans: "rgba(255,255,255,0.9)" },
};

function Line({
  label,
  arabic,
  transliteration,
  tone,
  scale,
}: {
  label?: string;
  arabic: string;
  transliteration?: string;
  tone: Tone;
  scale: Scale;
}) {
  const colors = toneColor[tone];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "100%" }}>
      {label && (
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase", color: colors.label }}>
          {label}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        <span className={scaleClass[scale]} style={{ color: colors.text }}>
          {arabic}
        </span>
        <SpeakButton text={arabic} size={scale === "inline" ? "sm" : "lg"} />
      </div>
      {transliteration && (
        <div style={{ fontSize: scale === "inline" ? 14 : 18, fontStyle: "italic", color: colors.trans }}>
          {transliteration}
        </div>
      )}
    </div>
  );
}

export default function ArabicForms({ word, tone = "dark", scale = "read", compact = false }: ArabicFormsProps) {
  const lineScale: Scale = compact ? "inline" : scale;
  if (!word.arabicF) {
    return <Line arabic={word.arabic} transliteration={word.transliteration} tone={tone} scale={lineScale} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: compact ? 8 : 14, width: "100%" }}>
      <Line label="Male" arabic={word.arabic} transliteration={word.transliteration} tone={tone} scale={lineScale} />
      <Line label="Female" arabic={word.arabicF} transliteration={word.transliterationF} tone={tone} scale={lineScale} />
    </div>
  );
}

export function ExampleForms({
  word,
  tone = "dark",
}: {
  word: Pick<Word, "example" | "exampleF" | "exampleTranslation">;
  tone?: Tone;
}) {
  if (!word.example) return null;
  const colors = toneColor[tone];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        {word.exampleF && (
          <span style={{ fontSize: 11, fontWeight: 800, color: colors.label, textTransform: "uppercase" }}>Male</span>
        )}
        <SpeakButton text={word.example} size="sm" />
        <span className="arabic arabic-read" style={{ color: colors.text }}>{word.example}</span>
      </div>
      {word.exampleF && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: colors.label, textTransform: "uppercase" }}>Female</span>
          <SpeakButton text={word.exampleF} size="sm" />
          <span className="arabic arabic-read" style={{ color: colors.text }}>{word.exampleF}</span>
        </div>
      )}
      {word.exampleTranslation && (
        <div style={{ fontSize: 14, color: colors.trans, fontStyle: "italic", textAlign: "center" }}>
          {word.exampleTranslation}
        </div>
      )}
    </div>
  );
}
