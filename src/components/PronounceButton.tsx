"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getSpeechRecognitionCtor,
  pronunciationMatches,
  type SpeechRecognitionLike,
} from "@/lib/pronounce";

type Feedback = "idle" | "listening" | "right" | "wrong" | "unsupported" | "error";

interface PronounceButtonProps {
  targetArabic: string;
  onResult?: (ok: boolean, heard: string) => void;
  size?: "md" | "lg";
}

export default function PronounceButton({
  targetArabic,
  onResult,
  size = "lg",
}: PronounceButtonProps) {
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [heard, setHeard] = useState("");
  const recogRef = useRef<SpeechRecognitionLike | null>(null);
  const supported = typeof window !== "undefined" && !!getSpeechRecognitionCtor();

  useEffect(() => {
    return () => {
      try {
        recogRef.current?.abort();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const stop = useCallback(() => {
    try {
      recogRef.current?.stop();
    } catch {
      /* ignore */
    }
  }, []);

  const start = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setFeedback("unsupported");
      return;
    }
    setHeard("");
    setFeedback("listening");
    try {
      recogRef.current?.abort();
    } catch {
      /* ignore */
    }
    const recog = new Ctor();
    recogRef.current = recog;
    recog.lang = "ar-SA";
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    recog.continuous = false;
    recog.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim() ?? "";
      setHeard(transcript);
      const ok = pronunciationMatches(transcript, targetArabic);
      setFeedback(ok ? "right" : "wrong");
      onResult?.(ok, transcript);
    };
    recog.onerror = (event) => {
      if (event.error === "aborted" || event.error === "no-speech") {
        setFeedback("idle");
        return;
      }
      setFeedback("error");
    };
    recog.onend = () => {
      setFeedback((f) => (f === "listening" ? "idle" : f));
    };
    try {
      recog.start();
    } catch {
      setFeedback("error");
    }
  }, [onResult, targetArabic]);

  const btnSize = size === "lg" ? 72 : 52;
  const label =
    feedback === "listening"
      ? "Listening…"
      : feedback === "right"
        ? "Right"
        : feedback === "wrong"
          ? "Wrong"
          : feedback === "unsupported"
            ? "Mic not supported — use Chrome"
            : feedback === "error"
              ? "Mic error — try again"
              : "Tap mic and say the word";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <button
        type="button"
        aria-label="Speak the Arabic word"
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
                : feedback === "wrong" || feedback === "error"
                  ? "#e85d75"
                  : "var(--navy)",
          color: "white",
          boxShadow: feedback === "listening" ? "0 0 0 8px rgba(201,150,58,0.25)" : "none",
        }}
      >
        {feedback === "listening" ? "…" : feedback === "right" ? "✓" : feedback === "wrong" ? "✕" : "🎙️"}
      </button>
      <div
        style={{
          fontWeight: 800,
          fontSize: 18,
          color:
            feedback === "right"
              ? "#2D7A4F"
              : feedback === "wrong"
                ? "#e85d75"
                : "var(--navy)",
          textAlign: "center",
        }}
      >
        {label}
      </div>
      {heard && (
        <div style={{ fontSize: 15, color: "#555", textAlign: "center" }}>
          Heard: <span className="arabic" style={{ fontSize: 22 }}>{heard}</span>
        </div>
      )}
      {(feedback === "right" || feedback === "wrong") && (
        <button
          type="button"
          onClick={() => {
            setFeedback("idle");
            setHeard("");
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
