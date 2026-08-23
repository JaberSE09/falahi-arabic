"use client";
import { useState, useEffect, useCallback } from "react";
import { vocabulary, categories, Word } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";

// ─── Persistence ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "falahi_learned_v1";

function loadLearned(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch { /* ignore */ }
  return new Set();
}

function saveLearned(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch { /* ignore */ }
}

type FilterMode = "all" | "unlearned" | "learned";

// ─── FlashCard ────────────────────────────────────────────────────────────────
function FlashCard({
  word, index, total, isLearned,
  onMarkLearned, onMarkUnlearned, onNext, onPrev,
}: {
  word: Word; index: number; total: number; isLearned: boolean;
  onMarkLearned: () => void; onMarkUnlearned: () => void;
  onNext: () => void; onPrev: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  const next = () => { setFlipped(false); setTimeout(onNext, 150); };
  const prev = () => { setFlipped(false); setTimeout(onPrev, 150); };

  const handleMark = () => {
    if (isLearned) {
      onMarkUnlearned();
    } else {
      onMarkLearned();
      setTimeout(() => { setFlipped(false); setTimeout(onNext, 150); }, 350);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>

      {/* Progress bar */}
      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 10, borderRadius: 99, background: "#ddd", overflow: "hidden" }}>
          <div style={{
            height: 10, borderRadius: 99,
            background: isLearned ? "#4ade80" : "var(--gold)",
            width: `${((index + 1) / total) * 100}%`,
            transition: "width 0.3s",
          }} />
        </div>
        <span style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", minWidth: 56 }}>
          {index + 1}/{total}
        </span>
      </div>

      {/* Learned badge */}
      {isLearned && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(74,222,128,0.12)", border: "2px solid #4ade80",
          borderRadius: 99, padding: "5px 16px", fontSize: 15, fontWeight: 700, color: "#16a34a",
        }}>
          ✅ You know this word!
        </div>
      )}

      {/* Flip card — PR #1 fix: ignore clicks on SpeakButton */}
      <div
        onClick={(e) => {
          if (e.target instanceof Element && e.target.closest("button")) return;
          setFlipped(f => !f);
        }}
        style={{ width: "100%", maxWidth: 520, height: "min(320px, 60vw)", perspective: 1000, cursor: "pointer" }}
      >
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          {/* Front */}
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            borderRadius: 22,
            background: isLearned
              ? "linear-gradient(135deg, #166534 0%, #15803d 100%)"
              : "var(--navy)",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: 28, textAlign: "center",
            boxShadow: isLearned ? "0 0 0 3px #4ade80" : "none",
            transition: "background 0.4s, box-shadow 0.4s",
          }}>
            <div className="arabic" style={{ fontSize: "clamp(40px, 10vw, 64px)", color: "var(--gold-light)", marginBottom: 16, lineHeight: 1.5 }}>
              {word.arabic}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <SpeakButton text={word.arabic} size="lg" />
              <span style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>tap card to reveal</span>
            </div>
          </div>

          {/* Back */}
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            transform: "rotateY(180deg)", borderRadius: 22,
            background: isLearned
              ? "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)"
              : "var(--gold)",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: 28, textAlign: "center",
          }}>
            <div style={{ fontSize: "clamp(22px,5vw,30px)", fontWeight: 800, color: "white", marginBottom: 6, lineHeight: 1.3 }}>{word.english}</div>
            <div style={{ fontSize: 18, fontStyle: "italic", color: "rgba(255,255,255,0.85)", marginBottom: 14 }}>{word.transliteration}</div>
            {word.example && (
              <div style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(255,255,255,0.3)", maxWidth: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
                  <SpeakButton text={word.example} size="sm" />
                  <span className="arabic" style={{ fontSize: 20, color: "white" }}>{word.example}</span>
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}>{word.exampleTranslation}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mark learned / unlearned */}
      <button
        onClick={handleMark}
        style={{
          width: "100%", maxWidth: 400,
          padding: "15px 0", borderRadius: 14,
          fontSize: 18, fontWeight: 700, cursor: "pointer",
          border: isLearned ? "3px solid #dc2626" : "3px solid #16a34a",
          background: isLearned ? "rgba(220,38,38,0.08)" : "rgba(74,222,128,0.12)",
          color: isLearned ? "#dc2626" : "#16a34a",
          transition: "all 0.2s",
        }}
      >
        {isLearned ? "🔄 Mark as unlearned" : "✅ I know this word!"}
      </button>

      {/* Prev / Next */}
      <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 400 }}>
        <button onClick={prev} disabled={index === 0} style={{
          flex: 1, padding: "16px 0", borderRadius: 14, fontWeight: 700, fontSize: 18,
          background: index === 0 ? "#e0ddd8" : "white",
          color: index === 0 ? "#aaa" : "var(--navy)",
          border: "3px solid " + (index === 0 ? "#e0ddd8" : "var(--navy)"),
          cursor: index === 0 ? "not-allowed" : "pointer",
        }}>← Prev</button>
        <button onClick={next} disabled={index === total - 1} style={{
          flex: 1, padding: "16px 0", borderRadius: 14, fontWeight: 700, fontSize: 18,
          background: index === total - 1 ? "#e0ddd8" : "var(--navy)",
          color: index === total - 1 ? "#aaa" : "white",
          border: "3px solid " + (index === total - 1 ? "#e0ddd8" : "var(--navy)"),
          cursor: index === total - 1 ? "not-allowed" : "pointer",
        }}>Next →</button>
      </div>

      <span style={{ fontSize: 15, padding: "7px 18px", borderRadius: 99, background: "var(--navy)", color: "var(--gold-light)", fontWeight: 700 }}>
        {word.category}
      </span>
    </div>
  );
}

// ─── Progress summary ─────────────────────────────────────────────────────────
function ProgressSummary({ total, learnedCount, onReset }: { total: number; learnedCount: number; onReset: () => void }) {
  const pct = total > 0 ? Math.round((learnedCount / total) * 100) : 0;
  const barColor = pct === 100 ? "#4ade80" : pct >= 50 ? "#facc15" : "var(--gold)";

  return (
    <div style={{
      background: "white", borderRadius: 18, padding: "16px 20px", marginBottom: 20,
      border: "2px solid var(--navy)", display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: "var(--navy)" }}>
          {pct === 100 ? "🎉 All learned!" : `📚 Progress: ${learnedCount}/${total} learned`}
        </span>
        {learnedCount > 0 && (
          <button onClick={onReset} style={{
            fontSize: 13, fontWeight: 600, color: "#dc2626",
            background: "rgba(220,38,38,0.08)", border: "1.5px solid #dc2626",
            borderRadius: 8, padding: "4px 10px", cursor: "pointer",
          }}>
            Reset all
          </button>
        )}
      </div>
      <div style={{ height: 12, borderRadius: 99, background: "#eee", overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 99, background: barColor, width: `${pct}%`, transition: "width 0.5s ease" }} />
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 14, fontWeight: 600 }}>
        <span style={{ color: "#16a34a" }}>✅ {learnedCount} learned</span>
        <span style={{ color: "var(--navy)" }}>📖 {total - learnedCount} remaining</span>
        <span style={{ color: "#888" }}>{pct}%</span>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Flashcards() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [index, setIndex] = useState(0);
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setLearned(loadLearned()); setMounted(true); }, []);
  useEffect(() => { if (mounted) saveLearned(learned); }, [learned, mounted]);

  const baseWords = selectedCat === "All" ? vocabulary : vocabulary.filter(w => w.category === selectedCat);
  const words: Word[] =
    filterMode === "unlearned" ? baseWords.filter(w => !learned.has(w.arabic)) :
    filterMode === "learned"   ? baseWords.filter(w => learned.has(w.arabic)) :
    baseWords;

  const safeIndex = Math.min(index, Math.max(0, words.length - 1));

  const handleCat = (cat: string) => { setSelectedCat(cat); setIndex(0); };
  const handleFilter = (mode: FilterMode) => { setFilterMode(mode); setIndex(0); };

  const markLearned = useCallback(() => {
    if (!words[safeIndex]) return;
    setLearned(prev => new Set([...prev, words[safeIndex].arabic]));
  }, [words, safeIndex]);

  const markUnlearned = useCallback(() => {
    if (!words[safeIndex]) return;
    setLearned(prev => { const next = new Set(prev); next.delete(words[safeIndex].arabic); return next; });
  }, [words, safeIndex]);

  const resetAll = () => {
    if (confirm("Reset all learned words? This cannot be undone.")) setLearned(new Set());
  };

  const learnedInCat = baseWords.filter(w => learned.has(w.arabic)).length;
  const unlearnedCount = baseWords.filter(w => !learned.has(w.arabic)).length;

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 18 }}>Flashcards</h1>

      {/* Progress summary */}
      {mounted && (
        <ProgressSummary total={baseWords.length} learnedCount={learnedInCat} onReset={resetAll} />
      )}

      {/* Filter tabs: All / Still learning / Learned */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {([
          { mode: "all" as FilterMode, label: `All (${baseWords.length})` },
          { mode: "unlearned" as FilterMode, label: `🔁 Still learning (${unlearnedCount})` },
          { mode: "learned" as FilterMode, label: `✅ Learned (${learnedInCat})` },
        ]).map(({ mode, label }) => (
          <button key={mode} onClick={() => handleFilter(mode)} style={{
            padding: "9px 16px", borderRadius: 10, fontSize: 14, fontWeight: 700,
            cursor: "pointer", whiteSpace: "nowrap",
            background: filterMode === mode ? "var(--navy)" : "white",
            color: filterMode === mode ? "white" : "var(--navy)",
            border: "2px solid var(--navy)", transition: "all 0.15s",
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10, marginBottom: 28, scrollbarWidth: "none" }}>
        {["All", ...categories].map(cat => (
          <button key={cat} onClick={() => handleCat(cat)} style={{
            padding: "10px 20px", borderRadius: 99, fontSize: 15, fontWeight: 700,
            cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            background: selectedCat === cat ? "var(--navy)" : "white",
            color: selectedCat === cat ? "white" : "var(--navy)",
            border: "2px solid var(--navy)",
          }}>
            {cat} ({cat === "All" ? vocabulary.length : vocabulary.filter(w => w.category === cat).length})
          </button>
        ))}
      </div>

      {/* Card or empty state */}
      {words.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 24px", background: "white", borderRadius: 22, border: "2px solid var(--navy)" }}>
          {filterMode === "unlearned" ? (
            <>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--navy)", marginBottom: 10 }}>
                You&apos;ve learned all these words!
              </div>
              <p style={{ fontSize: 16, color: "#666", marginBottom: 20 }}>
                All {baseWords.length} words in this category are marked as learned.
              </p>
              <button onClick={() => handleFilter("all")} style={{
                padding: "13px 28px", borderRadius: 12, fontSize: 17, fontWeight: 700,
                background: "var(--navy)", color: "white", border: "none", cursor: "pointer",
              }}>
                Review all words anyway
              </button>
            </>
          ) : filterMode === "learned" ? (
            <>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📖</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--navy)", marginBottom: 10 }}>
                No learned words yet
              </div>
              <p style={{ fontSize: 16, color: "#666", marginBottom: 20 }}>
                Tap &quot;✅ I know this word!&quot; on cards you&apos;ve mastered.
              </p>
              <button onClick={() => handleFilter("all")} style={{
                padding: "13px 28px", borderRadius: 12, fontSize: 17, fontWeight: 700,
                background: "var(--navy)", color: "white", border: "none", cursor: "pointer",
              }}>
                Start studying
              </button>
            </>
          ) : (
            <div style={{ fontSize: 18, color: "#666" }}>No words found.</div>
          )}
        </div>
      ) : (
        <FlashCard
          word={words[safeIndex]}
          index={safeIndex}
          total={words.length}
          isLearned={learned.has(words[safeIndex].arabic)}
          onMarkLearned={markLearned}
          onMarkUnlearned={markUnlearned}
          onNext={() => setIndex(i => Math.min(i + 1, words.length - 1))}
          onPrev={() => setIndex(i => Math.max(i - 1, 0))}
        />
      )}
    </div>
  );
}
