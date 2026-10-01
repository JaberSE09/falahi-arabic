"use client";
import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { arabic101Lessons, drillChoices, lessonStudyCards, shuffledIndexes, type Arabic101Item, type Arabic101Lesson } from "@/lib/arabic101";
import { ArabicLine, VoicedText, arabicPhrases } from "@/components/VoicedArabic";
import StudySet from "@/components/StudySet";

function LessonContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const lesson = arabic101Lessons.find((l) => l.id === id);
  const [tab, setTab] = useState<"concepts" | "rules" | "practice">("concepts");
  const [drillRun, setDrillRun] = useState(0);

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
        {(["concepts", "rules", "practice"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
              tab === t ? "text-white border-b-2" : "text-gray-500 hover:text-gray-300"
            }`}
            style={{ borderColor: tab === t ? lesson.color : "transparent" }}
          >
            {t === "concepts" ? "📚 Concepts" : t === "rules" ? "📋 Rules" : "🎯 Practice"}
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

        {tab === "practice" && (
          <div className="space-y-10">
            <LessonStudy lesson={lesson} />
            <div>
              <h2 className="mb-1 text-lg font-bold text-white">Drill</h2>
              <p className="mb-4 text-sm text-gray-400">
                Answer every question. A miss comes back once. The score is your first try.
              </p>
              <DrillSession key={`${lesson.id}-${drillRun}`} lesson={lesson} onRestart={() => setDrillRun((n) => n + 1)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LessonStudy({ lesson }: { lesson: Arabic101Lesson }) {
  const cards = useMemo(() => lessonStudyCards(lesson), [lesson]);
  if (cards.length === 0) return null;

  return (
    <div>
      <h2 className="mb-1 text-lg font-bold text-white">Flashcards, quiz, and match</h2>
      <p className="mb-4 text-sm text-gray-400">
        Flip the Arabic, then quiz and match it before the drill.
      </p>
      <div className="rounded-2xl bg-[#FEFCF6] p-4 text-[var(--navy)]">
        <StudySet cards={cards} title={lesson.title} />
      </div>
    </div>
  );
}

function DrillSession({ lesson, onRestart }: { lesson: Arabic101Lesson; onRestart: () => void }) {
  const drills = lesson.drills;
  const [queue, setQueue] = useState(() => shuffledIndexes(drills.length));
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [firstCorrect, setFirstCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const index = queue[pos];
  const drill = index === undefined ? undefined : drills[index];
  const choices = useMemo(() => {
    if (!drill) return [];
    return drillChoices(drill.answer, drills.map((item) => item.answer));
  }, [drill, drills]);

  if (drills.length === 0) {
    return <p className="text-gray-400">No drills in this lesson yet.</p>;
  }

  if (done || !drill) {
    const missed = drills.length - firstCorrect;
    return (
      <div className="rounded-2xl p-6 bg-gray-900 border border-gray-700 text-center">
        <div className="text-3xl mb-2">{firstCorrect === drills.length ? "🎯" : "📚"}</div>
        <p className="text-white font-bold text-lg">First try</p>
        <p className="text-green-400 text-2xl font-bold mt-1">{firstCorrect}/{drills.length}</p>
        <p className="text-gray-400 text-sm mt-2">
          {missed === 0 ? "Every question was right the first time." : `${missed} came back once so you could try again.`}
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-4 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all active:scale-95"
          style={{ backgroundColor: lesson.color }}
        >
          Practice again
        </button>
      </div>
    );
  }

  const reviewing = pos >= drills.length;
  const progress = Math.min(pos + (picked ? 1 : 0), drills.length) / drills.length;

  const pick = (choice: string) => {
    if (picked !== null) return;
    setPicked(choice);
    if (!reviewing && choice === drill.answer) setFirstCorrect((n) => n + 1);
  };

  const alreadyRequeued = index !== undefined && queue.slice(drills.length).includes(index);
  const willRetry = picked !== null && picked !== drill.answer && !alreadyRequeued;
  const isLast = pos + 1 >= queue.length && !willRetry;

  const next = () => {
    if (picked === null || index === undefined) return;
    const nextQueue = willRetry ? [...queue, index] : queue;
    if (nextQueue !== queue) setQueue(nextQueue);
    if (pos + 1 >= nextQueue.length) {
      setDone(true);
      return;
    }
    setPos((n) => n + 1);
    setPicked(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="text-gray-400">
          {reviewing ? "Review a miss" : `${Math.min(pos + 1, drills.length)} / ${drills.length}`}
        </span>
        <span className="text-green-400">First try {firstCorrect}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5 mb-6">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width: `${progress * 100}%`, backgroundColor: lesson.color }}
        />
      </div>

      <div className="rounded-2xl p-6 mb-4 bg-gray-900 border border-gray-800">
        <VoicedText
          text={drill.question}
          skip={drill.arabic ? [drill.arabic] : []}
          className="mb-3 text-lg font-semibold text-white"
        />
        {drill.arabic && <ArabicLine text={drill.arabic} color={lesson.color} large />}

        <div className="mt-4 flex flex-col gap-3">
          {choices.map((choice) => {
            const isCorrect = choice === drill.answer;
            const isPicked = choice === picked;
            let background = "#111827";
            let border = "#374151";
            if (picked !== null && isCorrect) {
              background = "#166534";
              border = "#22c55e";
            } else if (picked !== null && isPicked) {
              background = "#991b1b";
              border = "#f87171";
            }
            return (
              <button
                key={choice}
                type="button"
                disabled={picked !== null}
                onClick={() => pick(choice)}
                className="w-full rounded-xl px-4 py-4 text-left transition-all active:scale-[0.99] disabled:cursor-default"
                style={{ background, border: `2px solid ${border}`, opacity: picked !== null && !isCorrect && !isPicked ? 0.45 : 1 }}
              >
                <VoicedText text={choice} as="span" speak={false} className="text-base font-semibold text-white" />
              </button>
            );
          })}
        </div>

        {picked === null ? (
          <button
            type="button"
            onClick={() => pick("")}
            className="mt-3 w-full py-3 rounded-xl text-sm font-semibold text-gray-300 bg-gray-800 border border-gray-700"
          >
            I don&apos;t know
          </button>
        ) : (
          <div className="mt-4">
            <div className="rounded-xl p-4 mb-3" style={{ backgroundColor: lesson.color + "20", border: `1px solid ${lesson.color}44` }}>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                {picked === drill.answer ? "Correct" : "Answer"}
              </p>
              {picked !== drill.answer && (
                <VoicedText text={drill.answer} speak={false} className="text-base font-bold text-white" />
              )}
              {drill.explanation && (
                <VoicedText text={`💡 ${drill.explanation}`} className="mt-2 text-sm text-gray-300" />
              )}
            </div>
            <button
              type="button"
              onClick={next}
              className="w-full py-3 rounded-xl font-bold text-white transition-all active:scale-95"
              style={{ backgroundColor: lesson.color }}
            >
              {isLast ? "See score" : "Next question"}
            </button>
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
