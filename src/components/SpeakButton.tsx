"use client";
import { useState, useCallback } from "react";

interface SpeakButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function SpeakButton({ text, size = "md", className = "" }: SpeakButtonProps) {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const sizes = {
    sm: { btn: 28, icon: 13 },
    md: { btn: 38, icon: 17 },
    lg: { btn: 52, icon: 24 },
  };
  const s = sizes[size];

  const speak = useCallback(async () => {
    if (loading || playing) return;
    setError(false);
    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      setLoading(false);
      setPlaying(true);
      audio.onended = () => { setPlaying(false); URL.revokeObjectURL(url); };
      audio.onerror = () => { setPlaying(false); setError(true); URL.revokeObjectURL(url); };
      await audio.play();
    } catch {
      setLoading(false);
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }, [text, loading, playing]);

  return (
    <button
      onClick={speak}
      title={`Listen: ${text}`}
      className={className}
      style={{
        width: s.btn, height: s.btn, borderRadius: "50%",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        border: "none", cursor: loading || playing ? "default" : "pointer",
        flexShrink: 0,
        background: error ? "#e85d75" : playing ? "var(--green)" : loading ? "var(--gold)" : "var(--navy)",
        transition: "background 0.2s, transform 0.1s",
        transform: playing ? "scale(1.1)" : "scale(1)",
        boxShadow: playing ? "0 0 0 4px rgba(45,122,79,0.25)" : "none",
      }}
    >
      {loading ? (
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" style={{ animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); transform-origin: center; } }`}</style>
        </svg>
      ) : playing ? (
        // Sound waves icon
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="white">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      ) : error ? (
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      ) : (
        // Speaker icon
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="white">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      )}
    </button>
  );
}
