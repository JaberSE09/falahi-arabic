"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { tutoringLessons, type TutoringItem } from "@/lib/tutoring";
import SpeakButton from "@/components/SpeakButton";

type Mode = "menu" | "study" | "cards" | "quiz" | "match";
interface QuizQuestion { item: TutoringItem; choices: string[]; correct: string; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function getKey(id: string) { return `falahi_tutor_${id}`; }
function loadProgress(id: string): Set<number> {
  if (typeof window === "undefined") return new Set();
  try { const r = localStorage.getItem(getKey(id)); return r ? new Set(JSON.parse(r) as number[]) : new Set(); }
  catch { return new Set(); }
}
function saveProgress(id: string, m: Set<number>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(id), JSON.stringify([...m]));
}

// ─── Study List ───────────────────────────────────────────────────────────────
function StudyList({ lesson, mastered, onMaster }: { lesson: typeof tutoringLessons[0]; mastered: Set<number>; onMaster: (i: number) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {lesson.items.map((item, i) => (
        <div key={i} style={{
          padding: "18px 16px", borderRadius: 16, background: "white",
          border: `2px solid ${mastered.has(i) ? lesson.color : "#e8e0d0"}`,
          display: "flex", alignItems: "flex-start", gap: 12, transition: "border-color 0.2s",
        }}>
          {/* Checkmark — big tap target */}
          <button onClick={() => onMaster(i)} style={{
            width: 36, height: 36, borderRadius: "50%", flexShrink: 0, marginTop: 4,
            background: mastered.has(i) ? lesson.color : "white",
            border: `2px solid ${mastered.has(i) ? lesson.color : "#ccc"}`,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s", WebkitTapHighlightColor: "transparent",
          }}>
            {mastered.has(i) && <svg width={16} height={16} viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="arabic" style={{ fontSize: "clamp(24px, 6vw, 32px)", color: "var(--navy)", fontWeight: 700, marginBottom: 4, lineHeight: 1.6 }}>
              {item.arabic}
            </div>
            <div style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "#888", fontStyle: "italic", marginBottom: 4 }}>
              {item.transliteration}
            </div>
            <div style={{ fontSize: "clamp(15px, 4vw, 17px)", color: "#222", fontWeight: 700 }}>
              {item.english}
            </div>
            {item.note && (
              <div style={{ fontSize: "clamp(12px, 3vw, 14px)", color: "#666", marginTop: 8, padding: "6px 10px", background: "#f5f5f5", borderRadius: 8, lineHeight: 1.5 }}>
                💡 {item.note}
              </div>
            )}
          </div>
          <div style={{ flexShrink: 0 }}>
            <SpeakButton text={item.arabic} size="md" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Flip Cards ───────────────────────────────────────────────────────────────
function FlipCards({ lesson, mastered, onMaster }: { lesson: typeof tutoringLessons[0]; mastered: Set<number>; onMaster: (i: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const items = lesson.items;
  const item = items[current];

  const next = useCallback(() => {
    if (current >= items.length - 1) return;
    setFlipped(false);
    setTimeout(() => setCurrent(c => c + 1), 120);
  }, [current, items.length]);

  const prev = useCallback(() => {
    if (current <= 0) return;
    setFlipped(false);
    setTimeout(() => setCurrent(c => c - 1), 120);
  }, [current]);

  // Swipe support
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {/* Progress */}
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "clamp(12px,3vw,14px)", color: "#666", marginBottom: 6 }}>
          <span>{current + 1} / {items.length}</span>
          <span style={{ color: lesson.color, fontWeight: 700 }}>{mastered.size} mastered · swipe to navigate</span>
        </div>
        <div style={{ height: 6, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((current + 1) / items.length) * 100}%`, background: lesson.color, transition: "width 0.3s", borderRadius: 3 }} />
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          width: "100%", minHeight: "clamp(240px, 55vw, 320px)", borderRadius: 24,
          cursor: "pointer", userSelect: "none",
          background: flipped ? "white" : "var(--navy)",
          border: `3px solid ${flipped ? lesson.color : "transparent"}`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "clamp(24px, 6vw, 40px) clamp(18px, 5vw, 32px)",
          textAlign: "center", transition: "background 0.25s, border-color 0.25s",
          boxShadow: "0 6px 28px rgba(0,0,0,0.13)", WebkitTapHighlightColor: "transparent",
        }}
      >
        {!flipped ? (
          <>
            <div style={{ fontSize: "clamp(11px,2.5vw,13px)", color: "rgba(255,255,255,0.4)", marginBottom: 14, letterSpacing: 1 }}>TAP TO REVEAL • SWIPE TO SKIP</div>
            <div className="arabic" style={{ fontSize: "clamp(40px, 10vw, 56px)", color: "white", fontWeight: 700, marginBottom: 10, lineHeight: 1.5 }}>{item.arabic}</div>
            <div style={{ fontSize: "clamp(15px,4vw,18px)", color: "rgba(255,255,255,0.65)", fontStyle: "italic", marginBottom: 18 }}>{item.transliteration}</div>
            <div onClick={e => e.stopPropagation()}><SpeakButton text={item.arabic} size="lg" /></div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "clamp(11px,2.5vw,13px)", color: lesson.color, marginBottom: 12, letterSpacing: 1, fontWeight: 700 }}>ENGLISH</div>
            <div style={{ fontSize: "clamp(22px, 6vw, 30px)", fontWeight: 800, color: "var(--navy)", marginBottom: 8, lineHeight: 1.3 }}>{item.english}</div>
            <div className="arabic" style={{ fontSize: "clamp(26px, 7vw, 34px)", color: "#555", fontWeight: 700, marginBottom: 4, lineHeight: 1.5 }}>{item.arabic}</div>
            <div style={{ fontSize: "clamp(13px, 3.5vw, 16px)", color: "#888", fontStyle: "italic", marginBottom: item.note ? 10 : 16 }}>{item.transliteration}</div>
            {item.note && <div style={{ fontSize: "clamp(12px,3vw,14px)", color: "#666", background: "#f5f5f5", padding: "6px 12px", borderRadius: 8, marginBottom: 16, lineHeight: 1.5 }}>💡 {item.note}</div>}
            <div onClick={e => e.stopPropagation()}><SpeakButton text={item.arabic} size="lg" /></div>
          </>
        )}
      </div>

      {/* Controls — full width on mobile */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr", gap: 10, width: "100%" }}>
        <button onClick={prev} disabled={current === 0} style={{
          padding: "14px 0", borderRadius: 12, fontWeight: 700, fontSize: "clamp(14px,3.5vw,16px)",
          background: current === 0 ? "#f0f0f0" : "white", border: "2px solid #ddd",
          color: current === 0 ? "#aaa" : "var(--navy)", cursor: current === 0 ? "default" : "pointer",
          WebkitTapHighlightColor: "transparent",
        }}>← Prev</button>

        <button onClick={() => onMaster(current)} style={{
          padding: "14px 0", borderRadius: 12, fontWeight: 700, fontSize: "clamp(13px,3vw,15px)",
          background: mastered.has(current) ? lesson.color : "white",
          border: `2px solid ${mastered.has(current) ? lesson.color : "#ddd"}`,
          color: mastered.has(current) ? "white" : "#555",
          cursor: "pointer", transition: "all 0.15s", WebkitTapHighlightColor: "transparent",
        }}>
          {mastered.has(current) ? "✓ Mastered" : "Mark Mastered"}
        </button>

        <button onClick={next} disabled={current === items.length - 1} style={{
          padding: "14px 0", borderRadius: 12, fontWeight: 700, fontSize: "clamp(14px,3.5vw,16px)",
          background: current === items.length - 1 ? "#f0f0f0" : lesson.color,
          border: `2px solid ${current === items.length - 1 ? "#ddd" : lesson.color}`,
          color: current === items.length - 1 ? "#aaa" : "white",
          cursor: current === items.length - 1 ? "default" : "pointer",
          WebkitTapHighlightColor: "transparent",
        }}>Next →</button>
      </div>
    </div>
  );
}

// ─── Quiz Mode ────────────────────────────────────────────────────────────────
function QuizMode({ lesson, onFinish }: { lesson: typeof tutoringLessons[0]; onFinish: (score: number, total: number) => void }) {
  const [questions] = useState<QuizQuestion[]>(() => {
    const items = shuffle(lesson.items).slice(0, Math.min(10, lesson.items.length));
    return items.map(item => {
      const wrong = shuffle(lesson.items.filter(i => i.english !== item.english)).slice(0, 3).map(i => i.english);
      return { item, choices: shuffle([item.english, ...wrong]), correct: item.english };
    });
  });
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const q = questions[qi];

  const pick = (choice: string) => {
    if (selected) return;
    setSelected(choice);
    const correct = choice === q.correct;
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (qi + 1 >= questions.length) onFinish(score + (correct ? 1 : 0), questions.length);
      else { setQi(i => i + 1); setSelected(null); }
    }, 900);
  };

  return (
    <div style={{ maxWidth: 540, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "clamp(13px,3.5vw,15px)", color: "#666", marginBottom: 8 }}>
        <span>Q {qi + 1} / {questions.length}</span>
        <span style={{ color: lesson.color, fontWeight: 700 }}>Score: {score}</span>
      </div>
      <div style={{ height: 6, background: "#eee", borderRadius: 3, marginBottom: 24, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(qi / questions.length) * 100}%`, background: lesson.color, transition: "width 0.3s", borderRadius: 3 }} />
      </div>

      <div style={{ textAlign: "center", marginBottom: 24, padding: "20px 16px", background: "var(--navy)", borderRadius: 20 }}>
        <div style={{ fontSize: "clamp(11px,2.5vw,13px)", color: "rgba(255,255,255,0.5)", marginBottom: 10, letterSpacing: 1 }}>WHAT DOES THIS MEAN?</div>
        <div className="arabic" style={{ fontSize: "clamp(44px, 12vw, 56px)", color: "white", fontWeight: 700, marginBottom: 6, lineHeight: 1.5 }}>{q.item.arabic}</div>
        <div style={{ fontSize: "clamp(14px,4vw,17px)", color: "rgba(255,255,255,0.65)", fontStyle: "italic", marginBottom: 12 }}>{q.item.transliteration}</div>
        <SpeakButton text={q.item.arabic} size="md" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.choices.map((choice, ci) => {
          const isCorrect = choice === q.correct;
          const isSelected = selected === choice;
          let bg = "white", border = "#ddd", color = "var(--navy)";
          if (selected) {
            if (isCorrect) { bg = "#D1FAE5"; border = "#10B981"; color = "#065F46"; }
            else if (isSelected) { bg = "#FEE2E2"; border = "#EF4444"; color = "#991B1B"; }
          }
          return (
            <button key={ci} onClick={() => pick(choice)} style={{
              padding: "clamp(14px, 4vw, 18px) 16px", borderRadius: 14, border: `2px solid ${border}`,
              background: bg, color, fontWeight: 700, fontSize: "clamp(15px, 4vw, 17px)",
              cursor: selected ? "default" : "pointer", textAlign: "left", transition: "all 0.15s",
              WebkitTapHighlightColor: "transparent", lineHeight: 1.4,
            }}>
              {isSelected && isCorrect && "✅ "}
              {isSelected && !isCorrect && "❌ "}
              {!isSelected && selected && isCorrect && "✅ "}
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Match Mode ───────────────────────────────────────────────────────────────
function MatchMode({ lesson, onFinish }: { lesson: typeof tutoringLessons[0]; onFinish: () => void }) {
  const COUNT = Math.min(6, lesson.items.length);
  const [items] = useState(() => shuffle(lesson.items).slice(0, COUNT));
  const [leftSel, setLeftSel] = useState<number | null>(null);
  const [rightSel, setRightSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<{ l: number; r: number } | null>(null);
  const [rightOrder] = useState(() => shuffle(items.map((_, i) => i)));

  useEffect(() => {
    if (leftSel === null || rightSel === null) return;
    if (leftSel === rightOrder[rightSel]) {
      const next = new Set(matched); next.add(leftSel);
      setMatched(next); setLeftSel(null); setRightSel(null);
      if (next.size === COUNT) setTimeout(onFinish, 600);
    } else {
      setWrong({ l: leftSel, r: rightSel });
      setTimeout(() => { setWrong(null); setLeftSel(null); setRightSel(null); }, 700);
    }
  }, [leftSel, rightSel]);

  return (
    <div>
      <p style={{ textAlign: "center", fontSize: "clamp(13px,3.5vw,15px)", color: "#666", marginBottom: 16 }}>
        Tap Arabic → tap matching English
      </p>
      {/* Matched count */}
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: lesson.color, fontWeight: 700 }}>{matched.size} / {COUNT} matched</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(6px,2vw,12px)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px,2vw,10px)" }}>
          {items.map((item, i) => {
            const isDone = matched.has(i);
            const isSel = leftSel === i;
            const isWrong = wrong?.l === i;
            return (
              <div
                key={i}
                role="button"
                tabIndex={isDone ? -1 : 0}
                onClick={(e) => {
                  if (isDone) return;
                  if ((e.target as HTMLElement).closest("button")) return;
                  setLeftSel(i);
                }}
                onKeyDown={(e) => {
                  if (isDone) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLeftSel(i);
                  }
                }}
                style={{
                  padding: "clamp(12px,3.5vw,16px) 8px", borderRadius: 12, textAlign: "center",
                  border: `2px solid ${isDone ? "#10B981" : isWrong ? "#EF4444" : isSel ? lesson.color : "#ddd"}`,
                  background: isDone ? "#D1FAE5" : isWrong ? "#FEE2E2" : isSel ? `${lesson.color}20` : "white",
                  cursor: isDone ? "default" : "pointer", transition: "all 0.15s", opacity: isDone ? 0.55 : 1,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <div className="arabic" style={{ fontSize: "clamp(22px, 6vw, 30px)", fontWeight: 700, color: isDone ? "#065F46" : "var(--navy)", lineHeight: 1.5 }}>{item.arabic}</div>
                  <SpeakButton text={item.arabic} size="sm" />
                </div>
                <div style={{ fontSize: "clamp(10px,2.5vw,12px)", color: "#888", fontStyle: "italic", marginTop: 2 }}>{item.transliteration}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px,2vw,10px)" }}>
          {rightOrder.map((itemIdx, ri) => {
            const item = items[itemIdx];
            const isDone = matched.has(itemIdx);
            const isSel = rightSel === ri;
            const isWrong = wrong?.r === ri;
            return (
              <button key={ri} onClick={() => !isDone && setRightSel(ri)} disabled={isDone} style={{
                padding: "clamp(12px,3.5vw,16px) 8px", borderRadius: 12, textAlign: "center",
                border: `2px solid ${isDone ? "#10B981" : isWrong ? "#EF4444" : isSel ? lesson.color : "#ddd"}`,
                background: isDone ? "#D1FAE5" : isWrong ? "#FEE2E2" : isSel ? `${lesson.color}20` : "white",
                cursor: isDone ? "default" : "pointer", transition: "all 0.15s", opacity: isDone ? 0.55 : 1,
                fontWeight: 700, fontSize: "clamp(13px,3.5vw,15px)", color: isDone ? "#065F46" : "var(--navy)",
                lineHeight: 1.4, WebkitTapHighlightColor: "transparent",
              }}>
                {item.english}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function LessonContent() {
  const params = useSearchParams();
  const id = params.get("id") || "";
  const lesson = tutoringLessons.find(l => l.id === id);
  const [mode, setMode] = useState<Mode>("menu");
  const [mastered, setMastered] = useState<Set<number>>(() => loadProgress(id));
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);
  const [matchDone, setMatchDone] = useState(false);

  const toggleMaster = useCallback((i: number) => {
    setMastered(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      saveProgress(id, next);
      return next;
    });
  }, [id]);

  const resetMode = () => { setMode("menu"); setQuizResult(null); setMatchDone(false); };

  if (!lesson) return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div style={{ fontSize: 48 }}>❓</div>
      <Link href="/tutoring" style={{ color: "var(--gold)" }}>← Back to Tutoring</Link>
    </div>
  );

  const pct = Math.round((mastered.size / lesson.items.length) * 100);

  return (
    <div className="fade-in">
      {/* Back link */}
      {mode !== "menu" ? (
        <button onClick={resetMode} style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: "clamp(14px,4vw,16px)", marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 6, padding: 0, WebkitTapHighlightColor: "transparent" }}>
          ← Lesson Menu
        </button>
      ) : (
        <Link href="/tutoring" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#555", fontSize: "clamp(14px,4vw,16px)", textDecoration: "none", marginBottom: 16 }}>
          ← All Lessons
        </Link>
      )}

      {/* Header */}
      <div style={{ padding: "clamp(18px,5vw,24px)", borderRadius: 20, background: "var(--navy)", color: "white", marginBottom: 16, borderLeft: `6px solid ${lesson.color}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "clamp(28px,8vw,38px)", marginBottom: 4 }}>{lesson.emoji}</div>
            <h1 style={{ fontSize: "clamp(17px,5vw,24px)", fontWeight: 800, margin: "0 0 3px", lineHeight: 1.2 }}>{lesson.title}</h1>
            <p style={{ fontSize: "clamp(12px,3vw,14px)", color: "rgba(255,255,255,0.65)", margin: 0 }}>{lesson.items.length} items</p>
          </div>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontSize: "clamp(22px,6vw,28px)", fontWeight: 800, color: pct === 100 ? "#34D399" : "var(--gold-light)" }}>{pct}%</div>
            <div style={{ fontSize: "clamp(10px,2.5vw,12px)", color: "rgba(255,255,255,0.55)" }}>mastered</div>
            <div style={{ width: 64, height: 5, background: "rgba(255,255,255,0.2)", borderRadius: 3, marginTop: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#34D399" : "var(--gold)", borderRadius: 3, transition: "width 0.4s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Key Rules */}
      {mode === "menu" && lesson.rules && lesson.rules.length > 0 && (
        <div style={{ padding: "14px 16px", borderRadius: 14, background: `${lesson.color}10`, border: `2px solid ${lesson.color}30`, marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: "clamp(13px,3.5vw,15px)", color: lesson.color, marginBottom: 8 }}>📌 Key Rules</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            {lesson.rules.map((r, i) => <li key={i} style={{ fontSize: "clamp(13px,3.5vw,15px)", color: "#333", lineHeight: 1.6 }}>{r}</li>)}
          </ul>
        </div>
      )}

      {/* MODE: Menu */}
      {mode === "menu" && (
        <div>
          <div style={{ fontWeight: 800, fontSize: "clamp(14px,4vw,16px)", color: "var(--navy)", marginBottom: 10 }}>Choose a study mode:</div>
          {/* 2-col grid on mobile, 4-col on desktop */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(8px,2.5vw,14px)" }}>
            {[
              { key: "study", emoji: "📋", title: "Study List",  desc: "Read all items with audio",       color: "#2563EB" },
              { key: "cards", emoji: "🃏", title: "Flip Cards",  desc: "Tap to flip · swipe to skip",    color: lesson.color },
              { key: "quiz",  emoji: "🎯", title: "Quiz",        desc: "Multiple choice questions",       color: "#059669" },
              { key: "match", emoji: "🔗", title: "Match",       desc: "Tap Arabic ↔ English pairs",     color: "#7C3AED" },
            ].map(m => (
              <button key={m.key} onClick={() => setMode(m.key as Mode)} style={{
                padding: "clamp(16px,4vw,22px) clamp(12px,3vw,16px)", borderRadius: 16, background: "white",
                border: `2px solid ${m.color}33`, borderLeft: `5px solid ${m.color}`,
                cursor: "pointer", textAlign: "left", transition: "box-shadow 0.15s",
                WebkitTapHighlightColor: "transparent",
              }}>
                <div style={{ fontSize: "clamp(24px,6vw,30px)", marginBottom: 6 }}>{m.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: "clamp(15px,4vw,17px)", color: "var(--navy)", marginBottom: 3 }}>{m.title}</div>
                <div style={{ fontSize: "clamp(12px,3vw,14px)", color: "#666", lineHeight: 1.4 }}>{m.desc}</div>
              </button>
            ))}
          </div>

          {/* Best order tip */}
          <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 14, background: "#FEF3C7", border: "2px solid #F59E0B" }}>
            <div style={{ fontWeight: 800, fontSize: "clamp(13px,3.5vw,14px)", color: "#92400E", marginBottom: 6 }}>⚡ Best Study Order</div>
            <div style={{ fontSize: "clamp(12px,3.5vw,14px)", color: "#78350F", lineHeight: 1.8 }}>
              1️⃣ <strong>Study List</strong> → 2️⃣ <strong>Flip Cards</strong> → 3️⃣ <strong>Quiz</strong> → 4️⃣ <strong>Match</strong>
            </div>
          </div>

          {/* Prev/next lesson */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 10 }}>
            {(() => {
              const idx = tutoringLessons.findIndex(l => l.id === id);
              const prev = tutoringLessons[idx - 1];
              const next = tutoringLessons[idx + 1];
              return (
                <>
                  {prev
                    ? <Link href={`/tutoring/lesson?id=${prev.id}`} style={{ flex: 1, padding: "12px 10px", borderRadius: 12, background: "white", border: "2px solid #ddd", textDecoration: "none", color: "var(--navy)", fontWeight: 700, fontSize: "clamp(12px,3vw,14px)", textAlign: "center" }}>← {prev.emoji}<br/><span style={{ fontSize: "clamp(10px,2.5vw,12px)", color: "#888" }}>{prev.title}</span></Link>
                    : <div />}
                  {next
                    ? <Link href={`/tutoring/lesson?id=${next.id}`} style={{ flex: 1, padding: "12px 10px", borderRadius: 12, background: lesson.color, textDecoration: "none", color: "white", fontWeight: 700, fontSize: "clamp(12px,3vw,14px)", textAlign: "center" }}>{next.emoji} →<br/><span style={{ fontSize: "clamp(10px,2.5vw,12px)", color: "rgba(255,255,255,0.8)" }}>{next.title}</span></Link>
                    : <div />}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {mode === "study" && <StudyList lesson={lesson} mastered={mastered} onMaster={toggleMaster} />}
      {mode === "cards" && <FlipCards lesson={lesson} mastered={mastered} onMaster={toggleMaster} />}

      {mode === "quiz" && !quizResult && <QuizMode lesson={lesson} onFinish={(s, t) => setQuizResult({ score: s, total: t })} />}
      {mode === "quiz" && quizResult && (
        <div style={{ textAlign: "center", padding: "clamp(24px,8vw,48px) 16px" }}>
          <div style={{ fontSize: "clamp(52px,15vw,72px)", marginBottom: 12 }}>{quizResult.score >= quizResult.total * 0.8 ? "🎉" : quizResult.score >= quizResult.total * 0.5 ? "👍" : "📚"}</div>
          <div style={{ fontSize: "clamp(26px,8vw,34px)", fontWeight: 800, color: "var(--navy)", marginBottom: 6 }}>{quizResult.score} / {quizResult.total}</div>
          <div style={{ fontSize: "clamp(15px,4vw,18px)", color: "#555", marginBottom: 28 }}>
            {quizResult.score >= quizResult.total * 0.8 ? "Excellent work!" : quizResult.score >= quizResult.total * 0.5 ? "Good — keep going!" : "Review the list, then try again."}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setQuizResult(null)} style={{ padding: "clamp(12px,4vw,14px) clamp(20px,6vw,28px)", borderRadius: 12, background: lesson.color, color: "white", fontWeight: 800, fontSize: "clamp(15px,4vw,17px)", border: "none", cursor: "pointer" }}>🔄 Try Again</button>
            <button onClick={resetMode} style={{ padding: "clamp(12px,4vw,14px) clamp(20px,6vw,28px)", borderRadius: 12, background: "white", color: "var(--navy)", fontWeight: 800, fontSize: "clamp(15px,4vw,17px)", border: "2px solid #ddd", cursor: "pointer" }}>← Back</button>
          </div>
        </div>
      )}

      {mode === "match" && !matchDone && <MatchMode lesson={lesson} onFinish={() => setMatchDone(true)} />}
      {mode === "match" && matchDone && (
        <div style={{ textAlign: "center", padding: "clamp(24px,8vw,48px) 16px" }}>
          <div style={{ fontSize: "clamp(52px,15vw,72px)", marginBottom: 12 }}>🎯</div>
          <div style={{ fontSize: "clamp(22px,6vw,28px)", fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>All matched!</div>
          <div style={{ fontSize: "clamp(14px,4vw,17px)", color: "#555", marginBottom: 28 }}>Great work — your brain is building connections!</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setMatchDone(false)} style={{ padding: "clamp(12px,4vw,14px) clamp(20px,6vw,28px)", borderRadius: 12, background: lesson.color, color: "white", fontWeight: 800, fontSize: "clamp(15px,4vw,17px)", border: "none", cursor: "pointer" }}>🔄 Play Again</button>
            <button onClick={resetMode} style={{ padding: "clamp(12px,4vw,14px) clamp(20px,6vw,28px)", borderRadius: 12, background: "white", color: "var(--navy)", fontWeight: 800, fontSize: "clamp(15px,4vw,17px)", border: "2px solid #ddd", cursor: "pointer" }}>← Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: 40 }}>Loading...</div>}>
      <LessonContent />
    </Suspense>
  );
}
