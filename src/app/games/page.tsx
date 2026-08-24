"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { vocabulary, type Word } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";
import { getProgress, pickPracticeWords, shuffle } from "@/lib/progress";
import { useProgress } from "@/hooks/useProgress";

type Game = "menu" | "match" | "speed" | "listen";

function getOptions(correct: Word, all: Word[]) {
  return shuffle([correct, ...shuffle(all.filter((w) => w.id !== correct.id)).slice(0, 3)]);
}

function practicePool(minCount: number) {
  return pickPracticeWords(vocabulary, getProgress(), minCount);
}

function MatchGame({ onBack }: { onBack: () => void }) {
  const [leftItems, setLeftItems] = useState<Word[]>([]);
  const [rightItems, setRightItems] = useState<Word[]>([]);
  const [selLeft, setSelLeft] = useState<number | null>(null);
  const [selRight, setSelRight] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const done = leftItems.length > 0 && matched.size === leftItems.length;

  const deal = useCallback(() => {
    const next = practicePool(6).slice(0, 6);
    setLeftItems(shuffle(next));
    setRightItems(shuffle(next));
    setSelLeft(null);
    setSelRight(null);
    setMatched(new Set());
    setWrong(new Set());
  }, []);

  useEffect(() => { deal(); }, [deal]);

  const pickLeft = (id: number) => { if (matched.has(id)) return; setSelLeft(id); };
  const pickRight = (id: number) => {
    if (matched.has(id)) return;
    setSelRight(id);
    const left = selLeft;
    if (left !== null) {
      if (left === id) {
        setMatched((m) => new Set([...m, id]));
        setSelLeft(null);
        setSelRight(null);
      } else {
        setWrong(new Set([left, id]));
        setTimeout(() => { setWrong(new Set()); setSelLeft(null); setSelRight(null); }, 700);
      }
    }
  };

  const btnStyle = (id: number, side: "left" | "right") => {
    const isSel = side === "left" ? selLeft === id : selRight === id;
    const isMatch = matched.has(id);
    const isWrong = wrong.has(id);
    return {
      padding: "14px 10px",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 13,
      cursor: isMatch ? "default" : "pointer",
      textAlign: "center" as const,
      border: isMatch ? "2px solid #2D7A4F" : isWrong ? "2px solid #e85d75" : isSel ? "2px solid var(--gold)" : "2px solid #ddd",
      background: isMatch ? "#2D7A4F" : isWrong ? "#fde8ec" : isSel ? "#fffbe6" : "white",
      color: isMatch ? "white" : isWrong ? "#e85d75" : "var(--navy)",
      opacity: isMatch ? 0.6 : 1,
      transition: "all 0.2s",
    };
  };

  return (
    <div>
      <button type="button" onClick={onBack} style={backBtn}>← Games</button>
      <h2 style={gameTitle}>Match</h2>
      {done ? (
        <div style={{ textAlign: "center", padding: "40px 16px" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "var(--navy)", marginBottom: 20 }}>All matched!</div>
          <button type="button" onClick={deal} style={primaryBtn}>Play again</button>
        </div>
      ) : (
        <>
          <p style={{ textAlign: "center", color: "#888", fontSize: 15, marginBottom: 20 }}>Tap Arabic, then its English</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(leftItems).map((c) => (
                <button key={c.id} type="button" onClick={() => pickLeft(c.id)} style={btnStyle(c.id, "left")}>
                  <div className="arabic" style={{ fontSize: 36, direction: "rtl" }}>{c.arabic}</div>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rightItems.map((c) => (
                <button key={c.id} type="button" onClick={() => pickRight(c.id)} style={btnStyle(c.id, "right")}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{c.english}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SpeedGame({ onBack }: { onBack: () => void }) {
  const [seconds, setSeconds] = useState(30);
  const [score, setScore] = useState(0);
  const [word, setWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<Word[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const finishedRef = useRef(false);

  const nextQuestion = useCallback(() => {
    const pool = practicePool(8);
    const next = shuffle(pool)[0] ?? shuffle(vocabulary)[0];
    if (!next) return;
    setWord(next);
    setOptions(getOptions(next, vocabulary));
    setSelected(null);
  }, []);

  useEffect(() => { nextQuestion(); }, [nextQuestion]);

  useEffect(() => {
    if (finished) return;
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          finishedRef.current = true;
          setFinished(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [finished]);

  const pick = (opt: Word) => {
    if (selected !== null || !word || finished) return;
    setSelected(opt.id);
    if (opt.id === word.id) setScore((s) => s + 1);
    window.setTimeout(() => {
      if (!finishedRef.current) nextQuestion();
    }, 450);
  };

  const restart = () => {
    finishedRef.current = false;
    setSeconds(30);
    setScore(0);
    setFinished(false);
    nextQuestion();
  };

  return (
    <div>
      <button type="button" onClick={onBack} style={backBtn}>← Games</button>
      <h2 style={gameTitle}>Speed</h2>
      {finished ? (
        <div style={{ textAlign: "center", padding: "40px 16px" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>⚡</div>
          <div style={{ fontSize: 42, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>{score}</div>
          <div style={{ color: "#555", marginBottom: 24, fontSize: 18 }}>correct in 30 seconds</div>
          <button type="button" onClick={restart} style={primaryBtn}>Play again</button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, fontWeight: 800, fontSize: 18, color: "var(--navy)" }}>
            <span>{seconds}s</span>
            <span style={{ color: "var(--green)" }}>✓ {score}</span>
          </div>
          {word && (
            <>
              <div style={{ borderRadius: 20, background: "var(--navy)", padding: "28px 20px", textAlign: "center", marginBottom: 18 }}>
                <div className="arabic" style={{ fontSize: "clamp(52px, 13vw, 80px)", color: "var(--gold-light)", lineHeight: 1.5 }}>{word.arabic}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {options.map((opt) => {
                  const isCorrect = opt.id === word.id, isSel = selected === opt.id;
                  let bg = "white", color = "var(--navy)", border = "3px solid #ddd";
                  if (selected !== null) {
                    if (isCorrect) { bg = "var(--green)"; color = "white"; border = "3px solid var(--green)"; }
                    else if (isSel) { bg = "#C0392B"; color = "white"; border = "3px solid #C0392B"; }
                  }
                  return (
                    <button key={opt.id} type="button" onClick={() => pick(opt)} style={{
                      padding: "18px 10px", borderRadius: 14, fontWeight: 700, fontSize: 16,
                      background: bg, color, border, cursor: selected !== null ? "default" : "pointer",
                    }}>
                      {opt.english}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function ListenGame({ onBack }: { onBack: () => void }) {
  const { mark } = useProgress();
  const [word, setWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<Word[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [asked, setAsked] = useState(0);

  const nextQuestion = useCallback(() => {
    const pool = practicePool(8);
    const next = shuffle(pool)[0] ?? shuffle(vocabulary)[0];
    if (!next) return;
    setWord(next);
    setOptions(getOptions(next, vocabulary));
    setSelected(null);
  }, []);

  useEffect(() => { nextQuestion(); }, [nextQuestion]);

  const pick = (opt: Word) => {
    if (selected !== null || !word) return;
    setSelected(opt.id);
    if (opt.id === word.id) setScore((s) => s + 1);
    else mark(word.id, "learning");
    setAsked((n) => n + 1);
    setTimeout(nextQuestion, 900);
  };

  return (
    <div>
      <button type="button" onClick={onBack} style={backBtn}>← Games</button>
      <h2 style={gameTitle}>Listen</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, fontWeight: 800, color: "var(--navy)" }}>
        <span>Round {asked + 1}</span>
        <span style={{ color: "var(--green)" }}>✓ {score}</span>
      </div>
      {word && (
        <>
          <div style={{ borderRadius: 20, background: "var(--navy)", padding: "36px 20px", textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.45)", marginBottom: 18 }}>LISTEN, THEN PICK THE MEANING</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <SpeakButton text={word.arabic} size="lg" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {options.map((opt) => {
              const isCorrect = opt.id === word.id, isSel = selected === opt.id;
              let bg = "white", color = "var(--navy)", border = "3px solid #ddd";
              if (selected !== null) {
                if (isCorrect) { bg = "var(--green)"; color = "white"; border = "3px solid var(--green)"; }
                else if (isSel) { bg = "#C0392B"; color = "white"; border = "3px solid #C0392B"; }
              }
              return (
                <button key={opt.id} type="button" onClick={() => pick(opt)} style={{
                  padding: "18px 10px", borderRadius: 14, fontWeight: 700, fontSize: 16,
                  background: bg, color, border, cursor: selected !== null ? "default" : "pointer",
                }}>
                  {opt.english}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

const backBtn: CSSProperties = {
  background: "none", border: "none", color: "var(--navy)", fontWeight: 700, fontSize: 16, cursor: "pointer", padding: 0, marginBottom: 12,
};
const gameTitle: CSSProperties = {
  fontSize: 28, fontWeight: 800, color: "var(--navy)", margin: "0 0 18px",
};
const primaryBtn: CSSProperties = {
  padding: "14px 28px", borderRadius: 12, background: "var(--navy)", color: "white", fontWeight: 800, fontSize: 17, border: "none", cursor: "pointer",
};

export default function Games() {
  const [game, setGame] = useState<Game>("menu");

  if (game === "match") return <MatchGame onBack={() => setGame("menu")} />;
  if (game === "speed") return <SpeedGame onBack={() => setGame("menu")} />;
  if (game === "listen") return <ListenGame onBack={() => setGame("menu")} />;

  const cards = [
    { key: "match" as const, icon: "🔗", title: "Match", desc: "Tap each Arabic word with its English meaning" },
    { key: "speed" as const, icon: "⚡", title: "Speed", desc: "How many can you get right in 30 seconds?" },
    { key: "listen" as const, icon: "🔊", title: "Listen", desc: "Hear the Arabic, then pick the English" },
  ];

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 10 }}>Games</h1>
      <p style={{ color: "#555", marginBottom: 24, fontSize: 16 }}>Practice words you are still learning first.</p>
      <div style={{ display: "grid", gap: 12 }}>
        {cards.map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => setGame(card.key)}
            style={{
              textAlign: "left", padding: "22px 18px", borderRadius: 16, background: "white",
              border: "2px solid #ddd", cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{card.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "var(--navy)", marginBottom: 6 }}>{card.title}</div>
            <div style={{ fontSize: 15, color: "#555", lineHeight: 1.5 }}>{card.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
