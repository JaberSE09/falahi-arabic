"use client";
import { useState, useEffect, useCallback } from "react";
import { vocabulary } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }
function getOptions(correct: typeof vocabulary[0], all: typeof vocabulary) {
  return shuffle([correct, ...shuffle(all.filter(w=>w.id!==correct.id)).slice(0,3)]);
}

export default function Quiz() {
  const [questions, setQuestions] = useState<typeof vocabulary>([]);
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState<typeof vocabulary>([]);
  const [selected, setSelected] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [mode, setMode] = useState<"arToEn"|"enToAr">("arToEn");

  const start = useCallback(() => {
    const q = shuffle(vocabulary).slice(0, 10);
    setQuestions(q); setCurrent(0); setScore(0); setDone(false); setSelected(null);
    setOptions(getOptions(q[0], vocabulary));
  }, []);

  useEffect(() => { start(); }, [start]);
  useEffect(() => { if (questions[current]) setOptions(getOptions(questions[current], vocabulary)); }, [current, questions]);

  const handleAnswer = (opt: typeof vocabulary[0]) => {
    if (selected !== null) return;
    setSelected(opt.id);
    if (opt.id === questions[current].id) setScore(s=>s+1);
    setTimeout(() => {
      if (current+1 >= questions.length) setDone(true);
      else { setCurrent(c=>c+1); setSelected(null); }
    }, 1400);
  };

  if (!questions.length) return null;

  if (done) return (
    <div style={{ textAlign: "center", padding: "56px 24px" }} className="fade-in">
      <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
      <div style={{ fontSize: 42, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>{score} / {questions.length}</div>
      <div style={{ color: "#555", marginBottom: 32, fontSize: 20, lineHeight: 1.5 }}>
        {score===10 ? "Perfect! ماشاءالله 🌟" : score>=7 ? "Great job! 💪" : "Keep going! 📖"}
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={start} style={{ padding: "16px 32px", borderRadius: 14, background: "var(--navy)", color: "white", fontWeight: 800, fontSize: 18, border: "none", cursor: "pointer" }}>Try Again</button>
        <button onClick={() => { setMode(m=>m==="arToEn"?"enToAr":"arToEn"); start(); }} style={{ padding: "16px 32px", borderRadius: 14, background: "white", color: "var(--navy)", fontWeight: 800, fontSize: 18, border: "3px solid var(--navy)", cursor: "pointer" }}>Switch Mode</button>
      </div>
    </div>
  );

  const word = questions[current];

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", margin: 0 }}>Quiz</h1>
        <div style={{ display: "flex", gap: 8 }}>
          {(["arToEn","enToAr"] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); start(); }} style={{
              padding: "10px 18px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer",
              background: mode===m ? "var(--navy)" : "white", color: mode===m ? "white" : "var(--navy)",
              border: "2px solid var(--navy)",
            }}>{m==="arToEn" ? "Arabic → English" : "English → Arabic"}</button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 10, borderRadius: 99, background: "#ddd" }}>
          <div style={{ height: 10, borderRadius: 99, background: "var(--gold)", width: `${((current+1)/questions.length)*100}%`, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)" }}>{current+1}/10</span>
        <span style={{ fontSize: 17, fontWeight: 800, color: "var(--green)" }}>✓ {score}</span>
      </div>

      {/* Question card */}
      <div style={{ borderRadius: 22, background: "var(--navy)", padding: "36px 24px", textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
          {mode==="arToEn" ? "WHAT DOES THIS MEAN?" : "HOW DO YOU SAY THIS?"}
        </div>
        {mode==="arToEn" ? (
          <>
            <div className="arabic" style={{ fontSize: "clamp(40px, 11vw, 64px)", color: "var(--gold-light)", lineHeight: 1.6, marginBottom: 16 }}>{word.arabic}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <SpeakButton text={word.arabic} size="lg" />
              <span style={{ fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>{word.transliteration}</span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: "clamp(24px, 6vw, 36px)", fontWeight: 800, color: "white", lineHeight: 1.3 }}>{word.english}</div>
        )}
      </div>

      {/* Answer options — big tap targets */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {options.map(opt => {
          const isCorrect = opt.id===word.id, isSel = selected===opt.id;
          let bg="white", color="var(--navy)", border="3px solid #ddd";
          if (selected!==null) {
            if (isCorrect) { bg="var(--green)"; color="white"; border="3px solid var(--green)"; }
            else if (isSel) { bg="#C0392B"; color="white"; border="3px solid #C0392B"; }
          }
          return (
            <button key={opt.id} onClick={() => handleAnswer(opt)} style={{
              padding: "20px 12px", borderRadius: 16, fontWeight: 700, fontSize: "clamp(15px,3vw,18px)",
              background: bg, color, border, cursor: selected!==null ? "default" : "pointer",
              transition: "all 0.2s", textAlign: "center", lineHeight: 1.4,
            }}>
              {mode==="arToEn" ? opt.english : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <SpeakButton text={opt.arabic} size="sm" />
                  <span className="arabic" style={{ fontSize: "clamp(22px,5vw,30px)" }}>{opt.arabic}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
