"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { tutoringLessons } from "@/lib/tutoring";
import SpeakButton from "@/components/SpeakButton";

function LessonContent() {
  const params = useSearchParams();
  const id = params.get("id") || "";
  const lesson = tutoringLessons.find((l) => l.id === id);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<"study" | "cards">("study");

  if (!lesson) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 48 }}>❓</div>
        <p>Lesson not found.</p>
        <Link href="/tutoring" style={{ color: "var(--gold)" }}>← Back to Tutoring</Link>
      </div>
    );
  }

  const toggleReveal = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="fade-in">
      {/* Back */}
      <Link href="/tutoring" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#666", fontSize: 15, textDecoration: "none", marginBottom: 18 }}>
        ← Back to Tutoring
      </Link>

      {/* Header */}
      <div style={{
        padding: "28px 24px 24px", borderRadius: 20,
        background: "var(--navy)", color: "white", marginBottom: 24,
        borderLeft: `6px solid ${lesson.color}`
      }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>{lesson.emoji}</div>
        <h1 style={{ fontSize: "clamp(20px,4vw,28px)", fontWeight: 800, margin: "0 0 8px" }}>{lesson.title}</h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", margin: 0 }}>{lesson.description}</p>
        <div style={{ marginTop: 12, fontSize: 14, color: lesson.color, fontWeight: 700 }}>
          {lesson.items.length} vocabulary items
        </div>
      </div>

      {/* Key Rules */}
      {lesson.rules && lesson.rules.length > 0 && (
        <div style={{
          padding: "18px 20px", borderRadius: 16,
          background: `${lesson.color}10`, border: `2px solid ${lesson.color}30`,
          marginBottom: 24
        }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: lesson.color, marginBottom: 12 }}>
            📌 Key Rules
          </div>
          <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            {lesson.rules.map((rule, i) => (
              <li key={i} style={{ fontSize: 15, color: "#333", lineHeight: 1.6 }}>{rule}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["study", "cards"] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); setRevealed(new Set()); }} style={{
            padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 15,
            border: "2px solid " + (mode === m ? lesson.color : "#ddd"),
            background: mode === m ? lesson.color : "white",
            color: mode === m ? "white" : "#555",
            cursor: "pointer", transition: "all 0.15s"
          }}>
            {m === "study" ? "📋 Study List" : "🃏 Flip Cards"}
          </button>
        ))}
      </div>

      {/* Study list mode */}
      {mode === "study" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lesson.items.map((item, i) => (
            <div key={i} style={{
              padding: "16px 18px", borderRadius: 14, background: "white",
              border: "2px solid #e8e0d0", display: "flex", alignItems: "center", gap: 14
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: `${lesson.color}15`, display: "flex", alignItems: "center",
                justifyContent: "center", fontWeight: 800, color: lesson.color, fontSize: 14
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="arabic" style={{ fontSize: 22, color: "var(--navy)", fontWeight: 700, marginBottom: 2 }}>
                  {item.arabic}
                </div>
                <div style={{ fontSize: 14, color: "#888", marginBottom: 2, fontStyle: "italic" }}>
                  {item.transliteration}
                </div>
                <div style={{ fontSize: 15, color: "#333", fontWeight: 600 }}>
                  {item.english}
                </div>
                {item.note && (
                  <div style={{ fontSize: 13, color: "#777", marginTop: 4, padding: "4px 8px", background: "#f5f5f5", borderRadius: 6 }}>
                    💡 {item.note}
                  </div>
                )}
              </div>
              <SpeakButton text={item.arabic} size={36} />
            </div>
          ))}
        </div>
      )}

      {/* Flip cards mode */}
      {mode === "cards" && (
        <div>
          <p style={{ fontSize: 14, color: "#666", marginBottom: 16, textAlign: "center" }}>
            Tap a card to reveal the English translation
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {lesson.items.map((item, i) => (
              <div key={i} onClick={() => toggleReveal(i)} style={{
                minHeight: 140, borderRadius: 16, cursor: "pointer",
                padding: "20px 18px", background: revealed.has(i) ? `${lesson.color}08` : "var(--navy)",
                border: `2px solid ${revealed.has(i) ? lesson.color : "transparent"}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                textAlign: "center", transition: "all 0.2s", userSelect: "none"
              }}>
                {!revealed.has(i) ? (
                  <>
                    <div className="arabic" style={{ fontSize: 28, color: "white", fontWeight: 700, marginBottom: 6 }}>
                      {item.arabic}
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
                      {item.transliteration}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 10 }}>
                      tap to reveal
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 16, fontWeight: 800, color: lesson.color, marginBottom: 6 }}>
                      {item.english}
                    </div>
                    <div className="arabic" style={{ fontSize: 20, color: "var(--navy)", fontWeight: 700, marginBottom: 4 }}>
                      {item.arabic}
                    </div>
                    <div style={{ fontSize: 13, color: "#777", fontStyle: "italic", marginBottom: 8 }}>
                      {item.transliteration}
                    </div>
                    {item.note && (
                      <div style={{ fontSize: 12, color: "#888", background: "#f5f5f5", padding: "4px 8px", borderRadius: 6 }}>
                        {item.note}
                      </div>
                    )}
                    <SpeakButton text={item.arabic} size={30} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nav between lessons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 12 }}>
        {(() => {
          const idx = tutoringLessons.findIndex(l => l.id === id);
          const prev = tutoringLessons[idx - 1];
          const next = tutoringLessons[idx + 1];
          return (
            <>
              {prev ? (
                <Link href={`/tutoring/lesson?id=${prev.id}`} style={{ padding: "12px 20px", borderRadius: 12, background: "white", border: "2px solid #ddd", textDecoration: "none", color: "var(--navy)", fontWeight: 700, fontSize: 15 }}>
                  ← {prev.emoji} {prev.title}
                </Link>
              ) : <div />}
              {next && (
                <Link href={`/tutoring/lesson?id=${next.id}`} style={{ padding: "12px 20px", borderRadius: 12, background: lesson.color, textDecoration: "none", color: "white", fontWeight: 700, fontSize: 15 }}>
                  {next.emoji} {next.title} →
                </Link>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: 40 }}>Loading...</div>}>
      <LessonContent />
    </Suspense>
  );
}
