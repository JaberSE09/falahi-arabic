import Link from "next/link";
import { vocabulary } from "@/lib/vocabulary";
import { quranVerses, duas, hadiths } from "@/lib/islamic";
import ProgressHint from "@/components/ProgressHint";

const palestinianFeatures = [
  { href: "/review",     icon: "🔁", title: "Review",     desc: "Due today and words you missed" },
  { href: "/pronounce",  icon: "🎙️", title: "Pronounce",  desc: "Say words aloud — Right or Wrong" },
  { href: "/flashcards", icon: "🃏", title: "Flashcards", desc: "Flip cards — Arabic to English, study by category" },
  { href: "/phrases",    icon: "💬", title: "Phrases",    desc: "All words with pronunciation guide" },
  { href: "/quiz",       icon: "🎯", title: "Quiz",       desc: "Multiple choice, including My gaps" },
  { href: "/lessons",    icon: "📖", title: "Lessons",    desc: "7 structured beginner lessons" },
];

const tutoringFeatures = [
  { href: "/tutoring", icon: "🎓", title: "Tutoring Hub",    desc: "All 6 lesson topics in one place" },
  { href: "/tutoring/lesson?id=days",         icon: "📅", title: "Days & Time Nouns", desc: "Days of week, today, tomorrow, seasons" },
  { href: "/tutoring/lesson?id=wh-questions", icon: "❓", title: "WH-Questions",      desc: "Shū, Wēn, Lēsh, Kīf, Addēsh..." },
  { href: "/tutoring/lesson?id=connectors",   icon: "🔗", title: "Connectors",        desc: "In, on, from, because, then, first..." },
  { href: "/tutoring/lesson?id=time-range-1", icon: "⏰", title: "Telling Time (:00–:30)", desc: "Past the hour — wa + minutes" },
  { href: "/tutoring/lesson?id=time-range-2", icon: "⏱️", title: "Telling Time (:30–:59)", desc: "Before the hour — illa system" },
  { href: "/tutoring/lesson?id=plurals",      icon: "🔢", title: "Plural Forms",      desc: "Days, weeks, months, years, seasons" },
];

const islamicFeatures = [
  { href: "/quran",  icon: "📖", title: "Quran Verses", desc: "Key ayahs with translation and audio" },
  { href: "/dua",    icon: "🤲", title: "Daily Duas",   desc: "Duas with when and how to say them" },
  { href: "/hadith", icon: "📿", title: "Hadith",       desc: "Prophetic narrations with translation" },
];

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "44px 24px 40px", marginBottom: 28, borderRadius: 24, background: "var(--navy)", color: "white" }}>
        <div className="arabic" style={{ fontSize: 64, color: "var(--gold-light)", marginBottom: 10 }}>فلاحي</div>
        <h1 style={{ fontSize: "clamp(24px, 6vw, 34px)", fontWeight: 800, marginBottom: 12, margin: "0 0 12px", lineHeight: 1.3 }}>Learn Arabic — Two Ways</h1>
        <p style={{ fontSize: "clamp(16px, 3vw, 20px)", color: "rgba(255,255,255,0.8)", marginBottom: 28, lineHeight: 1.6, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          Palestinian dialect for daily life · Quranic Arabic for Islamic learning
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <Link href="/review" style={{ padding: "14px 28px", borderRadius: 12, background: "var(--gold)", color: "white", fontWeight: 800, fontSize: 17, textDecoration: "none" }}>Review</Link>
          <Link href="/pronounce" style={{ padding: "14px 28px", borderRadius: 12, background: "rgba(255,255,255,0.15)", color: "white", fontWeight: 800, fontSize: 17, textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)" }}>Pronounce</Link>
          <Link href="/flashcards" style={{ padding: "14px 28px", borderRadius: 12, background: "rgba(255,255,255,0.15)", color: "white", fontWeight: 800, fontSize: 17, textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)" }}>Flashcards</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Words",    value: vocabulary.length,  color: "var(--gold)" },
          { label: "Verses",   value: quranVerses.length, color: "#2563EB" },
          { label: "Duas",     value: duas.length,        color: "var(--green)" },
          { label: "Hadiths",  value: hadiths.length,     color: "#7C3AED" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center", padding: "20px 10px", borderRadius: 16, background: "white", border: "2px solid #e8e0d0" }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#555", marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <ProgressHint />

      {/* Palestinian section */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 6, height: 30, borderRadius: 4, background: "var(--gold)", flexShrink: 0 }} />
          <h2 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, color: "var(--navy)", margin: 0 }}>🇵🇸 Palestinian Dialect</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
          {palestinianFeatures.map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
              <div style={{ padding: "22px 18px", borderRadius: 16, background: "white", border: "2px solid #ddd", height: "100%", transition: "border-color 0.15s" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: "var(--navy)", marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 15, color: "#555", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Islamic section */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 6, height: 30, borderRadius: 4, background: "var(--green)", flexShrink: 0 }} />
          <h2 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, color: "var(--navy)", margin: 0 }}>☪️ Islamic Arabic</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
          {islamicFeatures.map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
              <div style={{ padding: "22px 18px", borderRadius: 16, background: "white", border: "2px solid #ddd", height: "100%" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: "var(--navy)", marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 15, color: "#555", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tutoring section */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 6, height: 30, borderRadius: 4, background: "#2563EB", flexShrink: 0 }} />
          <h2 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, color: "var(--navy)", margin: 0 }}>🎓 Arabic Tutoring</h2>
        </div>
        <div style={{ padding: "12px 16px", borderRadius: 12, background: "#EFF6FF", border: "2px solid #BFDBFE", marginBottom: 14, fontSize: 14, color: "#1E40AF" }}>
          📋 Structured lessons from your study sheets — separate from flashcards
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
          {tutoringFeatures.slice(0, 4).map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
              <div style={{ padding: "20px 16px", borderRadius: 16, background: "white", border: "2px solid #ddd", borderLeft: "4px solid #2563EB", height: "100%" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "var(--navy)", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 14, color: "#555", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 10 }}>
          <Link href="/tutoring" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, background: "#2563EB", color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            View All 6 Lessons →
          </Link>
        </div>
      </div>

      {/* Study modes */}
      <div style={{ borderRadius: 20, padding: "22px 24px", background: "var(--navy)", color: "white", display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ fontSize: 40, flexShrink: 0 }}>⚡</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 19, marginBottom: 8 }}>3 Study Modes — like Quizlet</div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            🃏 <strong style={{ color: "var(--gold-light)" }}>Flashcard</strong> — flip to reveal<br/>
            🎯 <strong style={{ color: "var(--gold-light)" }}>Learn</strong> — multiple choice quiz<br/>
            🔗 <strong style={{ color: "var(--gold-light)" }}>Match</strong> — tap matching pairs
          </div>
        </div>
      </div>
    </div>
  );
}
