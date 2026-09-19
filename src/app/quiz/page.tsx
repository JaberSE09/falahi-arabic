"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { vocabulary, categories } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";
import { useProgress } from "@/hooks/useProgress";
import { pickGapWords, shuffle, getProgress, getMissedWords, getDueWords } from "@/lib/progress";

function getOptions(correct: (typeof vocabulary)[0], all: typeof vocabulary) {
  const pool = all.filter((w) => w.id !== correct.id);
  const sameCat = pool.filter((w) => w.category === correct.category);
  const distractors = shuffle(sameCat.length >= 3 ? sameCat : pool).slice(0, 3);
  return shuffle([correct, ...distractors]);
}

function QuizInner() {
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section");
  const validInitial =
    initialSection && categories.includes(initialSection) ? initialSection : "All";

  const [questions, setQuestions] = useState<typeof vocabulary>([]);
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState<typeof vocabulary>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [mode, setMode] = useState<"arToEn" | "enToAr">("arToEn");
  const [pool, setPool] = useState<"gaps" | "all">("gaps");
  const [section, setSection] = useState<string>(validInitial);
  const { correct, wrong, counts, progress } = useProgress();

  const scoped = section === "All" ? vocabulary : vocabulary.filter((w) => w.category === section);

  const start = useCallback(() => {
    const saved = getProgress();
    const source = section === "All" ? vocabulary : vocabulary.filter((w) => w.category === section);
    if (source.length === 0) {
      setQuestions([]);
      return;
    }
    const q =
      pool === "gaps"
        ? pickGapWords(source, saved, Math.min(10, source.length))
        : shuffle(source).slice(0, Math.min(10, source.length));
    setQuestions(q);
    setCurrent(0);
    setScore(0);
    setDone(false);
    setSelected(null);
    if (q[0]) setOptions(getOptions(q[0], source));
  }, [pool, section]);

  useEffect(() => {
    start();
  }, [start, mode]);

  useEffect(() => {
    const source = section === "All" ? vocabulary : vocabulary.filter((w) => w.category === section);
    if (questions[current]) setOptions(getOptions(questions[current], source));
  }, [current, questions, section]);

  const gapCountInSection = (() => {
    const missed = getMissedWords(scoped, progress).length;
    const due = getDueWords(scoped, progress).length;
    return missed + due;
  })();

  const handleAnswer = (opt: (typeof vocabulary)[0]) => {
    if (selected !== null) return;
    const question = questions[current];
    if (!question) return;
    setSelected(opt.id);
    if (opt.id === question.id) {
      setScore((s) => s + 1);
      correct(question.id);
    } else {
      wrong(question.id);
    }
    setTimeout(() => {
      if (current + 1 >= questions.length) setDone(true);
      else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1400);
  };

  if (!questions.length) {
    return (
      <div className="fade-in" style={{ textAlign: "center", padding: "48px 20px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 12 }}>Quiz</h1>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSection(cat)}
              style={{
                padding: "9px 14px",
                borderRadius: 99,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                background: section === cat ? "var(--gold)" : "white",
                color: "var(--navy)",
                border: "2px solid " + (section === cat ? "var(--gold)" : "#ddd"),
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <p style={{ color: "#555", marginBottom: 16 }}>
          {pool === "gaps"
            ? `No gap words${section !== "All" ? ` in ${section}` : ""} yet. Try All words or another section.`
            : "No words in this section."}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setPool("all")}
            style={{ padding: "12px 20px", borderRadius: 12, background: "var(--navy)", color: "white", fontWeight: 800, border: "none", cursor: "pointer" }}
          >
            Quiz all words in section
          </button>
          <Link href="/review" style={{ padding: "12px 20px", borderRadius: 12, background: "white", color: "var(--navy)", fontWeight: 800, border: "2px solid var(--navy)", textDecoration: "none" }}>
            Review missed
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "56px 24px" }} className="fade-in">
        <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
        <div style={{ fontSize: 42, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>
          {score} / {questions.length}
        </div>
        <div style={{ color: "#555", marginBottom: 20, fontSize: 18 }}>
          {section !== "All" ? section : "All sections"}
        </div>
        <div style={{ color: "#555", marginBottom: 32, fontSize: 20, lineHeight: 1.5 }}>
          {score === questions.length ? "Perfect! ماشاءالله 🌟" : score >= 7 ? "Great job! 💪" : "Keep going! 📖"}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={start}
            style={{ padding: "16px 32px", borderRadius: 14, background: "var(--navy)", color: "white", fontWeight: 800, fontSize: 18, border: "none", cursor: "pointer" }}
          >
            Try Again
          </button>
          <Link
            href={section === "All" ? "/review" : `/review?section=${encodeURIComponent(section)}`}
            style={{ padding: "16px 32px", borderRadius: 14, background: "var(--gold)", color: "white", fontWeight: 800, fontSize: 18, textDecoration: "none" }}
          >
            Review wrong words
          </Link>
          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === "arToEn" ? "enToAr" : "arToEn"));
            }}
            style={{ padding: "16px 32px", borderRadius: 14, background: "white", color: "var(--navy)", fontWeight: 800, fontSize: 18, border: "3px solid var(--navy)", cursor: "pointer" }}
          >
            Switch Mode
          </button>
        </div>
      </div>
    );
  }

  const word = questions[current];
  if (!word) return null;

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", margin: 0 }}>Quiz</h1>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["gaps", "all"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPool(p)}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                background: pool === p ? "var(--gold)" : "white",
                color: "var(--navy)",
                border: "2px solid " + (pool === p ? "var(--gold)" : "#ddd"),
              }}
            >
              {p === "gaps" ? `My gaps (${gapCountInSection || counts.missed + counts.due})` : "All words"}
            </button>
          ))}
          {(["arToEn", "enToAr"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                background: mode === m ? "var(--navy)" : "white",
                color: mode === m ? "white" : "var(--navy)",
                border: "2px solid var(--navy)",
              }}
            >
              {m === "arToEn" ? "Arabic → English" : "English → Arabic"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 800, color: "#888", letterSpacing: 0.6, marginBottom: 8, textTransform: "uppercase" }}>
        Section
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSection(cat)}
            style={{
              padding: "8px 14px",
              borderRadius: 99,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              background: section === cat ? "var(--navy)" : "white",
              color: section === cat ? "white" : "var(--navy)",
              border: "2px solid var(--navy)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 10, borderRadius: 99, background: "#ddd" }}>
          <div
            style={{
              height: 10,
              borderRadius: 99,
              background: "var(--gold)",
              width: `${((current + 1) / questions.length) * 100}%`,
              transition: "width 0.3s",
            }}
          />
        </div>
        <span style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)" }}>
          {current + 1}/{questions.length}
        </span>
        <span style={{ fontSize: 17, fontWeight: 800, color: "var(--green)" }}>✓ {score}</span>
      </div>

      <div style={{ borderRadius: 22, background: "var(--navy)", padding: "36px 24px", textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
          {mode === "arToEn" ? "WHAT DOES THIS MEAN?" : "HOW DO YOU SAY THIS?"}
        </div>
        {mode === "arToEn" ? (
          <>
            <div className="arabic" style={{ fontSize: "clamp(48px, 12vw, 72px)", color: "var(--gold-light)", lineHeight: 1.6, marginBottom: 16 }}>
              {word.arabic}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <SpeakButton text={word.arabic} size="lg" />
              <span style={{ fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>{word.transliteration}</span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: "clamp(24px, 6vw, 36px)", fontWeight: 800, color: "white", lineHeight: 1.3 }}>{word.english}</div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {options.map((opt) => {
          const isCorrect = opt.id === word.id;
          const isSel = selected === opt.id;
          let bg = "white";
          let color = "var(--navy)";
          let border = "3px solid #ddd";
          if (selected !== null) {
            if (isCorrect) {
              bg = "var(--green)";
              color = "white";
              border = "3px solid var(--green)";
            } else if (isSel) {
              bg = "#C0392B";
              color = "white";
              border = "3px solid #C0392B";
            }
          }
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleAnswer(opt)}
              style={{
                padding: "20px 12px",
                borderRadius: 16,
                fontWeight: 700,
                fontSize: "clamp(15px,3vw,18px)",
                background: bg,
                color,
                border,
                cursor: selected !== null ? "default" : "pointer",
                transition: "all 0.2s",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              {mode === "arToEn" ? (
                opt.english
              ) : (
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

export default function Quiz() {
  return (
    <Suspense fallback={<div className="fade-in" style={{ padding: 24, fontWeight: 700, color: "var(--navy)" }}>Loading quiz…</div>}>
      <QuizInner />
    </Suspense>
  );
}
