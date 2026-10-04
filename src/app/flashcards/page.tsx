"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { vocabulary, categories, type Word } from "@/lib/vocabulary";
import ArabicForms, { ExampleForms } from "@/components/ArabicForms";
import { useProgress } from "@/hooks/useProgress";
import {
  buildStudyQueue,
  getProgress,
  nextScheduledReview,
  waitingWords,
} from "@/lib/progress";

type Mode = "study" | "browse";

function wordsIn(category: string): Word[] {
  return category === "All" ? vocabulary : vocabulary.filter((word) => word.category === category);
}

function formatWait(at: number, now: number): string {
  const minutes = Math.max(1, Math.round((at - now) / 60000));
  if (minutes < 60) return `in ${minutes} minute${minutes === 1 ? "" : "s"}`;
  const hours = Math.round(minutes / 60);
  if (hours < 36) return `in ${hours} hour${hours === 1 ? "" : "s"}`;
  const days = Math.max(1, Math.round(hours / 24));
  return `in ${days} day${days === 1 ? "" : "s"}`;
}

/** Put the missed card back after three other cards, without rebuilding from storage. */
function requeueAgain(queue: Word[]): Word[] {
  const [current, ...rest] = queue;
  if (!current) return queue;
  const insertAt = Math.min(3, rest.length);
  const next = [...rest];
  next.splice(insertAt, 0, current);
  return next;
}

function FlipCard({
  word,
  flipped,
  onFlip,
}: {
  word: Word;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("button")) return;
        onFlip();
      }}
      style={{
        width: "100%",
        maxWidth: 520,
        height: word.arabicF ? "min(820px, 170vw)" : "min(520px, 110vw)",
        perspective: 1000,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 22,
            background: "var(--navy)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 28,
            textAlign: "center",
            overflow: "auto",
          }}
        >
          <ArabicForms word={word} tone="light" scale="hero" />
          <span style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: 8 }}>
            tap card to reveal
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 22,
            background: "var(--gold)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 28,
            textAlign: "center",
            overflow: "auto",
          }}
        >
          <div style={{ fontSize: "clamp(22px,5vw,30px)", fontWeight: 800, color: "white", marginBottom: 10, lineHeight: 1.3 }}>
            {word.english}
          </div>
          {word.example && (
            <div style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(255,255,255,0.3)", maxWidth: "100%" }}>
              <ExampleForms word={word} tone="white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FlashcardsInner() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category");
  const validInitial = initial && categories.includes(initial) ? initial : "All";

  const { progress, correct, wrong, reset } = useProgress();
  const [mode, setMode] = useState<Mode>("study");
  const [selectedCat, setSelectedCat] = useState(validInitial);
  const [queue, setQueue] = useState<Word[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [browseIndex, setBrowseIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const grading = useRef(false);

  const source = wordsIn(selectedCat);

  useEffect(() => {
    setQueue(buildStudyQueue(wordsIn(selectedCat), getProgress()));
    setFlipped(false);
    setBrowseIndex(0);
    setReady(true);
  }, [selectedCat]);

  const current = queue[0] ?? null;
  const unseenLeft = source.filter((word) => !progress[String(word.id)]).length;
  const waiting = waitingWords(source, progress);
  const nextAt = nextScheduledReview(source, progress);

  const startAnotherSet = () => {
    setQueue(buildStudyQueue(source, getProgress()));
    setFlipped(false);
    setMode("study");
  };

  useEffect(() => {
    grading.current = false;
  }, [current?.id, flipped]);

  const grade = (ok: boolean) => {
    if (!current || !flipped || grading.current) return;
    grading.current = true;
    if (ok) {
      correct(current.id);
      setQueue((cards) => cards.slice(1));
    } else {
      wrong(current.id);
      setQueue((cards) => requeueAgain(cards));
    }
    setFlipped(false);
  };

  const resetAll = () => {
    if (!confirm("Reset all word progress? This cannot be undone.")) return;
    reset();
    setQueue(buildStudyQueue(source, {}));
    setFlipped(false);
    setBrowseIndex(0);
  };

  const browseWord = source[browseIndex] ?? null;

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", margin: 0 }}>Flashcards</h1>
        {Object.keys(progress).length > 0 && (
        <button
          type="button"
          onClick={resetAll}
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#dc2626",
            background: "rgba(220,38,38,0.08)",
            border: "1.5px solid #dc2626",
            borderRadius: 8,
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Reset all
        </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["study", "browse"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setMode(item);
              setFlipped(false);
            }}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              background: mode === item ? "var(--navy)" : "white",
              color: mode === item ? "white" : "var(--navy)",
              border: "2px solid var(--navy)",
            }}
          >
            {item === "study" ? "Study" : "Browse"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10, marginBottom: 22, scrollbarWidth: "none" }}>
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCat(cat)}
            style={{
              padding: "10px 20px",
              borderRadius: 99,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              background: selectedCat === cat ? "var(--navy)" : "white",
              color: selectedCat === cat ? "white" : "var(--navy)",
              border: "2px solid var(--navy)",
            }}
          >
            {cat} ({wordsIn(cat).length})
          </button>
        ))}
      </div>

      {!ready ? (
        <div style={{ padding: 24, fontWeight: 700, color: "var(--navy)" }}>Loading cards…</div>
      ) : mode === "browse" ? (
        browseWord ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 10, borderRadius: 99, background: "#ddd", overflow: "hidden" }}>
                <div
                  style={{
                    height: 10,
                    borderRadius: 99,
                    background: "var(--gold)",
                    width: `${((browseIndex + 1) / source.length) * 100}%`,
                  }}
                />
              </div>
              <span style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", minWidth: 56 }}>
                {browseIndex + 1}/{source.length}
              </span>
            </div>
            <FlipCard word={browseWord} flipped={flipped} onFlip={() => setFlipped((open) => !open)} />
            <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 400 }}>
              <button
                type="button"
                onClick={() => {
                  setFlipped(false);
                  setBrowseIndex((i) => Math.max(0, i - 1));
                }}
                disabled={browseIndex === 0}
                style={{
                  flex: 1,
                  padding: "16px 0",
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: 18,
                  background: browseIndex === 0 ? "#e0ddd8" : "white",
                  color: browseIndex === 0 ? "#aaa" : "var(--navy)",
                  border: "3px solid " + (browseIndex === 0 ? "#e0ddd8" : "var(--navy)"),
                  cursor: browseIndex === 0 ? "not-allowed" : "pointer",
                }}
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => {
                  setFlipped(false);
                  setBrowseIndex((i) => Math.min(source.length - 1, i + 1));
                }}
                disabled={browseIndex >= source.length - 1}
                style={{
                  flex: 1,
                  padding: "16px 0",
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: 18,
                  background: browseIndex >= source.length - 1 ? "#e0ddd8" : "var(--navy)",
                  color: browseIndex >= source.length - 1 ? "#aaa" : "white",
                  border: "3px solid " + (browseIndex >= source.length - 1 ? "#e0ddd8" : "var(--navy)"),
                  cursor: browseIndex >= source.length - 1 ? "not-allowed" : "pointer",
                }}
              >
                Next →
              </button>
            </div>
            <span style={{ fontSize: 15, padding: "7px 18px", borderRadius: 99, background: "var(--navy)", color: "var(--gold-light)", fontWeight: 700 }}>
              {browseWord.category}
            </span>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 32, color: "#555" }}>No words in this category.</div>
        )
      ) : !current ? (
        <div style={{ textAlign: "center", padding: "48px 24px", background: "white", borderRadius: 22, border: "2px solid var(--navy)" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>✨</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>You&apos;re caught up</div>
          <p style={{ fontSize: 17, color: "#444", margin: "0 0 8px" }}>
            {waiting.length === 0
              ? "No words are waiting for review."
              : `${waiting.length} word${waiting.length === 1 ? "" : "s"} waiting`}
          </p>
          {nextAt !== null && (
            <p style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", margin: "0 0 18px" }}>
              Next review {formatWait(nextAt, Date.now())}
            </p>
          )}
          {unseenLeft > 0 && (
            <p style={{ fontSize: 16, color: "#555", margin: "0 0 18px" }}>
              {unseenLeft} new word{unseenLeft === 1 ? "" : "s"} left for a later set.
            </p>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {unseenLeft > 0 && (
              <button
                type="button"
                onClick={startAnotherSet}
                style={{
                  padding: "14px 22px",
                  borderRadius: 12,
                  fontSize: 17,
                  fontWeight: 800,
                  background: "var(--navy)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Study 10 more
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setMode("browse");
                setFlipped(false);
              }}
              style={{
                padding: "14px 22px",
                borderRadius: 12,
                fontSize: 17,
                fontWeight: 800,
                background: "white",
                color: "var(--navy)",
                border: "3px solid var(--navy)",
                cursor: "pointer",
              }}
            >
              Browse words
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ width: "100%", fontSize: 17, fontWeight: 800, color: "var(--navy)" }}>
            {queue.length} left
            {selectedCat !== "All" ? ` · ${selectedCat}` : ""}
          </div>
          <FlipCard key={current.id} word={current} flipped={flipped} onFlip={() => setFlipped((open) => !open)} />
          {flipped ? (
            <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 400 }}>
              <button
                type="button"
                onClick={() => grade(false)}
                style={{
                  flex: 1,
                  padding: "16px 0",
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 18,
                  background: "rgba(220,38,38,0.08)",
                  color: "#dc2626",
                  border: "3px solid #dc2626",
                  cursor: "pointer",
                }}
              >
                Again
              </button>
              <button
                type="button"
                onClick={() => grade(true)}
                style={{
                  flex: 1,
                  padding: "16px 0",
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 18,
                  background: "rgba(22,163,74,0.12)",
                  color: "#16a34a",
                  border: "3px solid #16a34a",
                  cursor: "pointer",
                }}
              >
                Got it
              </button>
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#666" }}>
              Recall the meaning, then tap the card.
            </p>
          )}
          <span style={{ fontSize: 15, padding: "7px 18px", borderRadius: 99, background: "var(--navy)", color: "var(--gold-light)", fontWeight: 700 }}>
            {current.category}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Flashcards() {
  return (
    <Suspense fallback={<div className="fade-in" style={{ padding: 24, fontWeight: 700, color: "var(--navy)" }}>Loading cards…</div>}>
      <FlashcardsInner />
    </Suspense>
  );
}
