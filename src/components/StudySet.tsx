"use client";
import { useState, useCallback } from "react";
import SpeakButton from "./SpeakButton";

export interface StudyCard {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  subtitle?: string;   // surah+ayah, hadith source, dua timing, etc.
  badge?: string;      // topic tag
  note?: string;
}

type Mode = "flashcard" | "learn" | "match";

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

// ─── Flashcard mode ──────────────────────────────────────────────────────────
function FlashcardMode({ cards }: { cards: StudyCard[] }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[idx];

  const next = () => { setFlipped(false); setTimeout(() => setIdx(i => Math.min(i+1, cards.length-1)), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setIdx(i => Math.max(i-1, 0)), 150); };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* progress bar */}
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full" style={{ background: "#e8e0d0" }}>
          <div className="h-2 rounded-full transition-all" style={{ width: `${((idx+1)/cards.length)*100}%`, background: "var(--gold)" }} />
        </div>
        <span className="text-sm font-medium" style={{ color: "var(--navy)" }}>{idx+1}/{cards.length}</span>
      </div>

      {/* card */}
      <div className="w-full cursor-pointer" style={{ maxWidth: 560, height: 340, perspective: "1000px" }} onClick={() => setFlipped(f => !f)}>
        <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.55s", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
          {/* front */}
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 20, background: "var(--navy)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
            {card.badge && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "var(--gold)", marginBottom: 12 }}>{card.badge.toUpperCase()}</span>}
            <div className="arabic" style={{ fontSize: 36, lineHeight: 1.6, color: "var(--gold-light)", marginBottom: 16, maxWidth: 460 }}>{card.arabic}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <SpeakButton text={card.arabic} size="md" />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>tap to reveal</span>
            </div>
          </div>
          {/* back */}
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 20, background: "var(--gold)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{card.english}</div>
            <div style={{ fontSize: 14, fontStyle: "italic", color: "var(--navy-light)", marginBottom: 10 }}>{card.transliteration}</div>
            {card.subtitle && <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", marginBottom: 8 }}>{card.subtitle}</div>}
            {card.note && <div style={{ fontSize: 12, padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.4)", color: "var(--navy)" }}>💡 {card.note}</div>}
            <div style={{ marginTop: 10 }}>
              <SpeakButton text={card.arabic} size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={prev} disabled={idx===0} style={{ padding: "10px 26px", borderRadius: 10, fontWeight: 600, background: idx===0?"#e8e0d0":"white", color: idx===0?"#aaa":"var(--navy)", border: "2px solid var(--navy)", cursor: idx===0?"not-allowed":"pointer" }}>← Prev</button>
        <button onClick={() => { setFlipped(false); setIdx(shuffle(cards.map((_,i)=>i))[0]||0); }} style={{ padding: "10px 16px", borderRadius: 10, fontWeight: 600, background: "var(--navy)", color: "white", border: "none", cursor: "pointer" }}>🔀</button>
        <button onClick={next} disabled={idx===cards.length-1} style={{ padding: "10px 26px", borderRadius: 10, fontWeight: 600, background: idx===cards.length-1?"#e8e0d0":"var(--navy)", color: idx===cards.length-1?"#aaa":"white", border: "2px solid var(--navy)", cursor: idx===cards.length-1?"not-allowed":"pointer" }}>Next →</button>
      </div>
    </div>
  );
}

// ─── Learn mode (multiple choice) ────────────────────────────────────────────
function LearnMode({ cards }: { cards: StudyCard[] }) {
  const [questions] = useState(() => shuffle(cards).slice(0, Math.min(cards.length, 10)));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [direction, setDirection] = useState<"arToEn" | "enToAr">("arToEn");

  const correct = questions[idx];
  const options = shuffle([correct, ...shuffle(cards.filter(c=>c.id!==correct.id)).slice(0,3)]);

  const pick = (opt: StudyCard) => {
    if (selected !== null) return;
    setSelected(opt.id);
    if (opt.id === correct.id) setScore(s=>s+1);
    setTimeout(() => {
      if (idx+1 >= questions.length) setDone(true);
      else { setIdx(i=>i+1); setSelected(null); }
    }, 1300);
  };

  if (done) return (
    <div className="text-center py-12">
      <div className="text-5xl mb-3">🎉</div>
      <div className="text-3xl font-bold mb-1" style={{ color: "var(--navy)" }}>{score}/{questions.length}</div>
      <div style={{ color: "#666", marginBottom: 24 }}>
        {score===questions.length ? "Perfect! ماشاءالله 🌟" : score>=7 ? "Great work! 💪" : "Keep going! 📖"}
      </div>
      <button onClick={() => { setIdx(0); setSelected(null); setScore(0); setDone(false); }} style={{ padding: "12px 28px", borderRadius: 10, background: "var(--navy)", color: "white", fontWeight: 700, border: "none", cursor: "pointer" }}>Try Again</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 540, margin: "0 auto" }}>
      <div className="flex items-center justify-between mb-4">
        <div style={{ display: "flex", gap: 8 }}>
          {(["arToEn","enToAr"] as const).map(d => (
            <button key={d} onClick={()=>setDirection(d)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", background: direction===d?"var(--navy)":"white", color: direction===d?"white":"var(--navy)", border: "2px solid var(--navy)" }}>
              {d==="arToEn"?"🔤 AR→EN":"🔤 EN→AR"}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: "#888" }}>{idx+1}/{questions.length} · ✓{score}</span>
      </div>

      <div style={{ borderRadius: 20, background: "var(--navy)", padding: "32px 24px", textAlign: "center", marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        {direction==="arToEn" ? (
          <>
            <div className="arabic" style={{ fontSize: 34, color: "var(--gold-light)", lineHeight: 1.6, marginBottom: 12 }}>{correct.arabic}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <SpeakButton text={correct.arabic} size="md" />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>{correct.transliteration}</span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 22, fontWeight: 700, color: "white" }}>{correct.english}</div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {options.map(opt => {
          const isCorrect = opt.id===correct.id;
          const isSel = selected===opt.id;
          let bg = "white", color = "var(--navy)", border = "2px solid #ddd";
          if (selected!==null) {
            if (isCorrect) { bg="#2D7A4F"; color="white"; border="2px solid #2D7A4F"; }
            else if (isSel) { bg="#e85d75"; color="white"; border="2px solid #e85d75"; }
          }
          return (
            <button key={opt.id} onClick={()=>pick(opt)} style={{ padding: "16px 12px", borderRadius: 14, fontWeight: 600, fontSize: 14, background: bg, color, border, cursor: selected!==null?"default":"pointer", transition: "all 0.2s", textAlign: "center" }}>
              {direction==="arToEn" ? opt.english : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <SpeakButton text={opt.arabic} size="sm" />
                  <span className="arabic" style={{ fontSize: 22 }}>{opt.arabic}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Match mode (tap pairs) ───────────────────────────────────────────────────
function MatchMode({ cards }: { cards: StudyCard[] }) {
  const pool = shuffle(cards).slice(0, 6);
  const [leftItems] = useState(() => shuffle(pool));
  const [rightItems] = useState(() => shuffle(pool));
  const [selLeft, setSelLeft] = useState<number|null>(null);
  const [selRight, setSelRight] = useState<number|null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const done = matched.size === pool.length;

  const pickLeft = (id: number) => { if (matched.has(id)) return; setSelLeft(id); };
  const pickRight = (id: number) => {
    if (matched.has(id)) return;
    setSelRight(id);
    const left = selLeft;
    if (left !== null) {
      if (left === id) {
        setMatched(m => new Set([...m, id]));
        setSelLeft(null); setSelRight(null);
      } else {
        setWrong(new Set([left, id]));
        setTimeout(() => { setWrong(new Set()); setSelLeft(null); setSelRight(null); }, 700);
      }
    }
  };

  const btnStyle = (id: number, side: "left"|"right") => {
    const isSel = side==="left" ? selLeft===id : selRight===id;
    const isMatch = matched.has(id);
    const isWrong = wrong.has(id);
    return {
      padding: "14px 10px", borderRadius: 12, fontWeight: 600, fontSize: 13,
      cursor: isMatch?"default":"pointer", textAlign: "center" as const,
      border: isMatch ? "2px solid #2D7A4F" : isWrong ? "2px solid #e85d75" : isSel ? "2px solid var(--gold)" : "2px solid #ddd",
      background: isMatch ? "#2D7A4F" : isWrong ? "#fde8ec" : isSel ? "#fffbe6" : "white",
      color: isMatch ? "white" : isWrong ? "#e85d75" : "var(--navy)",
      opacity: isMatch ? 0.6 : 1,
      transition: "all 0.2s",
    };
  };

  return (
    <div>
      {done ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🎉</div>
          <div className="text-2xl font-bold mb-4" style={{ color: "var(--navy)" }}>All matched!</div>
          <button onClick={() => window.location.reload()} style={{ padding: "12px 28px", borderRadius: 10, background: "var(--navy)", color: "white", fontWeight: 700, border: "none", cursor: "pointer" }}>Play again</button>
        </div>
      ) : (
        <>
          <p style={{ textAlign: "center", color: "#888", fontSize: 13, marginBottom: 20 }}>Match each Arabic with its English — tap one from each side</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {leftItems.map(c => (
                <button key={c.id} onClick={() => pickLeft(c.id)} style={btnStyle(c.id, "left")}>
                  <div className="arabic" style={{ fontSize: 20, direction: "rtl" }}>{c.arabic}</div>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rightItems.map(c => (
                <button key={c.id} onClick={() => pickRight(c.id)} style={btnStyle(c.id, "right")}>
                  <div style={{ fontSize: 12 }}>{c.english}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main StudySet component ─────────────────────────────────────────────────
export default function StudySet({ cards, title }: { cards: StudyCard[]; title: string }) {
  const [mode, setMode] = useState<Mode>("flashcard");
  const modes: { key: Mode; label: string; icon: string }[] = [
    { key: "flashcard", label: "Flashcard", icon: "🃏" },
    { key: "learn",     label: "Learn",     icon: "🎯" },
    { key: "match",     label: "Match",     icon: "🔗" },
  ];

  return (
    <div>
      {/* mode tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, borderBottom: "2px solid #e8e0d0", paddingBottom: 12 }}>
        {modes.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)} style={{
            padding: "8px 18px", borderRadius: 10, fontWeight: 600, fontSize: 14,
            background: mode===m.key ? "var(--navy)" : "transparent",
            color: mode===m.key ? "white" : "#888",
            border: "none", cursor: "pointer",
            borderBottom: mode===m.key ? "3px solid var(--gold)" : "3px solid transparent",
            transition: "all 0.15s",
          }}>{m.icon} {m.label}</button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#888", alignSelf: "center" }}>{cards.length} cards</span>
      </div>

      {mode==="flashcard" && <FlashcardMode cards={cards} />}
      {mode==="learn"     && <LearnMode cards={cards} />}
      {mode==="match"     && <MatchMode cards={cards} />}
    </div>
  );
}
