"use client";

import { useEffect, useMemo, useState, type CSSProperties, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { vocabulary, categories, type Word } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";
import PronounceButton from "@/components/PronounceButton";
import { useProgress } from "@/hooks/useProgress";
import { getDueWords, getMissedWords, shuffle } from "@/lib/progress";

type Tab = "due" | "missed";

function ReviewInner() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("section");
  const validInitial = initial && categories.includes(initial) ? initial : "All";

  const { progress, correct, wrong, reset, counts, refresh } = useProgress();
  const [tab, setTab] = useState<Tab>("missed");
  const [section, setSection] = useState<string>(validInitial);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (validInitial !== section && searchParams.get("section")) {
      setSection(validInitial);
    }
  }, [validInitial]); // eslint-disable-line react-hooks/exhaustive-deps -- sync from URL once when param present

  const dueAll = useMemo(() => getDueWords(vocabulary, progress), [progress]);
  const missedAll = useMemo(() => getMissedWords(vocabulary, progress), [progress]);

  const due = useMemo(() => {
    const list = section === "All" ? dueAll : dueAll.filter((w) => w.category === section);
    return shuffle(list);
  }, [dueAll, section]);

  const missed = useMemo(() => {
    const list = section === "All" ? missedAll : missedAll.filter((w) => w.category === section);
    return shuffle(list);
  }, [missedAll, section]);

  const queue: Word[] = tab === "due" ? due : missed;
  const word = queue[idx] ?? null;

  const sectionCounts = useMemo(() => {
    const source = tab === "due" ? dueAll : missedAll;
    const map: Record<string, number> = { All: source.length };
    for (const cat of categories) {
      map[cat] = source.filter((w) => w.category === cat).length;
    }
    return map;
  }, [tab, dueAll, missedAll]);

  useEffect(() => {
    setIdx(0);
    setFlipped(false);
  }, [tab, section]);

  useEffect(() => {
    if (idx >= queue.length) setIdx(0);
  }, [queue.length, idx]);

  useEffect(() => {
    if (tab === "due" && due.length === 0 && missed.length > 0) setTab("missed");
  }, [tab, due.length, missed.length]);

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
        Study words you got wrong — pick a section, then drill Missed or Due.
      </p>
      <p style={{ color: "#666", marginBottom: 16, fontSize: 15, fontWeight: 600 }}>
        Due {counts.due} · Missed {counts.missed} · Known {counts.known}
      </p>

      <div style={{ fontSize: 13, fontWeight: 800, color: "#888", letterSpacing: 0.6, marginBottom: 8, textTransform: "uppercase" }}>
        Section
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {["All", ...categories].map((cat) => {
          const n = sectionCounts[cat] ?? 0;
          const active = section === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSection(cat)}
              style={{
                padding: "9px 14px",
                borderRadius: 99,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                background: active ? "var(--gold)" : "white",
                color: "var(--navy)",
                border: "2px solid " + (active ? "var(--gold)" : "#ddd"),
              }}
            >
              {cat} ({n})
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {([
          { key: "missed" as const, label: `Wrong / Missed (${missed.length})` },
          { key: "due" as const, label: `Due today (${due.length})` },
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
            {tab === "due"
              ? section === "All"
                ? "Nothing due right now"
                : `Nothing due in ${section}`
              : section === "All"
                ? "No missed words yet"
                : `No wrong words in ${section}`}
          </div>
          <p style={{ color: "#555", marginBottom: 20 }}>
            {tab === "missed"
              ? "Miss some in Quiz or Flashcards, then come back to drill this section."
              : "Study new words or switch to Missed."}
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href={section === "All" ? "/quiz" : `/quiz?section=${encodeURIComponent(section)}`}
              style={ctaStyle}
            >
              Quiz this section
            </Link>
            <Link
              href={section === "All" ? "/flashcards" : `/flashcards?category=${encodeURIComponent(section)}`}
              style={ctaStyle}
            >
              Flashcards
            </Link>
            <Link href="/pronounce" style={ctaOutline}>Pronounce</Link>
          </div>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 12, fontWeight: 700, color: "var(--navy)", display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
            <span>
              {Math.min(idx + 1, queue.length)} / {queue.length}
              {section !== "All" ? ` · ${section}` : ""}
            </span>
            <span style={{ fontSize: 14, color: "#888" }}>{word.category}</span>
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

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="fade-in" style={{ padding: 24, fontWeight: 700, color: "var(--navy)" }}>Loading review…</div>}>
      <ReviewInner />
    </Suspense>
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
