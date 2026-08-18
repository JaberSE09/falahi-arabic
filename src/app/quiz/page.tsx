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
    }, 1300);
  };

  if (!questions.length) return null;

  if (done) return (
    <div style={{ textAlign: "center", padding: "48px 16px" }} className="fade-in">
      <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{score}/{questions.length}</div>
      <div style={{ color: "#666", marginBottom: 28, fontSize: 16 }}>
        {score===10?"Perfect! ماشاءالله 🌟":score>=7?"Great job! 💪":"Keep going! 📖"}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={start} style={{ padding: "12px 28px", borderRadius: 12, background: "var(--navy)", color: "white", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>Try Again</button>
        <button onClick={() => { setMode(m=>m==="arToEn"?"enToAr":"arToEn"); start(); }} style={{ padding: "12px 28px", borderRadius: 12, background: "white", color: "var(--navy)", fontWeight: 700, fontSize: 15, border: "2px solid var(--navy)", cursor: "pointer" }}>Switch Mode</button>
      </div>
    </div>
  );

  const word = questions[current];

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", margin: 0 }}>Quiz</h1>
        <div style={{ display: "flex", gap: 6 }}>
          {(["arToEn","enToAr"] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); start(); }} style={{
              padding: "7px 13px", borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: "pointer",
              background: mode===m?"var(--navy)":"white", color: mode===m?"white":"var(--navy)", border: "2px solid var(--navy)",
            }}>{m==="arToEn"?"AR→EN":"EN→AR"}</button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 99, background: "#e8e0d0" }}>
          <div style={{ height: 6, borderRadius: 99, background: "var(--gold)", width: `${((current+1)/questions.length)*100}%`, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{current+1}/10</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>✓{score}</span>
      </div>

      {/* Question */}
      <div style={{ borderRadius: 20, background: "var(--navy)", padding: "28px 20px", textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
          {mode==="arToEn"?"WHAT DOES THIS MEAN?":"HOW DO YOU SAY..."}
        </div>
        {mode==="arToEn" ? (
          <>
            <div className="arabic" style={{ fontSize: "clamp(32px,9vw,52px)", color: "var(--gold-light)", lineHeight: 1.5, marginBottom: 12 }}>{word.arabic}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <SpeakButton text={word.arabic} size="lg" />
              <span style={{ fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.45)" }}>{word.transliteration}</span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: "clamp(20px,5vw,28px)", fontWeight: 700, color: "white" }}>{word.english}</div>
        )}
      </div>

      {/* Options */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {options.map(opt => {
          const isCorrect = opt.id===word.id, isSel = selected===opt.id;
          let bg="white", color="var(--navy)", border="2px solid #e8e0d0";
          if (selected!==null) {
            if (isCorrect) { bg="var(--green)"; color="white"; border="2px solid var(--green)"; }
            else if (isSel) { bg="#e85d75"; color="white"; border="2px solid #e85d75"; }
          }
          return (
            <button key={opt.id} onClick={() => handleAnswer(opt)} style={{
              padding: "15px 10px", borderRadius: 14, fontWeight: 600, fontSize: 14,
              background: bg, color, border, cursor: selected!==null?"default":"pointer",
              transition: "all 0.2s", textAlign: "center",
            }}>
              {mode==="arToEn" ? opt.english : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
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
