"use client";
import { useState, useEffect, useCallback } from "react";
import { vocabulary } from "@/lib/vocabulary";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getOptions(correct: typeof vocabulary[0], all: typeof vocabulary) {
  const wrong = shuffle(all.filter(w => w.id !== correct.id)).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

export default function Quiz() {
  const [questions, setQuestions] = useState<typeof vocabulary>([]);
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState<typeof vocabulary>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [mode, setMode] = useState<"arToEn" | "enToAr">("arToEn");

  const start = useCallback(() => {
    const q = shuffle(vocabulary).slice(0, 10);
    setQuestions(q);
    setCurrent(0);
    setScore(0);
    setDone(false);
    setSelected(null);
    setOptions(getOptions(q[0], vocabulary));
  }, []);

  useEffect(() => { start(); }, [start]);

  useEffect(() => {
    if (questions[current]) setOptions(getOptions(questions[current], vocabulary));
  }, [current, questions]);

  const handleAnswer = (opt: typeof vocabulary[0]) => {
    if (selected !== null) return;
    setSelected(opt.id);
    if (opt.id === questions[current].id) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) { setDone(true); }
      else { setCurrent(c => c + 1); setSelected(null); }
    }, 1200);
  };

  if (!questions.length) return null;

  if (done) return (
    <div className="fade-in text-center py-16">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--navy)" }}>Quiz Complete!</h2>
      <div className="text-5xl font-bold mb-2" style={{ color: "var(--gold)" }}>{score} / {questions.length}</div>
      <p className="mb-8" style={{ color: "#666" }}>
        {score === 10 ? "Perfect! Mashallah! 🌟" : score >= 7 ? "Great job! Keep it up! 💪" : "Keep practicing — you'll get there! 📚"}
      </p>
      <div className="flex gap-3 justify-center">
        <button onClick={start} style={{ padding: "12px 28px", borderRadius: 10, background: "var(--navy)", color: "white", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
          Try Again
        </button>
        <button onClick={() => setMode(m => m === "arToEn" ? "enToAr" : "arToEn")} style={{ padding: "12px 28px", borderRadius: 10, background: "white", color: "var(--navy)", fontWeight: 700, fontSize: 15, border: "2px solid var(--navy)", cursor: "pointer" }}>
          Switch Mode
        </button>
      </div>
    </div>
  );

  const word = questions[current];

  return (
    <div className="fade-in max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>Quiz</h1>
        <div className="flex gap-2">
          {["arToEn", "enToAr"].map(m => (
            <button key={m} onClick={() => { setMode(m as typeof mode); start(); }} style={{
              padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer",
              background: mode === m ? "var(--navy)" : "white",
              color: mode === m ? "white" : "var(--navy)",
              border: "2px solid var(--navy)",
            }}>{m === "arToEn" ? "AR → EN" : "EN → AR"}</button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-2 rounded-full" style={{ background: "#e8e0d0" }}>
          <div className="h-2 rounded-full" style={{ width: `${((current + 1) / questions.length) * 100}%`, background: "var(--gold)", transition: "width 0.3s" }} />
        </div>
        <span className="text-sm font-medium" style={{ color: "var(--navy)" }}>{current + 1}/{questions.length}</span>
        <span className="text-sm font-bold" style={{ color: "var(--green)" }}>✓ {score}</span>
      </div>

      {/* Question */}
      <div className="rounded-2xl p-8 text-center mb-6 shadow" style={{ background: "var(--navy)" }}>
        <div className="text-xs font-medium mb-3" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>
          {mode === "arToEn" ? "WHAT DOES THIS MEAN?" : "HOW DO YOU SAY..."}
        </div>
        {mode === "arToEn"
          ? <div className="arabic text-6xl" style={{ color: "var(--gold-light)" }}>{word.arabic}</div>
          : <div className="text-3xl font-bold" style={{ color: "white" }}>{word.english}</div>
        }
        {mode === "arToEn" && (
          <div className="mt-3 text-sm italic" style={{ color: "rgba(255,255,255,0.5)" }}>{word.transliteration}</div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => {
          const isCorrect = opt.id === word.id;
          const isSelected = selected === opt.id;
          let bg = "white", color = "var(--navy)", border = "2px solid #e8e0d0";
          if (selected !== null) {
            if (isCorrect) { bg = "var(--green)"; color = "white"; border = "2px solid var(--green)"; }
            else if (isSelected) { bg = "#e85d75"; color = "white"; border = "2px solid #e85d75"; }
          }
          return (
            <button key={opt.id} onClick={() => handleAnswer(opt)} style={{
              padding: "14px 12px", borderRadius: 12, fontWeight: 600, fontSize: 15,
              background: bg, color, border, cursor: selected !== null ? "default" : "pointer",
              transition: "all 0.2s", textAlign: "center",
            }}>
              {mode === "arToEn"
                ? opt.english
                : <span className="arabic text-2xl">{opt.arabic}</span>
              }
            </button>
          );
        })}
      </div>
    </div>
  );
}
