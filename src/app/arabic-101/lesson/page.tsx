"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { arabic101Lessons, type Arabic101Item } from "@/lib/arabic101";
import { ArabicLine, VoicedText, arabicPhrases } from "@/components/VoicedArabic";

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
        <VoicedText text={lesson.title} className="mb-1 text-2xl font-bold text-white" />
        <VoicedText text={lesson.description} className="mx-auto max-w-xs text-sm text-gray-400" />
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
              <ConceptCard key={i} item={item} color={lesson.color} />
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
                <VoicedText text={rule} className="text-sm leading-relaxed text-gray-200" />
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
              <VoicedText
                text={drill.question}
                skip={drill.arabic ? [drill.arabic] : []}
                className="mb-3 text-lg font-semibold text-white"
              />
              {drill.arabic && <ArabicLine text={drill.arabic} color={lesson.color} large />}

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
                    <VoicedText text={drill.answer} className="text-base font-bold text-white" />
                    {drill.explanation && (
                      <VoicedText text={`💡 ${drill.explanation}`} className="mt-2 text-sm text-gray-300" />
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

function ConceptCard({ item, color }: { item: Arabic101Item; color: string }) {
  const termSpoken = arabicPhrases(item.term).join(" ");
  const termIsTheWord = !item.arabic && termSpoken.length > 0 && termSpoken === item.term.trim();
  const termRepeatsArabic = Boolean(item.arabic && item.term.trim() === item.arabic.trim());

  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: color + "15", border: `1px solid ${color}33` }}>
      {item.arabic && <ArabicLine text={item.arabic} color={color} />}
      {termRepeatsArabic ? null : termIsTheWord ? (
        <ArabicLine text={item.term} color={color} />
      ) : termSpoken ? (
        <VoicedText text={item.term} skip={item.arabic ? [item.arabic] : []} className="text-base font-bold text-white" />
      ) : (
        <div className="text-base font-bold text-white">{item.term}</div>
      )}
      {item.transliteration && (
        <div className="text-sm italic text-gray-400">{item.transliteration}</div>
      )}
      <div className="mt-1 text-sm text-gray-300">{item.english}</div>
      {item.note && (
        <div className="mt-2 rounded-lg bg-yellow-400/10 px-2 py-1 text-xs text-yellow-400">
          <VoicedText text={`💡 ${item.note}`} />
        </div>
      )}
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
