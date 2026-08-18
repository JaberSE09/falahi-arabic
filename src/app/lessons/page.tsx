import Link from "next/link";

const lessons = [
  {
    id: 1, title: "Greetings & Introductions", emoji: "👋", level: "Beginner",
    desc: "Learn how to greet people in Palestinian Arabic — مرحبا, كيفك, and how to respond naturally.",
    topics: ["مرحبا — Hello", "كيفك — How are you?", "منيح — Fine", "مع السلامة — Goodbye", "صباح الخير — Good morning"],
    category: "Greetings",
  },
  {
    id: 2, title: "Family Members", emoji: "👨‍👩‍👧‍👦", level: "Beginner",
    desc: "Learn immediate and extended family words in Palestinian dialect.",
    topics: ["أمّي — My mother", "أبوي — My father", "أخوي — My brother", "أختي — My sister", "جدّو / تتّا — Grandparents"],
    category: "Family",
  },
  {
    id: 3, title: "Food & Palestinian Cuisine", emoji: "🥙", level: "Beginner",
    desc: "Essential food and drink vocabulary — perfect for family meals, markets, and restaurants.",
    topics: ["مي — Water", "شاي — Tea", "خبز — Bread", "حمّص — Hummus", "زيت وزعتر — Za'atar & olive oil"],
    category: "Food & Drink",
  },
  {
    id: 4, title: "Numbers 1–20", emoji: "🔢", level: "Beginner",
    desc: "Count in Palestinian Arabic. Numbers sound slightly different from MSA — learn the dialect forms.",
    topics: ["واحد — One", "اثنين — Two (Itnēn not Ithnān)", "ثلاثة — Three (Tlāte)", "عشرة — Ten (ʿAshra)", "عشرين — Twenty"],
    category: "Numbers",
  },
  {
    id: 5, title: "Essential Question Words", emoji: "❓", level: "Beginner",
    desc: "The key question words in Palestinian dialect — شو، وين، ليش، كيف، إيمتى. These are different from MSA.",
    topics: ["شو — What", "وين — Where", "ليش — Why", "كيف — How", "إيمتى — When"],
    category: "Phrases",
  },
  {
    id: 6, title: "Daily Life & Getting Around", emoji: "🏘️", level: "Beginner",
    desc: "Words you'll use every day — home, work, market, transport, and essential commands like يلّا.",
    topics: ["يلّا — Let's go!", "بيت — Home", "شغل — Work", "سوق — Market", "دكان — Shop"],
    category: "Daily Life",
  },
  {
    id: 7, title: "Colors", emoji: "🎨", level: "Beginner",
    desc: "Colors in Palestinian Arabic — useful for describing clothes, objects, and surroundings.",
    topics: ["أحمر — Red", "أزرق — Blue", "أخضر — Green", "أبيض — White", "وردي — Pink"],
    category: "Colors",
  },
];

const levels: Record<string, string> = {
  Beginner: "#2D7A4F",
  Intermediate: "#C9963A",
  Advanced: "#8B2020",
};

export default function Lessons() {
  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>Lessons</h1>
      <p className="text-sm mb-8" style={{ color: "#666" }}>Structured lessons in authentic Palestinian dialect</p>

      <div className="grid grid-cols-1 gap-4">
        {lessons.map((lesson, i) => (
          <div key={lesson.id} className="rounded-xl p-6" style={{ background: "white", border: "1px solid #e8e0d0" }}>
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">{lesson.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-bold text-lg" style={{ color: "var(--navy)" }}>
                    Lesson {i + 1}: {lesson.title}
                  </h2>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                    background: levels[lesson.level] + "20",
                    color: levels[lesson.level],
                  }}>{lesson.level}</span>
                </div>
                <p className="text-sm mb-4" style={{ color: "#666" }}>{lesson.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.topics.map(t => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ background: "var(--cream)", color: "var(--navy)", border: "1px solid #e8e0d0" }}>
                      <span className="arabic">{t.split(" — ")[0]}</span> — {t.split(" — ")[1]}
                    </span>
                  ))}
                </div>
                <Link href={`/flashcards?category=${encodeURIComponent(lesson.category)}`} style={{
                  display: "inline-block", padding: "8px 20px", borderRadius: 8,
                  background: "var(--navy)", color: "white", fontWeight: 600, fontSize: 13,
                  textDecoration: "none",
                }}>
                  Study with Flashcards →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-xl text-center" style={{ background: "var(--navy)", color: "white" }}>
        <div className="text-2xl mb-2">🚧</div>
        <div className="font-bold mb-1">More lessons coming soon</div>
        <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          Intermediate: verbs, sentence structure, past tense, shopping phrases, expressions & proverbs
        </div>
      </div>
    </div>
  );
}
