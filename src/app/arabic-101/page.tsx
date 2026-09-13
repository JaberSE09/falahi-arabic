import Link from "next/link";
import { lessons } from "@/lib/lessons";

const tools = [
  { href: "/lessons", icon: "📖", title: "Lessons", desc: "7 beginner units with topic lists" },
  { href: "/flashcards", icon: "🃏", title: "Flashcards", desc: "Flip cards and mark what you know" },
  { href: "/phrases", icon: "💬", title: "Phrases", desc: "Browse all words with audio" },
  { href: "/quiz", icon: "🎯", title: "Quiz", desc: "Multiple choice practice" },
  { href: "/review", icon: "🔁", title: "Review", desc: "Due and missed words" },
  { href: "/pronounce", icon: "🎙️", title: "Pronounce", desc: "Say words — Right or Wrong" },
];

export default function Arabic101Page() {
  return (
    <div className="fade-in">
      <div
        style={{
          borderRadius: 24,
          padding: "36px 24px",
          marginBottom: 28,
          background: "var(--navy)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 0.04,
            color: "var(--gold-light)",
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          Fall 2025
        </div>
        <h1
          style={{
            fontSize: "clamp(26px, 6vw, 36px)",
            fontWeight: 800,
            margin: "0 0 14px",
            lineHeight: 1.25,
            maxWidth: 640,
          }}
        >
          Arabic 101: The Beginner&apos;s Guide to Learning Arabic
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 3vw, 19px)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 560,
          }}
        >
          A separate beginner path for Fall 2025 — syllabus, then study with flashcards, phrases, quiz, and games.
        </p>
      </div>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>
          Study tools
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {tools.map((t) => (
            <Link key={t.href} href={t.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  padding: "20px 16px",
                  borderRadius: 16,
                  background: "white",
                  border: "2px solid #e8e0d0",
                  height: "100%",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }} aria-hidden>
                  {t.icon}
                </div>
                <div style={{ fontWeight: 800, fontSize: 17, color: "var(--navy)", marginBottom: 4 }}>{t.title}</div>
                <div style={{ fontSize: 14, color: "#555", lineHeight: 1.45 }}>{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--navy)", margin: 0 }}>Syllabus</h2>
          <Link href="/lessons" style={{ fontWeight: 700, fontSize: 15, color: "var(--gold)", textDecoration: "none" }}>
            Open full lessons →
          </Link>
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {lessons.map((lesson, i) => (
            <li
              key={lesson.id}
              style={{
                background: "white",
                border: "1px solid #e8e0d0",
                borderRadius: 16,
                padding: "18px 20px",
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ fontSize: 28, flexShrink: 0 }} aria-hidden>
                  {lesson.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "var(--navy)", marginBottom: 6 }}>
                    Unit {i + 1}: {lesson.title}
                  </div>
                  <p style={{ margin: "0 0 12px", fontSize: 15, color: "#555", lineHeight: 1.5 }}>{lesson.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                    {lesson.topics.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 999,
                          background: "var(--cream)",
                          border: "1px solid #e8e0d0",
                          fontSize: 15,
                          color: "var(--navy)",
                        }}
                      >
                        <span className="arabic" style={{ fontSize: 24 }}>
                          {t.split(" — ")[0]}
                        </span>
                        {" — "}
                        {t.split(" — ")[1]}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/flashcards?category=${encodeURIComponent(lesson.category)}`}
                    style={{
                      display: "inline-block",
                      padding: "10px 18px",
                      borderRadius: 10,
                      background: "var(--navy)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    Study this unit →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
