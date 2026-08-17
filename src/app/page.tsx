import Link from "next/link";
import { vocabulary, categories } from "@/lib/vocabulary";

const features = [
  { href: "/flashcards", icon: "🃏", title: "Flashcards", desc: "Flip cards to learn Arabic ↔ English. Study by category." },
  { href: "/phrases", icon: "💬", title: "Common Phrases", desc: "Essential Falahi phrases with transliteration and examples." },
  { href: "/quiz", icon: "🎯", title: "Quiz", desc: "Test yourself — multiple choice questions on your vocabulary." },
  { href: "/lessons", icon: "📖", title: "Lessons", desc: "Structured lessons on greetings, family, food, and more." },
];

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero */}
      <div className="text-center py-12 mb-10 rounded-2xl" style={{ background: "var(--navy)", color: "white" }}>
        <div className="arabic text-6xl mb-4" style={{ color: "var(--gold-light)" }}>فلاحي</div>
        <h1 className="text-3xl font-bold mb-3">Learn Falahi Arabic</h1>
        <p className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
          Master the Iraqi &amp; Gulf dialect — flashcards, phrases, quizzes &amp; lessons
        </p>
        <Link href="/flashcards" style={{
          display: "inline-block", padding: "12px 32px", borderRadius: 10,
          background: "var(--gold)", color: "var(--navy)", fontWeight: 700, fontSize: 16,
        }}>Start Learning →</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Words", value: vocabulary.length },
          { label: "Categories", value: categories.length },
          { label: "Phrases", value: "50+" },
        ].map(s => (
          <div key={s.label} className="text-center py-6 rounded-xl" style={{ background: "white", border: "1px solid #e8e0d0" }}>
            <div className="text-4xl font-bold mb-1" style={{ color: "var(--gold)" }}>{s.value}</div>
            <div className="text-sm font-medium" style={{ color: "var(--navy)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {features.map(f => (
          <Link key={f.href} href={f.href} style={{ textDecoration: "none" }}>
            <div className="p-6 rounded-xl h-full transition-all hover:shadow-md" style={{ background: "white", border: "2px solid #e8e0d0" }}>
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-bold text-lg mb-2" style={{ color: "var(--navy)" }}>{f.title}</div>
              <div className="text-sm" style={{ color: "#666" }}>{f.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Categories */}
      <div className="rounded-xl p-6" style={{ background: "white", border: "1px solid #e8e0d0" }}>
        <h2 className="font-bold text-lg mb-4" style={{ color: "var(--navy)" }}>Browse by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Link key={cat} href={`/flashcards?category=${encodeURIComponent(cat)}`} style={{
              padding: "8px 18px", borderRadius: 999, fontSize: 14, fontWeight: 500,
              background: "var(--navy)", color: "white", textDecoration: "none",
            }}>{cat}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
