import { vocabulary, categories } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";

export default function Phrases() {
  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = vocabulary.filter(w => w.category === cat);
    return acc;
  }, {} as Record<string, typeof vocabulary>);

  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>Phrases & Vocabulary</h1>
      <p className="text-sm mb-8" style={{ color: "#666" }}>Tap 🔊 on any word to hear it spoken in Falahi Arabic</p>

      {Object.entries(grouped).map(([cat, words]) => (
        <div key={cat} className="mb-8 rounded-xl overflow-hidden" style={{ border: "1px solid #e8e0d0" }}>
          <div className="px-5 py-3 font-bold text-sm" style={{ background: "var(--navy)", color: "var(--gold-light)", letterSpacing: 1 }}>
            {cat.toUpperCase()} — {words.length} words
          </div>
          <div style={{ background: "white" }}>
            {words.map((w, i) => (
              <div key={w.id} className="flex items-center gap-4 px-5 py-4" style={{
                borderTop: i > 0 ? "1px solid #f0ebe0" : "none",
              }}>
                {/* Speak button */}
                <SpeakButton text={w.arabic} size="md" />
                {/* Arabic */}
                <div className="arabic text-3xl w-24 text-right flex-shrink-0" style={{ color: "var(--navy)" }}>{w.arabic}</div>
                {/* Info */}
                <div className="flex-1">
                  <div className="font-semibold" style={{ color: "var(--navy)" }}>{w.english}</div>
                  <div className="text-sm italic" style={{ color: "var(--gold)" }}>{w.transliteration}</div>
                  {w.example && (
                    <div className="mt-1 flex items-center gap-2">
                      <SpeakButton text={w.example} size="sm" />
                      <span className="text-xs" style={{ color: "#888" }}>
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
