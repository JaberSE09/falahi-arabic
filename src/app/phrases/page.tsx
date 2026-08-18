import { vocabulary, categories } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";

export default function Phrases() {
  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = vocabulary.filter(w => w.category === cat);
    return acc;
  }, {} as Record<string, typeof vocabulary>);

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>Phrases & Vocabulary</h1>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Tap 🔊 to hear any word in Palestinian Arabic</p>

      {Object.entries(grouped).map(([cat, words]) => (
        <div key={cat} style={{ marginBottom: 24, borderRadius: 16, overflow: "hidden", border: "1px solid #e8e0d0" }}>
          <div style={{ padding: "12px 18px", fontWeight: 700, fontSize: 13, letterSpacing: 1, background: "var(--navy)", color: "var(--gold-light)" }}>
            {cat.toUpperCase()} — {words.length} words
          </div>
          <div style={{ background: "white" }}>
            {words.map((w, i) => (
              <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderTop: i>0?"1px solid #f5f0e8":"none" }}>
                <SpeakButton text={w.arabic} size="md" />
                <div className="arabic" style={{ fontSize: 24, color: "var(--navy)", minWidth: 70, textAlign: "right", flexShrink: 0 }}>{w.arabic}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--navy)" }}>{w.english}</div>
                  <div style={{ fontSize: 12, fontStyle: "italic", color: "var(--gold)" }}>{w.transliteration}</div>
                  {w.example && (
                    <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                      <SpeakButton text={w.example} size="sm" />
                      <span style={{ fontSize: 11, color: "#999" }}>
                        <span className="arabic">{w.example}</span> — {w.exampleTranslation}
                      </span>
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
