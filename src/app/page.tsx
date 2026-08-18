import Link from "next/link";
import { vocabulary } from "@/lib/vocabulary";
import { quranVerses, duas, hadiths } from "@/lib/islamic";

const palestinianFeatures = [
  { href: "/flashcards", icon: "🃏", title: "Flashcards", desc: "Flip cards — Arabic ↔ English, study by category" },
  { href: "/phrases",    icon: "💬", title: "Phrases",    desc: "All vocab with transliteration and examples" },
  { href: "/quiz",       icon: "🎯", title: "Quiz",       desc: "Multiple choice: AR→EN and EN→AR modes" },
  { href: "/lessons",    icon: "📖", title: "Lessons",    desc: "7 structured beginner lessons" },
];

const islamicFeatures = [
  { href: "/quran",  icon: "📖", title: "Quran Verses", desc: "Key ayahs with transliteration, browse by topic" },
  { href: "/dua",    icon: "🤲", title: "Daily Duas",   desc: "Authentic duas with when and how to say them" },
  { href: "/hadith", icon: "📿", title: "Hadith",       desc: "Prophetic narrations with Arabic & transliteration" },
];

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero */}
      <div className="text-center py-12 mb-10 rounded-2xl" style={{ background: "var(--navy)", color: "white" }}>
        <div className="arabic text-6xl mb-4" style={{ color: "var(--gold-light)" }}>فلاحي</div>
        <h1 className="text-3xl font-bold mb-3">Learn Arabic — Two Ways</h1>
        <p className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
          Palestinian dialect for everyday life · Quranic Arabic for Islamic learning
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <Link href="/flashcards" style={{ padding: "11px 26px", borderRadius: 10, background: "var(--gold)", color: "var(--navy)", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>🇵🇸 Start Palestinian Arabic</Link>
          <Link href="/quran" style={{ padding: "11px 26px", borderRadius: 10, background: "rgba(255,255,255,0.12)", color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>☪️ Start Islamic Arabic</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { label: "Palestinian Words", value: vocabulary.length, color: "var(--gold)" },
          { label: "Quran Verses",      value: quranVerses.length, color: "#4A90D9" },
          { label: "Daily Duas",        value: duas.length,        color: "#2D7A4F" },
          { label: "Hadiths",           value: hadiths.length,     color: "#8B5CF6" },
        ].map(s => (
          <div key={s.label} className="text-center py-5 rounded-xl" style={{ background: "white", border: "1px solid #e8e0d0" }}>
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-semibold" style={{ color: "#888" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Palestinian Arabic section */}
      <div className="mb-10">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 4, height: 28, borderRadius: 4, background: "var(--gold)" }} />
          <h2 className="text-xl font-bold" style={{ color: "var(--navy)" }}>🇵🇸 Palestinian Dialect</h2>
          <span style={{ fontSize: 12, color: "#888" }}>— كيفك، بدّي، يلّا</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {palestinianFeatures.map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
              <div className="p-5 rounded-xl h-full" style={{ background: "white", border: "2px solid #e8e0d0", transition: "border-color 0.15s" }}>
                <div className="text-2xl mb-2">{f.icon}</div>
                <div className="font-bold mb-1" style={{ color: "var(--navy)" }}>{f.title}</div>
                <div className="text-sm" style={{ color: "#777" }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Islamic Arabic section */}
      <div className="mb-6">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 4, height: 28, borderRadius: 4, background: "#2D7A4F" }} />
          <h2 className="text-xl font-bold" style={{ color: "var(--navy)" }}>☪️ Islamic Arabic</h2>
          <span style={{ fontSize: 12, color: "#888" }}>— بسم الله الرحمن الرحيم</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {islamicFeatures.map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
              <div className="p-5 rounded-xl h-full" style={{ background: "white", border: "2px solid #e8e0d0" }}>
                <div className="text-2xl mb-2">{f.icon}</div>
                <div className="font-bold mb-1" style={{ color: "var(--navy)" }}>{f.title}</div>
                <div className="text-sm" style={{ color: "#777" }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Study modes callout */}
      <div style={{ borderRadius: 16, padding: "20px 24px", background: "var(--navy)", color: "white", display: "flex", alignItems: "center", gap: 20 }}>
        <div className="text-4xl">⚡</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>3 Quizlet-style study modes</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
            <span style={{ color: "var(--gold-light)" }}>🃏 Flashcard</span> — flip cards · 
            <span style={{ color: "var(--gold-light)" }}> 🎯 Learn</span> — multiple choice quiz · 
            <span style={{ color: "var(--gold-light)" }}> 🔗 Match</span> — tap pairs
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Available in Quran, Duas, and Hadith — click Study on any section</div>
        </div>
      </div>
    </div>
  );
}
