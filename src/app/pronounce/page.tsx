"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { vocabulary, type Word } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";
import PronounceButton from "@/components/PronounceButton";
import { useProgress } from "@/hooks/useProgress";
import { getDueWords, getMissedWords, pickPracticeWords, shuffle } from "@/lib/progress";

export default function PronouncePage() {
  const { progress, correct, wrong, counts } = useProgress();
  const [queue, setQueue] = useState<Word[]>([]);
  const [idx, setIdx] = useState(0);
  const [lastOk, setLastOk] = useState<boolean | null>(null);

  const rebuild = () => {
    const due = getDueWords(vocabulary, progress);
    const missed = getMissedWords(vocabulary, progress);
    const preferred = shuffle([...due, ...missed.filter((w) => !due.some((d) => d.id === w.id))]);
    const pool =
      preferred.length >= 5
        ? preferred.slice(0, 12)
        : pickPracticeWords(vocabulary, progress, 10);
    setQueue(pool);
    setIdx(0);
    setLastOk(null);
  };

  useEffect(() => {
    rebuild();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- rebuild when progress identity changes via counts
  }, [counts.due, counts.missed, counts.known]);

  const word = queue[idx] ?? null;
  const remaining = useMemo(() => Math.max(queue.length - idx, 0), [queue.length, idx]);

  const next = () => {
    setLastOk(null);
    if (idx + 1 >= queue.length) rebuild();
    else setIdx((i) => i + 1);
  };

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>Pronounce</h1>
      <p style={{ color: "#555", marginBottom: 20, fontSize: 16, lineHeight: 1.5 }}>
        Listen, then say the Arabic word. You&apos;ll get <strong>Right</strong> or <strong>Wrong</strong> feedback.
        Works best in Chrome or Edge.
      </p>
      <p style={{ color: "#666", marginBottom: 24, fontSize: 15, fontWeight: 600 }}>
        Due {counts.due} · Missed {counts.missed} · Known {counts.known}
      </p>

      {!word ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <p style={{ marginBottom: 16 }}>No words to practice yet.</p>
          <Link href="/flashcards" style={{ color: "var(--gold)", fontWeight: 700 }}>Start flashcards →</Link>
        </div>
      ) : (
        <>
          <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
            Word {idx + 1} · {remaining} left in this set
          </div>
          <div
            style={{
              borderRadius: 22,
              background: "var(--navy)",
              padding: "36px 24px",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            <div className="arabic" style={{ fontSize: "clamp(52px, 14vw, 80px)", color: "var(--gold-light)", marginBottom: 12, lineHeight: 1.4 }}>
              {word.arabic}
            </div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontStyle: "italic", marginBottom: 14, fontSize: 18 }}>
              {word.transliteration}
            </div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, marginBottom: 16 }}>{word.english}</div>
            <SpeakButton text={word.arabic} size="lg" />
          </div>

          <div style={{ padding: 24, borderRadius: 18, background: "white", border: "2px solid #e8e0d0", marginBottom: 20 }}>
            <PronounceButton
              key={word.id}
              targetArabic={word.arabic}
              onResult={(ok) => {
                setLastOk(ok);
                if (ok) correct(word.id);
                else wrong(word.id);
              }}
            />
          </div>

          {lastOk !== null && (
            <div
              style={{
                textAlign: "center",
                marginBottom: 16,
                fontWeight: 800,
                fontSize: 20,
                color: lastOk ? "#2D7A4F" : "#e85d75",
              }}
            >
              {lastOk ? "Right — nice!" : "Wrong — listen again and retry"}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={next}
              style={{
                padding: "14px 28px",
                borderRadius: 12,
                background: "var(--navy)",
                color: "white",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Next word →
            </button>
            <Link
              href="/review"
              style={{
                padding: "14px 28px",
                borderRadius: 12,
                background: "white",
                color: "var(--navy)",
                fontWeight: 800,
                border: "2px solid var(--navy)",
                textDecoration: "none",
                fontSize: 16,
              }}
            >
              Review missed
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
