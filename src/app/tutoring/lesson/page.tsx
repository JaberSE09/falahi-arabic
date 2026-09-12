"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { tutoringLessons, type TutoringItem } from "@/lib/tutoring";
import SpeakButton from "@/components/SpeakButton";

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode = "menu" | "study" | "cards" | "quiz" | "match";

interface QuizQuestion {
  item: TutoringItem;
  choices: string[];
  correct: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getStorageKey(lessonId: string) {
  return `falahi_tutor_progress_${lessonId}`;
}

function loadProgress(lessonId: string): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(getStorageKey(lessonId));
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
  } catch { return new Set(); }
}

function saveProgress(lessonId: string, mastered: Set<number>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getStorageKey(lessonId), JSON.stringify([...mastered]));
}

// ─── Study List ───────────────────────────────────────────────────────────────
function StudyList({ lesson, mastered, onMaster }: {
  lesson: typeof tutoringLessons[0];
  mastered: Set<number>;
  onMaster: (i: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {lesson.items.map((item, i) => (
        <div key={i} style={{
          padding: "16px 18px", borderRadius: 14, background: "white",
          border: `2px solid ${mastered.has(i) ? lesson.color : "#e8e0d0"}`,
          display: "flex", alignItems: "center", gap: 14,
          transition: "border-color 0.2s",
        }}>
          <button onClick={() => onMaster(i)} style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            background: mastered.has(i) ? lesson.color : "white",
            border: `2px solid ${mastered.has(i) ? lesson.color : "#ccc"}`,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
          }}>
            {mastered.has(i) && <svg width={14} height={14} viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="arabic" style={{ fontSize: 30, color: "var(--navy)", fontWeight: 700, marginBottom: 2 }}>
              {item.arabic}
            </div>
            <div style={{ fontSize: 13, color: "#888", fontStyle: "italic", marginBottom: 2 }}>
              {item.transliteration}
            </div>
            <div style={{ fontSize: 15, color: "#333", fontWeight: 600 }}>
              {item.english}
            </div>
            {item.note && (
              <div style={{ fontSize: 13, color: "#666", marginTop: 5, padding: "4px 10px", background: "#f5f5f5", borderRadius: 8 }}>
                💡 {item.note}
              </div>
            )}
          </div>
          <SpeakButton text={item.arabic} size="md" />
        </div>
      ))}
    </div>
  );
}

// ─── Flip Cards ───────────────────────────────────────────────────────────────
function FlipCards({ lesson, mastered, onMaster }: {
  lesson: typeof tutoringLessons[0];
  mastered: Set<number>;
  onMaster: (i: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const items = lesson.items;
  const item = items[current];

  const next = () => { setFlipped(false); setTimeout(() => setCurrent(c => Math.min(c + 1, items.length - 1)), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setCurrent(c => Math.max(c - 1, 0)), 150); };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      {/* Progress bar */}
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666", marginBottom: 6 }}>
          <span>Card {current + 1} of {items.length}</span>
          <span style={{ color: lesson.color, fontWeight: 700 }}>{mastered.size} mastered</span>
        </div>
        <div style={{ height: 6, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((current + 1) / items.length) * 100}%`, background: lesson.color, transition: "width 0.3s", borderRadius: 3 }} />
        </div>
      </div>

      {/* Card */}
      <div onClick={() => setFlipped(f => !f)} style={{
        width: "100%", maxWidth: 480, minHeight: 220, borderRadius: 24,
        cursor: "pointer", userSelect: "none", position: "relative",
        background: flipped ? "white" : "var(--navy)",
        border: `3px solid ${flipped ? lesson.color : "transparent"}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "32px 28px", textAlign: "center", transition: "background 0.25s, border-color 0.25s",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
      }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 12, letterSpacing: 1 }}>TAP CARD TO REVEAL</div>
            <div className="arabic" style={{ fontSize: 48, color: "white", fontWeight: 700, marginBottom: 10 }}>{item.arabic}</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", fontStyle: "italic", marginBottom: 14 }}>{item.transliteration}</div>
            <div onClick={e => e.stopPropagation()}>
              <SpeakButton text={item.arabic} size="lg" />
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 12, color: lesson.color, marginBottom: 12, letterSpacing: 1, fontWeight: 700 }}>ENGLISH</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>{item.english}</div>
            <div className="arabic" style={{ fontSize: 30, color: "#555", fontWeight: 700, marginBottom: 4 }}>{item.arabic}</div>
            <div style={{ fontSize: 14, color: "#888", fontStyle: "italic", marginBottom: item.note ? 10 : 14 }}>{item.transliteration}</div>
            {item.note && <div style={{ fontSize: 13, color: "#666", background: "#f5f5f5", padding: "6px 12px", borderRadius: 8, marginBottom: 14 }}>💡 {item.note}</div>}
            <div onClick={e => e.stopPropagation()}>
              <SpeakButton text={item.arabic} size="lg" />
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={prev} disabled={current === 0} style={{
          padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 15,
          background: current === 0 ? "#f0f0f0" : "white", border: "2px solid #ddd",
          color: current === 0 ? "#aaa" : "var(--navy)", cursor: current === 0 ? "default" : "pointer",
        }}>← Prev</button>

        <button onClick={() => onMaster(current)} style={{
          padding: "10px 18px", borderRadius: 10, fontWeight: 700, fontSize: 14,
          background: mastered.has(current) ? lesson.color : "white",
          border: `2px solid ${mastered.has(current) ? lesson.color : "#ddd"}`,
          color: mastered.has(current) ? "white" : "#555", cursor: "pointer", transition: "all 0.15s",
        }}>
          {mastered.has(current) ? "✓ Mastered" : "Mark Mastered"}
        </button>

        <button onClick={next} disabled={current === items.length - 1} style={{
          padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 15,
          background: current === items.length - 1 ? "#f0f0f0" : lesson.color,
          border: `2px solid ${current === items.length - 1 ? "#ddd" : lesson.color}`,
          color: current === items.length - 1 ? "#aaa" : "white",
          cursor: current === items.length - 1 ? "default" : "pointer",
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
  const [done, setDone] = useState(false);

  const q = questions[qi];

  const pick = (choice: string) => {
    if (selected) return;
    setSelected(choice);
    if (choice === q.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (qi + 1 >= questions.length) { setDone(true); onFinish(score + (choice === q.correct ? 1 : 0), questions.length); }
      else { setQi(i => i + 1); setSelected(null); }
    }, 900);
  };

  if (done) return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{score >= questions.length * 0.8 ? "🎉" : score >= questions.length * 0.5 ? "👍" : "📚"}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>
        {score} / {questions.length}
      </div>
      <div style={{ fontSize: 18, color: "#555", marginBottom: 24 }}>
        {score >= questions.length * 0.8 ? "Excellent! You've got this." : score >= questions.length * 0.5 ? "Good — keep practising!" : "Review the study list, then try again."}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 520, margin: "0 auto" }}>
      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#666", marginBottom: 8 }}>
        <span>Question {qi + 1} / {questions.length}</span>
        <span style={{ color: lesson.color, fontWeight: 700 }}>Score: {score}</span>
      </div>
      <div style={{ height: 6, background: "#eee", borderRadius: 3, marginBottom: 28, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${((qi) / questions.length) * 100}%`, background: lesson.color, transition: "width 0.3s", borderRadius: 3 }} />
      </div>

      {/* Question */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 10, letterSpacing: 1 }}>WHAT DOES THIS MEAN?</div>
        <div className="arabic" style={{ fontSize: 52, color: "var(--navy)", fontWeight: 700, marginBottom: 6 }}>{q.item.arabic}</div>
        <div style={{ fontSize: 16, color: "#888", fontStyle: "italic" }}>{q.item.transliteration}</div>
        <div style={{ marginTop: 10 }}><SpeakButton text={q.item.arabic} size="md" /></div>
      </div>

      {/* Choices */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.choices.map((choice, ci) => {
          const isCorrect = choice === q.correct;
          const isSelected = selected === choice;
          let bg = "white"; let border = "#ddd"; let color = "var(--navy)";
          if (selected) {
            if (isCorrect) { bg = "#D1FAE5"; border = "#10B981"; color = "#065F46"; }
            else if (isSelected) { bg = "#FEE2E2"; border = "#EF4444"; color = "#991B1B"; }
          }
          return (
            <button key={ci} onClick={() => pick(choice)} style={{
              padding: "16px 20px", borderRadius: 12, border: `2px solid ${border}`,
              background: bg, color, fontWeight: 700, fontSize: 16, cursor: selected ? "default" : "pointer",
              textAlign: "left", transition: "all 0.15s",
            }}>
              {isSelected && selected === q.correct && "✅ "}
              {isSelected && selected !== q.correct && "❌ "}
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
      <p style={{ textAlign: "center", fontSize: 14, color: "#666", marginBottom: 20 }}>
        Tap an Arabic word, then tap its English match
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {/* Left — Arabic */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item, i) => {
            const isDone = matched.has(i);
            const isSel = leftSel === i;
            const isWrong = wrong?.l === i;
            return (
              <button key={i} onClick={() => !isDone && setLeftSel(i)} disabled={isDone} style={{
                padding: "14px 12px", borderRadius: 12, textAlign: "center",
                border: `2px solid ${isDone ? "#10B981" : isWrong ? "#EF4444" : isSel ? lesson.color : "#ddd"}`,
                background: isDone ? "#D1FAE5" : isWrong ? "#FEE2E2" : isSel ? `${lesson.color}15` : "white",
                cursor: isDone ? "default" : "pointer", transition: "all 0.15s", opacity: isDone ? 0.6 : 1,
              }}>
                <div className="arabic" style={{ fontSize: 28, fontWeight: 700, color: isDone ? "#065F46" : "var(--navy)" }}>{item.arabic}</div>
                <div style={{ fontSize: 12, color: "#888", fontStyle: "italic", marginTop: 2 }}>{item.transliteration}</div>
              </button>
            );
          })}
        </div>
        {/* Right — English (shuffled) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rightOrder.map((itemIdx, ri) => {
            const item = items[itemIdx];
            const isDone = matched.has(itemIdx);
            const isSel = rightSel === ri;
            const isWrong = wrong?.r === ri;
            return (
              <button key={ri} onClick={() => !isDone && setRightSel(ri)} disabled={isDone} style={{
                padding: "14px 12px", borderRadius: 12, textAlign: "center",
                border: `2px solid ${isDone ? "#10B981" : isWrong ? "#EF4444" : isSel ? lesson.color : "#ddd"}`,
                background: isDone ? "#D1FAE5" : isWrong ? "#FEE2E2" : isSel ? `${lesson.color}15` : "white",
                cursor: isDone ? "default" : "pointer", transition: "all 0.15s", opacity: isDone ? 0.6 : 1,
                fontWeight: 700, fontSize: 15, color: isDone ? "#065F46" : "var(--navy)",
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

// ─── Main Lesson Page ─────────────────────────────────────────────────────────
function LessonContent() {
  const params = useSearchParams();
  const id = params.get("id") || "";
  const lesson = tutoringLessons.find((l) => l.id === id);
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
      <p>Lesson not found.</p>
      <Link href="/tutoring" style={{ color: "var(--gold)" }}>← Back to Tutoring</Link>
    </div>
  );

  const pct = Math.round((mastered.size / lesson.items.length) * 100);

  return (
    <div className="fade-in">
      {/* Back */}
      {mode !== "menu" ? (
        <button onClick={resetMode} style={{ background: "none", border: "none", cursor: "pointer", color: "#666", fontSize: 15, marginBottom: 18, display: "inline-flex", alignItems: "center", gap: 6, padding: 0 }}>
          ← Back to lesson menu
        </button>
      ) : (
        <Link href="/tutoring" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#666", fontSize: 15, textDecoration: "none", marginBottom: 18 }}>
          ← Back to Tutoring
        </Link>
      )}

      {/* Header */}
      <div style={{ padding: "24px 22px", borderRadius: 20, background: "var(--navy)", color: "white", marginBottom: 20, borderLeft: `6px solid ${lesson.color}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 36, marginBottom: 4 }}>{lesson.emoji}</div>
            <h1 style={{ fontSize: "clamp(18px,4vw,26px)", fontWeight: 800, margin: "0 0 4px" }}>{lesson.title}</h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0 }}>{lesson.items.length} items</p>
          </div>
          {/* Mastery ring */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: pct === 100 ? "#34D399" : "var(--gold-light)" }}>{pct}%</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>mastered</div>
            <div style={{ width: 80, height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 3, marginTop: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#34D399" : "var(--gold)", borderRadius: 3, transition: "width 0.4s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Key Rules (always visible on menu) */}
      {mode === "menu" && lesson.rules && lesson.rules.length > 0 && (
        <div style={{ padding: "16px 18px", borderRadius: 14, background: `${lesson.color}10`, border: `2px solid ${lesson.color}30`, marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: lesson.color, marginBottom: 10 }}>📌 Key Rules — Read First</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            {lesson.rules.map((r, i) => <li key={i} style={{ fontSize: 14, color: "#333", lineHeight: 1.6 }}>{r}</li>)}
          </ul>
        </div>
      )}

      {/* MODE: Menu */}
      {mode === "menu" && (
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: "var(--navy)", marginBottom: 12 }}>Choose a study mode:</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {[
              { key: "study",  emoji: "📋", title: "Study List",  desc: "Read all items with audio. Mark ones you know.", color: "#2563EB" },
              { key: "cards",  emoji: "🃏", title: "Flip Cards",   desc: "Arabic on front — tap to reveal English + audio.", color: lesson.color },
              { key: "quiz",   emoji: "🎯", title: "Quiz",         desc: "Multiple choice — pick the correct English meaning.", color: "#059669" },
              { key: "match",  emoji: "🔗", title: "Match",        desc: "Tap pairs of Arabic ↔ English to match them.", color: "#7C3AED" },
            ].map(m => (
              <button key={m.key} onClick={() => setMode(m.key as Mode)} style={{
                padding: "20px 18px", borderRadius: 16, background: "white",
                border: `2px solid ${m.color}33`, borderLeft: `5px solid ${m.color}`,
                cursor: "pointer", textAlign: "left", transition: "box-shadow 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 4px 16px ${m.color}33`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 17, color: "var(--navy)", marginBottom: 4 }}>{m.title}</div>
                <div style={{ fontSize: 14, color: "#666", lineHeight: 1.5 }}>{m.desc}</div>
              </button>
            ))}
          </div>

          {/* Best order tip */}
          <div style={{ marginTop: 20, padding: "14px 18px", borderRadius: 14, background: "#FEF3C7", border: "2px solid #F59E0B" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#92400E", marginBottom: 6 }}>⚡ Best Study Order</div>
            <div style={{ fontSize: 14, color: "#78350F", lineHeight: 1.7 }}>
              1️⃣ Read <strong>Study List</strong> first — hear every word<br/>
              2️⃣ Do <strong>Flip Cards</strong> — test recall one by one<br/>
              3️⃣ Take the <strong>Quiz</strong> — multiple choice pressure<br/>
              4️⃣ Play <strong>Match</strong> — fastest way to cement memory
            </div>
          </div>

          {/* Next/prev lesson nav */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12 }}>
            {(() => {
              const idx = tutoringLessons.findIndex(l => l.id === id);
              const prev = tutoringLessons[idx - 1];
              const next = tutoringLessons[idx + 1];
              return (
                <>
                  {prev ? <Link href={`/tutoring/lesson?id=${prev.id}`} style={{ padding: "11px 18px", borderRadius: 12, background: "white", border: "2px solid #ddd", textDecoration: "none", color: "var(--navy)", fontWeight: 700, fontSize: 14 }}>← {prev.emoji} {prev.title}</Link> : <div />}
                  {next && <Link href={`/tutoring/lesson?id=${next.id}`} style={{ padding: "11px 18px", borderRadius: 12, background: lesson.color, textDecoration: "none", color: "white", fontWeight: 700, fontSize: 14 }}>{next.emoji} {next.title} →</Link>}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* MODE: Study List */}
      {mode === "study" && <StudyList lesson={lesson} mastered={mastered} onMaster={toggleMaster} />}

      {/* MODE: Flip Cards */}
      {mode === "cards" && <FlipCards lesson={lesson} mastered={mastered} onMaster={toggleMaster} />}

      {/* MODE: Quiz */}
      {mode === "quiz" && !quizResult && (
        <QuizMode lesson={lesson} onFinish={(score, total) => setQuizResult({ score, total })} />
      )}
      {mode === "quiz" && quizResult && (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{quizResult.score >= quizResult.total * 0.8 ? "🎉" : quizResult.score >= quizResult.total * 0.5 ? "👍" : "📚"}</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "var(--navy)", marginBottom: 6 }}>{quizResult.score} / {quizResult.total}</div>
          <div style={{ fontSize: 17, color: "#555", marginBottom: 24 }}>
            {quizResult.score >= quizResult.total * 0.8 ? "Excellent work!" : quizResult.score >= quizResult.total * 0.5 ? "Good — keep going!" : "Review the list, then try again."}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => { setQuizResult(null); }} style={{ padding: "12px 24px", borderRadius: 12, background: lesson.color, color: "white", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer" }}>🔄 Try Again</button>
            <button onClick={resetMode} style={{ padding: "12px 24px", borderRadius: 12, background: "white", color: "var(--navy)", fontWeight: 800, fontSize: 16, border: "2px solid #ddd", cursor: "pointer" }}>← Back</button>
          </div>
        </div>
      )}

      {/* MODE: Match */}
      {mode === "match" && !matchDone && (
        <MatchMode lesson={lesson} onFinish={() => setMatchDone(true)} />
      )}
      {mode === "match" && matchDone && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🎯</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>All matched!</div>
          <div style={{ fontSize: 17, color: "#555", marginBottom: 24 }}>Great pattern recognition — your brain is building connections!</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setMatchDone(false)} style={{ padding: "12px 24px", borderRadius: 12, background: lesson.color, color: "white", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer" }}>🔄 Play Again</button>
            <button onClick={resetMode} style={{ padding: "12px 24px", borderRadius: 12, background: "white", color: "var(--navy)", fontWeight: 800, fontSize: 16, border: "2px solid #ddd", cursor: "pointer" }}>← Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: 40, fontSize: 18 }}>Loading...</div>}>
      <LessonContent />
    </Suspense>
  );
}
