"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { arabic101Lessons } from "@/lib/arabic101";

function LessonContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const lesson = arabic101Lessons.find((l) => l.id === id);
  const [tab, setTab] = useState<"concepts" | "rules" | "drill">("concepts");
  const [drillIdx, setDrillIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [answered, setAnswered] = useState(false);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-400 mb-4">Lesson not found</p>
          <Link href="/arabic-101" className="text-blue-400 hover:text-blue-300">← Back to Arabic 101</Link>
        </div>
      </div>
    );
  }

  const drill = lesson.drills[drillIdx];
  const totalDrills = lesson.drills.length;

  const handleMark = (correct: boolean) => {
    if (answered) return;
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), incorrect: s.incorrect + (correct ? 0 : 1) }));
    setAnswered(true);
  };

  const nextDrill = () => {
    setDrillIdx((i) => (i + 1) % totalDrills);
    setShowAnswer(false);
    setAnswered(false);
  };

  const prevDrill = () => {
    setDrillIdx((i) => (i - 1 + totalDrills) % totalDrills);
    setShowAnswer(false);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <Link href="/arabic-101" className="text-blue-400 text-sm hover:text-blue-300">← Arabic 101</Link>
      </div>
      <div
        className="px-4 py-6 text-center"
        style={{ background: `linear-gradient(135deg, ${lesson.color}33, #0D1117)` }}
      >
        <div className="text-4xl mb-2">{lesson.emoji}</div>
        <h1 className="text-2xl font-bold text-white mb-1">{lesson.title}</h1>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">{lesson.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 px-4">
        {(["concepts", "rules", "drill"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
              tab === t ? "text-white border-b-2" : "text-gray-500 hover:text-gray-300"
            }`}
            style={{ borderColor: tab === t ? lesson.color : "transparent" }}
          >
            {t === "concepts" ? "📚 Concepts" : t === "rules" ? "📋 Rules" : "✏️ Drill"}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* CONCEPTS TAB */}
        {tab === "concepts" && (
          <div className="space-y-3">
            {lesson.concepts.map((item, i) => (
              <div key={i} className="rounded-xl p-4" style={{ backgroundColor: lesson.color + "15", border: `1px solid ${lesson.color}33` }}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    {item.arabic && (
                      <div className="text-2xl font-bold text-right mb-1" dir="rtl" style={{ color: lesson.color, fontFamily: "serif" }}>
                        {item.arabic}
                      </div>
                    )}
                    <div className="font-bold text-white text-base">{item.term}</div>
                    {item.transliteration && (
                      <div className="text-gray-400 text-sm italic">{item.transliteration}</div>
                    )}
                    <div className="text-gray-300 text-sm mt-1">{item.english}</div>
                    {item.note && (
                      <div className="text-yellow-400 text-xs mt-2 bg-yellow-400/10 rounded-lg px-2 py-1">
                        💡 {item.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RULES TAB */}
        {tab === "rules" && (
          <div className="space-y-3">
            <div className="text-gray-400 text-sm mb-4">
              {lesson.rules.length} key rules to memorize for this lesson
            </div>
            {lesson.rules.map((rule, i) => (
              <div key={i} className="flex gap-3 rounded-xl p-4 bg-gray-900 border border-gray-800">
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: lesson.color }}
                >
                  {i + 1}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        )}

        {/* DRILL TAB */}
        {tab === "drill" && (
          <div>
            {/* Score + Progress */}
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-gray-400">{drillIdx + 1} / {totalDrills}</span>
              <div className="flex gap-3">
                <span className="text-green-400">✓ {score.correct}</span>
                <span className="text-red-400">✗ {score.incorrect}</span>
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 mb-6">
              <div
                className="h-1.5 rounded-full transition-all"
                style={{ width: `${((drillIdx + 1) / totalDrills) * 100}%`, backgroundColor: lesson.color }}
              />
            </div>

            {/* Question card */}
            <div className="rounded-2xl p-6 mb-4 bg-gray-900 border border-gray-800">
              <p className="text-white font-semibold text-lg mb-3">{drill.question}</p>
              {drill.arabic && (
                <p className="text-3xl text-right font-bold mb-2" dir="rtl" style={{ color: lesson.color, fontFamily: "serif" }}>
                  {drill.arabic}
                </p>
              )}

              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="mt-4 w-full py-3 rounded-xl font-bold text-white transition-all active:scale-95"
                  style={{ backgroundColor: lesson.color }}
                >
                  Show Answer
                </button>
              ) : (
                <div className="mt-4">
                  <div className="rounded-xl p-4 mb-3" style={{ backgroundColor: lesson.color + "20", border: `1px solid ${lesson.color}44` }}>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Answer</p>
                    <p className="text-white font-bold text-base">{drill.answer}</p>
                    {drill.explanation && (
                      <p className="text-gray-300 text-sm mt-2">💡 {drill.explanation}</p>
                    )}
                  </div>
                  {!answered ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleMark(true)}
                        className="flex-1 py-3 rounded-xl font-bold text-white bg-green-600 active:scale-95 transition-all"
                      >
                        ✓ Got it
                      </button>
                      <button
                        onClick={() => handleMark(false)}
                        className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 active:scale-95 transition-all"
                      >
                        ✗ Missed it
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={nextDrill}
                      className="w-full py-3 rounded-xl font-bold text-white transition-all active:scale-95"
                      style={{ backgroundColor: lesson.color }}
                    >
                      {drillIdx < totalDrills - 1 ? "Next Question →" : "🎉 Restart Drill"}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <button onClick={prevDrill} className="flex-1 py-2 rounded-xl text-sm text-gray-400 bg-gray-900 border border-gray-800 hover:text-white">
                ← Previous
              </button>
              <button onClick={nextDrill} className="flex-1 py-2 rounded-xl text-sm text-gray-400 bg-gray-900 border border-gray-800 hover:text-white">
                Skip →
              </button>
            </div>

            {/* Final score when done */}
            {drillIdx === totalDrills - 1 && answered && (
              <div className="mt-6 rounded-2xl p-6 bg-gray-900 border border-gray-700 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-white font-bold text-lg">Session Score</p>
                <p className="text-green-400 text-2xl font-bold mt-1">{score.correct}/{score.correct + score.incorrect}</p>
                <button
                  onClick={() => { setDrillIdx(0); setShowAnswer(false); setAnswered(false); setScore({ correct: 0, incorrect: 0 }); }}
                  className="mt-4 px-6 py-2 rounded-xl font-bold text-white text-sm transition-all active:scale-95"
                  style={{ backgroundColor: lesson.color }}
                >
                  Restart
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center">Loading...</div>}>
      <LessonContent />
    </Suspense>
  );
}
