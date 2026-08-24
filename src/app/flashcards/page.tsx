"use client";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { vocabulary, categories, Word } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";
import { useProgress } from "@/hooks/useProgress";
import { getWordsByStatus, type ProgressFilter, type WordStatus } from "@/lib/progress";

const SWIPE_THRESHOLD = 96;

function FlashCard({
  word,
  onNext,
  onPrev,
  onMark,
  index,
  total,
  status,
}: {
  word: Word;
  onNext: () => void;
  onPrev: () => void;
  onMark: (status: WordStatus) => void;
  index: number;
  total: number;
  status: WordStatus | "unseen";
}) {
  const [flipped, setFlipped] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const axisRef = useRef<"undecided" | "x" | "y">("undecided");
  const offsetRef = useRef(0);
  const busyRef = useRef(false);

  const next = () => { setFlipped(false); setTimeout(onNext, 150); };
  const prev = () => { setFlipped(false); setTimeout(onPrev, 150); };

  const finishSwipe = (nextStatus: WordStatus, dir: 1 | -1) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setOffsetX(dir * 560);
    window.setTimeout(() => {
      setFlipped(false);
      onMark(nextStatus);
    }, 200);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (busyRef.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.target instanceof Element && e.target.closest("button")) return;
    startRef.current = { x: e.clientX, y: e.clientY };
    axisRef.current = "undecided";
    offsetRef.current = 0;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!startRef.current || busyRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    if (axisRef.current === "undecided") {
      if (Math.hypot(dx, dy) < 10) return;
      axisRef.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (axisRef.current === "y") {
        try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* allow scroll */ }
        startRef.current = null;
        setDragging(false);
        return;
      }
    }
    if (axisRef.current !== "x") return;
    offsetRef.current = dx;
    setOffsetX(dx);
  };

  const endPointer = () => {
    if (!startRef.current) return;
    const dx = offsetRef.current;
    const axis = axisRef.current;
    startRef.current = null;
    setDragging(false);

    if (axis === "x" && Math.abs(dx) >= SWIPE_THRESHOLD) {
      finishSwipe(dx > 0 ? "known" : "learning", dx > 0 ? 1 : -1);
      return;
    }

    if (axis === "undecided") {
      setFlipped((f) => !f);
    }

    setOffsetX(0);
    offsetRef.current = 0;
    axisRef.current = "undecided";
  };

  const knowAmount = Math.min(1, Math.max(0, offsetX / SWIPE_THRESHOLD));
  const learnAmount = Math.min(1, Math.max(0, -offsetX / SWIPE_THRESHOLD));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 10, borderRadius: 99, background: "#ddd" }}>
          <div style={{ height: 10, borderRadius: 99, background: "var(--gold)", width: `${((index + 1) / total) * 100}%`, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", minWidth: 56 }}>{index + 1}/{total}</span>
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 520,
          height: "min(420px, 72vw)",
          perspective: 1000,
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "pan-y",
          userSelect: "none",
          transform: `translateX(${offsetX}px) rotate(${offsetX / 22}deg)`,
          transition: dragging ? "none" : "transform 0.22s ease",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            zIndex: 2,
            padding: "8px 14px",
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 16,
            background: "var(--green)",
            color: "white",
            opacity: knowAmount,
            transform: `scale(${0.92 + knowAmount * 0.08})`,
            pointerEvents: "none",
          }}
        >
          I know
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            zIndex: 2,
            padding: "8px 14px",
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 16,
            background: "var(--navy)",
            color: "white",
            opacity: learnAmount,
            transform: `scale(${0.92 + learnAmount * 0.08})`,
            pointerEvents: "none",
          }}
        >
          Don&apos;t know
        </div>
        <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.55s", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 22, background: "var(--navy)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center" }}>
            <div className="arabic" style={{ fontSize: "clamp(56px, 14vw, 88px)", color: "var(--gold-light)", marginBottom: 16, lineHeight: 1.5 }}>{word.arabic}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <SpeakButton text={word.arabic} size="lg" />
              <span style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>tap to flip · swipe to mark</span>
            </div>
          </div>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 22, background: "var(--gold)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center" }}>
            <div style={{ fontSize: "clamp(22px,5vw,30px)", fontWeight: 800, color: "white", marginBottom: 6, lineHeight: 1.3 }}>{word.english}</div>
            <div style={{ fontSize: 18, fontStyle: "italic", color: "rgba(255,255,255,0.8)", marginBottom: 14 }}>{word.transliteration}</div>
            {word.example && (
              <div style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(255,255,255,0.3)", maxWidth: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
                  <SpeakButton text={word.example} size="sm" />
                  <span className="arabic" style={{ fontSize: 32, color: "white" }}>{word.example}</span>
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>{word.exampleTranslation}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#555" }}>
        ← Don&apos;t know · I know →
      </p>

      <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 400 }}>
        <button
          type="button"
          onClick={() => { setFlipped(false); onMark("learning"); }}
          style={{
            flex: 1, padding: "16px 0", borderRadius: 14, fontWeight: 800, fontSize: 17,
            background: "white", color: "var(--navy)", border: "3px solid var(--navy)", cursor: "pointer",
          }}
        >
          Don&apos;t know
        </button>
        <button
          type="button"
          onClick={() => { setFlipped(false); onMark("known"); }}
          style={{
            flex: 1, padding: "16px 0", borderRadius: 14, fontWeight: 800, fontSize: 17,
            background: "var(--green)", color: "white", border: "3px solid var(--green)", cursor: "pointer",
          }}
        >
          I know
        </button>
      </div>

      <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 400 }}>
        <button type="button" onClick={prev} disabled={index === 0} style={{
          flex: 1, padding: "16px 0", borderRadius: 14, fontWeight: 700, fontSize: 18,
          background: index === 0 ? "#e0ddd8" : "white", color: index === 0 ? "#aaa" : "var(--navy)",
          border: "3px solid " + (index === 0 ? "#e0ddd8" : "var(--navy)"), cursor: index === 0 ? "not-allowed" : "pointer",
        }}>← Prev</button>
        <button type="button" onClick={next} disabled={index === total - 1} style={{
          flex: 1, padding: "16px 0", borderRadius: 14, fontWeight: 700, fontSize: 18,
          background: index === total - 1 ? "#e0ddd8" : "var(--navy)", color: index === total - 1 ? "#aaa" : "white",
          border: "3px solid " + (index === total - 1 ? "#e0ddd8" : "var(--navy)"), cursor: index === total - 1 ? "not-allowed" : "pointer",
        }}>Next →</button>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 15, padding: "7px 18px", borderRadius: 99, background: "var(--navy)", color: "var(--gold-light)", fontWeight: 700 }}>{word.category}</span>
        {status !== "unseen" && (
          <span style={{ fontSize: 13, padding: "7px 14px", borderRadius: 99, fontWeight: 700, background: status === "known" ? "var(--green)" : "#fff3cc", color: status === "known" ? "white" : "var(--navy)" }}>
            {status === "known" ? "Known" : "Learning"}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Flashcards() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [progressFilter, setProgressFilter] = useState<ProgressFilter>("all");
  const [index, setIndex] = useState(0);
  const { progress, mark, counts } = useProgress();

  const categoryWords = selectedCat === "All" ? vocabulary : vocabulary.filter((w) => w.category === selectedCat);
  const words = getWordsByStatus(categoryWords, progress, progressFilter);
  const safeIndex = words.length === 0 ? 0 : Math.min(index, words.length - 1);

  useEffect(() => {
    setIndex((i) => (words.length === 0 ? 0 : Math.min(i, words.length - 1)));
  }, [words.length]);

  const handleCat = (cat: string) => { setSelectedCat(cat); setIndex(0); };
  const handleProgressFilter = (filter: ProgressFilter) => { setProgressFilter(filter); setIndex(0); };

  const handleMark = (status: WordStatus) => {
    const current = words[safeIndex];
    if (!current) return;
    mark(current.id, status);
    if (!(status === "known" && progressFilter === "learning")) {
      setIndex((i) => i + 1);
    }
  };

  const learningCount = counts.learning + counts.unseen;

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 18 }}>Flashcards</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {([
          { key: "all", label: `All (${vocabulary.length})` },
          { key: "learning", label: `Learning (${learningCount})` },
          { key: "known", label: `Known (${counts.known})` },
        ] as const).map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => handleProgressFilter(filter.key)}
            style={{
              padding: "8px 16px", borderRadius: 99, fontSize: 14, fontWeight: 700, cursor: "pointer",
              background: progressFilter === filter.key ? "var(--gold)" : "white",
              color: "var(--navy)",
              border: "2px solid " + (progressFilter === filter.key ? "var(--gold)" : "#ddd"),
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10, marginBottom: 28, scrollbarWidth: "none" }}>
        {["All", ...categories].map((cat) => (
          <button key={cat} type="button" onClick={() => handleCat(cat)} style={{
            padding: "10px 20px", borderRadius: 99, fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            background: selectedCat === cat ? "var(--navy)" : "white",
            color: selectedCat === cat ? "white" : "var(--navy)",
            border: "2px solid var(--navy)",
          }}>
            {cat} ({cat === "All" ? vocabulary.length : vocabulary.filter((w) => w.category === cat).length})
          </button>
        ))}
      </div>

      {words.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", borderRadius: 20, background: "white", border: "2px solid #e8e0d0" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "var(--navy)", marginBottom: 10 }}>
            {progressFilter === "known" ? "No known words yet" : "Nothing in Learning"}
          </div>
          <p style={{ color: "#555", marginBottom: 20, fontSize: 16 }}>
            {progressFilter === "known"
              ? "Swipe right or tap I know to save them here."
              : "Study All cards and swipe left or tap Don’t know to build this list."}
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" onClick={() => handleProgressFilter("all")} style={{ padding: "12px 22px", borderRadius: 12, background: "var(--navy)", color: "white", fontWeight: 700, border: "none", cursor: "pointer" }}>Study All</button>
            <Link href="/quiz" style={{ padding: "12px 22px", borderRadius: 12, background: "white", color: "var(--navy)", fontWeight: 700, border: "3px solid var(--navy)", textDecoration: "none" }}>Quiz</Link>
          </div>
        </div>
      ) : (
        <FlashCard
          key={words[safeIndex].id}
          word={words[safeIndex]}
          onNext={() => setIndex((i) => Math.min(i + 1, words.length - 1))}
          onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
          onMark={handleMark}
          index={safeIndex}
          total={words.length}
          status={progress[String(words[safeIndex].id)] ?? "unseen"}
        />
      )}
    </div>
  );
}
