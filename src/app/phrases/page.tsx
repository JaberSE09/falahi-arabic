import { vocabulary, categories } from "@/lib/vocabulary";
import ArabicForms, { ExampleForms } from "@/components/ArabicForms";

export default function Phrases() {
  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = vocabulary.filter(w => w.category === cat);
    return acc;
  }, {} as Record<string, typeof vocabulary>);

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 6 }}>Phrases & Vocabulary</h1>
      <p style={{ fontSize: 16, color: "#666", marginBottom: 28, lineHeight: 1.5 }}>Tap the 🔊 speaker to hear any word spoken aloud in Palestinian Arabic</p>

      {Object.entries(grouped).map(([cat, words]) => (
        <div key={cat} style={{ marginBottom: 28, borderRadius: 18, overflow: "hidden", border: "2px solid #ddd" }}>
          <div style={{ padding: "14px 20px", fontWeight: 800, fontSize: 17, letterSpacing: 0.5, background: "var(--navy)", color: "var(--gold-light)" }}>
            {cat} — {words.length} words
          </div>
          <div style={{ background: "white" }}>
            {words.map((w, i) => (
              <div key={w.id} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 20px", borderTop: i>0 ? "1px solid #eee" : "none", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 220px" }}>
                  <ArabicForms word={w} tone="dark" scale="read" />
                </div>
                <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "var(--navy)", lineHeight: 1.3 }}>{w.english}</div>
                  {w.example && (
                    <div style={{ marginTop: 10 }}>
                      <ExampleForms word={w} tone="dark" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
