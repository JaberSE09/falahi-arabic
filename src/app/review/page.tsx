"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { vocabulary, type Word } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";
import PronounceButton from "@/components/PronounceButton";
import { useProgress } from "@/hooks/useProgress";
import { getDueWords, getMissedWords, shuffle } from "@/lib/progress";

type Tab = "due" | "missed";

export default function ReviewPage() {
  const { progress, correct, wrong, reset, counts, refresh } = useProgress();
  const [tab, setTab] = useState<Tab>("due");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const due = useMemo(() => shuffle(getDueWords(vocabulary, progress)), [progress]);
  const missed = useMemo(() => shuffle(getMissedWords(vocabulary, progress)), [progress]);
  const queue: Word[] = tab === "due" ? due : missed;
  const word = queue[idx] ?? null;

  useEffect(() => {
    setIdx(0);
    setFlipped(false);
  }, [tab]);

  useEffect(() => {
    if (idx >= queue.length) setIdx(0);
  }, [queue.length, idx]);

  useEffect(() => {
    if (due.length === 0 && missed.length > 0) setTab("missed");
  }, [due.length, missed.length]);

  const advance = (ok: boolean) => {
    if (!word) return;
    if (ok) correct(word.id);
    else wrong(word.id);
    setFlipped(false);
    setIdx((i) => i + 1);
    refresh();
  };

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>Review</h1>
      <p style={{ color: "#555", marginBottom: 8, fontSize: 16, lineHeight: 1.5 }}>
        Best order: <strong>Due</strong> → <strong>Missed</strong> →{" "}
        <Link href="/flashcards" style={{ color: "var(--gold)", fontWeight: 700 }}>New</Link> →{" "}
        <Link href="/pronounce" style={{ color: "var(--gold)", fontWeight: 700 }}>Pronounce</Link>
      </p>
      <p style={{ color: "#666", marginBottom: 20, fontSize: 15, fontWeight: 600 }}>
        Due {counts.due} · Missed {counts.missed} · Known {counts.known}
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {([
          { key: "due" as const, label: `Due today (${due.length})` },
          { key: "missed" as const, label: `Missed (${missed.length})` },
        ]).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              fontWeight: 700,
              cursor: "pointer",
              background: tab === t.key ? "var(--navy)" : "white",
              color: tab === t.key ? "white" : "var(--navy)",
              border: "2px solid var(--navy)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {!word ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            borderRadius: 20,
            background: "white",
            border: "2px solid #e8e0d0",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
          <div style={{ fontWeight: 800, fontSize: 20, color: "var(--navy)", marginBottom: 10 }}>
            {tab === "due" ? "Nothing due right now" : "No missed words"}
          </div>
          <p style={{ color: "#555", marginBottom: 20 }}>
            Study new words or practice pronunciation.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/flashcards" style={ctaStyle}>Flashcards</Link>
            <Link href="/pronounce" style={ctaStyle}>Pronounce</Link>
            <Link href="/arabic-101" style={ctaOutline}>Arabic 101</Link>
          </div>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 12, fontWeight: 700, color: "var(--navy)" }}>
            {idx + 1} / {queue.length}
          </div>
          <div
            onClick={(e) => {
              if (e.target instanceof Element && e.target.closest("button")) return;
              setFlipped((f) => !f);
            }}
            style={{
              borderRadius: 22,
              background: "var(--navy)",
              padding: "36px 24px",
              textAlign: "center",
              marginBottom: 18,
              cursor: "pointer",
              minHeight: 220,
            }}
          >
            {!flipped ? (
              <>
                <div className="arabic" style={{ fontSize: "clamp(48px, 12vw, 72px)", color: "var(--gold-light)", marginBottom: 16, lineHeight: 1.4 }}>
                  {word.arabic}
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
                  <SpeakButton text={word.arabic} size="md" />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>tap to reveal</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 8 }}>{word.english}</div>
                <div style={{ fontSize: 18, fontStyle: "italic", color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>
                  {word.transliteration}
                </div>
                <SpeakButton text={word.arabic} size="sm" />
              </>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            <button type="button" onClick={() => advance(false)} style={{ ...markBtn, background: "#fde8ec", color: "#e85d75", border: "2px solid #e85d75" }}>
              Don&apos;t know
            </button>
            <button type="button" onClick={() => advance(true)} style={{ ...markBtn, background: "#2D7A4F", color: "white", border: "2px solid #2D7A4F" }}>
              I know
            </button>
          </div>

          <div style={{ padding: 20, borderRadius: 16, background: "white", border: "2px solid #e8e0d0" }}>
            <div style={{ fontWeight: 800, color: "var(--navy)", marginBottom: 12, fontSize: 17 }}>Say it</div>
            <PronounceButton
              key={word.id}
              targetArabic={word.arabic}
              onResult={(ok) => {
                if (ok) correct(word.id);
                else wrong(word.id);
              }}
            />
          </div>
        </>
      )}

      <div style={{ marginTop: 28, textAlign: "center" }}>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Reset all word progress?")) reset();
          }}
          style={{ background: "none", border: "none", color: "#888", fontSize: 14, cursor: "pointer", textDecoration: "underline" }}
        >
          Reset progress
        </button>
      </div>
    </div>
  );
}

const ctaStyle: CSSProperties = {
  padding: "12px 20px",
  borderRadius: 12,
  background: "var(--navy)",
  color: "white",
  fontWeight: 800,
  textDecoration: "none",
};

const ctaOutline: CSSProperties = {
  ...ctaStyle,
  background: "white",
  color: "var(--navy)",
  border: "2px solid var(--navy)",
};

const markBtn: CSSProperties = {
  flex: 1,
  padding: "16px 0",
  borderRadius: 14,
  fontWeight: 800,
  fontSize: 17,
  cursor: "pointer",
};
