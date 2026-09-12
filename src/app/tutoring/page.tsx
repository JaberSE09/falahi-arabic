"use client";
import Link from "next/link";
import { tutoringLessons } from "@/lib/tutoring";

export default function TutoringPage() {
  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{
        textAlign: "center", padding: "36px 24px 32px",
        borderRadius: 24, background: "var(--navy)", color: "white", marginBottom: 28
      }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}>🎓</div>
        <h1 style={{ fontSize: "clamp(22px,5vw,30px)", fontWeight: 800, margin: "0 0 10px" }}>
          Arabic Tutoring
        </h1>
        <p style={{ fontSize: "clamp(15px,3vw,18px)", color: "rgba(255,255,255,0.8)", margin: 0, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
          Structured lessons from your study sheets — days, time, questions, connectors
        </p>
      </div>

      {/* Notice */}
      <div style={{
        padding: "14px 18px", borderRadius: 14, background: "#FEF3C7",
        border: "2px solid #F59E0B", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start"
      }}>
        <div style={{ fontSize: 22, flexShrink: 0 }}>💡</div>
        <div style={{ fontSize: 15, color: "#92400E", lineHeight: 1.6 }}>
          <strong>This section is separate from flashcards.</strong> These are structured lessons based on your handwritten study sheets — Palestinian dialect grammar and vocabulary in context.
        </div>
      </div>

      {/* Lesson grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {tutoringLessons.map((lesson) => (
          <Link key={lesson.id} href={`/tutoring/lesson?id=${lesson.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              padding: "24px 20px", borderRadius: 18, background: "white",
              border: `2px solid ${lesson.color}22`,
              borderLeft: `5px solid ${lesson.color}`,
              transition: "box-shadow 0.15s, transform 0.15s",
              cursor: "pointer", height: "100%"
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${lesson.color}33`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${lesson.color}15`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 26, flexShrink: 0
                }}>
                  {lesson.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 17, color: "var(--navy)", lineHeight: 1.2 }}>
                    {lesson.title}
                  </div>
                  <div style={{ fontSize: 13, color: lesson.color, fontWeight: 600, marginTop: 2 }}>
                    {lesson.items.length} items
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
                {lesson.description}
              </div>
              {lesson.rules && (
                <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 10, background: `${lesson.color}08` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: lesson.color, marginBottom: 4 }}>KEY RULES</div>
                  <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>
                    {lesson.rules[0]}
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Study tip */}
      <div style={{
        marginTop: 28, borderRadius: 20, padding: "20px 24px",
        background: "var(--navy)", color: "white",
        display: "flex", alignItems: "flex-start", gap: 14
      }}>
        <div style={{ fontSize: 36, flexShrink: 0 }}>📋</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Suggested Study Order</div>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
            1️⃣ Days of the Week &nbsp;→&nbsp;
            2️⃣ WH-Questions &nbsp;→&nbsp;
            3️⃣ Connectors &nbsp;→&nbsp;
            4️⃣ Telling Time (Minutes) &nbsp;→&nbsp;
            5️⃣ Telling Time (To the Hour) &nbsp;→&nbsp;
            6️⃣ Plural Forms
          </div>
        </div>
      </div>
    </div>
  );
}
