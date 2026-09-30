"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  bestPronunciationMatch,
  getSpeechRecognitionCtor,
  listenMsForArabic,
  normalizeArabic,
  pronunciationMatches,
  type SpeechRecognitionLike,
} from "@/lib/pronounce";

type Feedback =
  | "idle"
  | "listening"
  | "right"
  | "wrong"
  | "nohear"
  | "unsupported"
  | "error";

interface PronounceButtonProps {
  targetArabic: string;
  /** Optional Latin/transliteration — helps when the mic returns English letters. */
  targetTransliteration?: string;
  onResult?: (ok: boolean, heard: string) => void;
  size?: "md" | "lg";
}

function normalizeLatin(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ʿ|ʾ|'|`/g, "")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function latinMatches(heard: string, transliteration: string): boolean {
  const a = normalizeLatin(heard);
  const b = normalizeLatin(transliteration);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  const aTok = a.split(" ").filter(Boolean);
  const bTok = b.split(" ").filter(Boolean);
  if (bTok.length === 0) return false;
  let hit = 0;
  for (const t of bTok) {
    if (aTok.some((h) => h === t || (t.length >= 3 && (h.includes(t) || t.includes(h))))) {
      hit += 1;
    }
  }
  return hit / bTok.length >= 0.65;
}

function matchHeard(
  alts: string[],
  targetArabic: string,
  targetTransliteration?: string,
): { ok: boolean; heard: string } {
  const primary = bestPronunciationMatch(alts, targetArabic);
  if (primary.ok) return primary;

  if (targetTransliteration) {
    for (const alt of alts) {
      const hasArabic = normalizeArabic(alt).length > 0;
      if (!hasArabic && latinMatches(alt, targetTransliteration)) {
        return { ok: true, heard: alt };
      }
      if (latinMatches(alt, targetTransliteration) && pronunciationMatches(alt, targetArabic) === false) {
        // Mixed or latin-heavy transcripts
        if (normalizeLatin(alt).length >= normalizeLatin(targetTransliteration).length * 0.5) {
          return { ok: true, heard: alt };
        }
      }
    }
  }
  return primary;
}

export default function PronounceButton({
  targetArabic,
  targetTransliteration,
  onResult,
  size = "lg",
}: PronounceButtonProps) {
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [heard, setHeard] = useState("");
  const [interim, setInterim] = useState("");
  const recogRef = useRef<SpeechRecognitionLike | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gotFinalRef = useRef(false);
  const supported = typeof window !== "undefined" && !!getSpeechRecognitionCtor();

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimer();
      try {
        recogRef.current?.abort();
      } catch {
        /* ignore */
      }
    };
  }, [clearTimer]);

  const stop = useCallback(() => {
    clearTimer();
    try {
      recogRef.current?.stop();
    } catch {
      /* ignore */
    }
  }, [clearTimer]);

  const start = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setFeedback("unsupported");
      return;
    }
    setHeard("");
    setInterim("");
    setFeedback("listening");
    gotFinalRef.current = false;
    clearTimer();
    try {
      recogRef.current?.abort();
    } catch {
      /* ignore */
    }
    const recog = new Ctor();
    recogRef.current = recog;
    recog.lang = "ar-SA";
    recog.interimResults = true;
    recog.maxAlternatives = 5;
    recog.continuous = false;

    recog.onresult = (event) => {
      const lastIdx = event.results.length - 1;
      const last = event.results[lastIdx];
      if (!last) return;

      const lastAlts: string[] = [];
      for (let i = 0; i < last.length; i++) {
        const t = last[i]?.transcript?.trim();
        if (t) lastAlts.push(t);
      }
      const primary = lastAlts[0] ?? "";

      if (!last.isFinal) {
        setInterim(primary);
        return;
      }

      // Collect every final alternative across the utterance
      const alts: string[] = [];
      const joinedParts: string[] = [];
      for (let r = 0; r < event.results.length; r++) {
        const res = event.results[r];
        if (!res?.isFinal) continue;
        const first = res[0]?.transcript?.trim();
        if (first) joinedParts.push(first);
        for (let i = 0; i < res.length; i++) {
          const t = res[i]?.transcript?.trim();
          if (t) alts.push(t);
        }
      }
      if (joinedParts.length > 1) {
        alts.unshift(joinedParts.join(" "));
      }

      gotFinalRef.current = true;
      clearTimer();
      const { ok, heard: bestHeard } = matchHeard(alts, targetArabic, targetTransliteration);
      setInterim("");
      setHeard(bestHeard);
      setFeedback(ok ? "right" : "wrong");
      try {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(ok ? "Correct!" : "Incorrect");
          utter.lang = "en-US";
          utter.rate = 1;
          window.speechSynthesis.speak(utter);
        }
      } catch {
        /* ignore TTS announce errors */
      }
      onResult?.(ok, bestHeard);
    };

    recog.onerror = (event) => {
      clearTimer();
      if (event.error === "aborted") {
        setFeedback((f) => (f === "listening" ? "idle" : f));
        return;
      }
      if (event.error === "no-speech") {
        setFeedback("nohear");
        setInterim("");
        return;
      }
      setFeedback("error");
      setInterim("");
    };

    recog.onend = () => {
      clearTimer();
      setFeedback((f) => {
        if (f !== "listening") return f;
        if (!gotFinalRef.current) return "nohear";
        return "idle";
      });
      setInterim("");
    };

    try {
      recog.start();
      const ms = listenMsForArabic(targetArabic);
      timerRef.current = setTimeout(() => {
        try {
          recog.stop();
        } catch {
          /* ignore */
        }
      }, ms);
    } catch {
      clearTimer();
      setFeedback("error");
    }
  }, [clearTimer, onResult, targetArabic, targetTransliteration]);

  const btnSize = size === "lg" ? 72 : 52;
  const label =
    feedback === "listening"
      ? interim
        ? `Hearing… ${interim}`
        : "Listening… speak the line"
      : feedback === "right"
        ? "Correct!"
        : feedback === "wrong"
          ? "Incorrect"
          : feedback === "nohear"
            ? "Didn’t hear you — try again"
            : feedback === "unsupported"
              ? "Mic not supported — use Chrome or Edge"
              : feedback === "error"
                ? "Mic error — try again"
                : "Say it";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        width: "100%",
        background: "white",
        borderRadius: 16,
        padding: "18px 16px",
        border: "2px solid #e8e0d0",
      }}
    >
      <button
        type="button"
        aria-label="Say the Arabic line"
        disabled={!supported && feedback === "unsupported"}
        onClick={() => {
          if (feedback === "listening") stop();
          else start();
        }}
        style={{
          width: btnSize,
          height: btnSize,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: size === "lg" ? 28 : 22,
          background:
            feedback === "listening"
              ? "var(--gold)"
              : feedback === "right"
                ? "#2D7A4F"
                : feedback === "wrong" || feedback === "error" || feedback === "nohear"
                  ? "#e85d75"
                  : "var(--navy)",
          color: "white",
          boxShadow: feedback === "listening" ? "0 0 0 8px rgba(201,150,58,0.25)" : "none",
        }}
      >
        {feedback === "listening"
          ? "…"
          : feedback === "right"
            ? "✓"
            : feedback === "wrong"
              ? "✕"
              : feedback === "nohear"
                ? "?"
                : "🎙️"}
      </button>

      <div
        style={{
          fontWeight: 800,
          fontSize: 18,
          color:
            feedback === "right"
              ? "#2D7A4F"
              : feedback === "wrong" || feedback === "nohear"
                ? "#e85d75"
                : "var(--navy)",
          textAlign: "center",
        }}
      >
        {label}
      </div>

      {(feedback === "right" || feedback === "wrong") && (
        <div
          role="status"
          aria-live="polite"
          style={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 14,
            padding: "16px 18px",
            textAlign: "center",
            background: feedback === "right" ? "rgba(45,122,79,0.12)" : "rgba(232,93,117,0.12)",
            border: `2px solid ${feedback === "right" ? "#2D7A4F" : "#e85d75"}`,
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 28,
              color: feedback === "right" ? "#2D7A4F" : "#e85d75",
              marginBottom: feedback === "wrong" ? 12 : 4,
              letterSpacing: 0.3,
            }}
          >
            {feedback === "right" ? "Correct!" : "Incorrect"}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#555", marginBottom: feedback === "wrong" ? 12 : 0 }}>
            {feedback === "right" ? "You said it right." : "Not a match — try again."}
          </div>
          {feedback === "wrong" && (
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#666", marginBottom: 4 }}>
                  Heard
                </div>
                <div className="arabic arabic-read" style={{ color: "var(--navy)" }}>
                  {heard || "—"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#666", marginBottom: 4 }}>
                  Expected
                </div>
                <div className="arabic arabic-read" style={{ color: "var(--navy)" }}>
                  {targetArabic}
                </div>
              </div>
            </div>
          )}
          {feedback === "right" && heard && (
            <div style={{ marginTop: 8, fontSize: 15, color: "#555" }}>
              Heard: <span className="arabic arabic-inline">{heard}</span>
            </div>
          )}
        </div>
      )}

      {(feedback === "right" || feedback === "wrong" || feedback === "nohear") && (
        <button
          type="button"
          onClick={() => {
            setFeedback("idle");
            setHeard("");
            setInterim("");
            start();
          }}
          style={{
            marginTop: 4,
            padding: "10px 18px",
            borderRadius: 10,
            border: "2px solid var(--navy)",
            background: "white",
            fontWeight: 700,
            cursor: "pointer",
            color: "var(--navy)",
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
