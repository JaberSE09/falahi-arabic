import Link from "next/link";
import { vocabulary } from "@/lib/vocabulary";
import { quranVerses, duas, hadiths } from "@/lib/islamic";

const palestinianFeatures = [
  { href: "/flashcards", icon: "🃏", title: "Flashcards", desc: "Flip cards, study by category" },
  { href: "/phrases",    icon: "💬", title: "Phrases",    desc: "All vocab with transliteration" },
  { href: "/quiz",       icon: "🎯", title: "Quiz",       desc: "Multiple choice, AR↔EN" },
  { href: "/lessons",    icon: "📖", title: "Lessons",    desc: "7 structured beginner lessons" },
];

const islamicFeatures = [
  { href: "/quran",  icon: "📖", title: "Quran",  desc: "Key ayahs by topic" },
  { href: "/dua",    icon: "🤲", title: "Duas",   desc: "Daily duas + when to say them" },
  { href: "/hadith", icon: "📿", title: "Hadith", desc: "Prophetic narrations" },
];

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "40px 20px 36px", marginBottom: 24, borderRadius: 20, background: "var(--navy)", color: "white" }}>
        <div className="arabic" style={{ fontSize: 52, color: "var(--gold-light)", marginBottom: 8 }}>فلاحي</div>
        <h1 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 700, marginBottom: 10, margin: "0 0 10px" }}>Learn Arabic — Two Ways</h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 24, lineHeight: 1.5 }}>
          Palestinian dialect for daily life · Quranic Arabic for Islamic learning
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
          <Link href="/flashcards" style={{ padding: "11px 22px", borderRadius: 10, background: "var(--gold)", color: "var(--navy)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>🇵🇸 Palestinian Arabic</Link>
          <Link href="/quran" style={{ padding: "11px 22px", borderRadius: 10, background: "rgba(255,255,255,0.12)", color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>☪️ Islamic Arabic</Link>
        </div>
      </div>

      {/* Stats — 2x2 on mobile, 4 across on desktop */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 28 }}>
        {[
          { label: "Palestinian Words", value: vocabulary.length,     color: "var(--gold)" },
          { label: "Quran Verses",      value: quranVerses.length,    color: "#4A90D9" },
          { label: "Daily Duas",        value: duas.length,           color: "var(--green)" },
          { label: "Hadiths",           value: hadiths.length,        color: "#8B5CF6" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center", padding: "16px 8px", borderRadius: 14, background: "white", border: "1px solid #e8e0d0" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#888", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Palestinian section */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 4, height: 24, borderRadius: 4, background: "var(--gold)", flexShrink: 0 }} />
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", margin: 0 }}>🇵🇸 Palestinian Dialect</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          {palestinianFeatures.map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
              <div style={{ padding: "18px 16px", borderRadius: 14, background: "white", border: "2px solid #e8e0d0", height: "100%" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#777", lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Islamic section */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 4, height: 24, borderRadius: 4, background: "var(--green)", flexShrink: 0 }} />
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", margin: 0 }}>☪️ Islamic Arabic</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          {islamicFeatures.map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
              <div style={{ padding: "18px 16px", borderRadius: 14, background: "white", border: "2px solid #e8e0d0", height: "100%" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#777", lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Study modes callout */}
      <div style={{ borderRadius: 16, padding: "18px 20px", background: "var(--navy)", color: "white", display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ fontSize: 32, flexShrink: 0 }}>⚡</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>3 Quizlet-style study modes</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
            🃏 <span style={{ color: "var(--gold-light)" }}>Flashcard</span> · 🎯 <span style={{ color: "var(--gold-light)" }}>Learn (quiz)</span> · 🔗 <span style={{ color: "var(--gold-light)" }}>Match (tap pairs)</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>Available on all Quran, Duas &amp; Hadith pages</div>
        </div>
      </div>
    </div>
  );
}
