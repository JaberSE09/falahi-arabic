"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { SURAHS } from "../page";

interface Ayah {
  number: number;
  arabic: string;
  transliteration: string;
  translation: string;
}

export default function SurahPage() {
  const params = useParams();
  const surahNum = parseInt(params.surah as string);
  const surahInfo = SURAHS.find(s => s.n === surahNum);

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openAyahs, setOpenAyahs] = useState<Set<number>>(new Set());
  const [fontSize, setFontSize] = useState(38);

  useEffect(() => {
    if (!surahNum || isNaN(surahNum)) return;
    setLoading(true);
    setError("");
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/ar.alafasy`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/en.sahih`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/en.transliteration`).then(r => r.json()),
    ]).then(([arData, enData, trData]) => {
      const arAyahs = arData.data?.ayahs ?? [];
      const enAyahs = enData.data?.ayahs ?? [];
      const trAyahs = trData.data?.ayahs ?? [];
      setAyahs(arAyahs.map((a: { numberInSurah: number; text: string }, i: number) => ({
        number: a.numberInSurah,
        arabic: a.text,
        transliteration: trAyahs[i]?.text ?? "",
        translation: enAyahs[i]?.text ?? "",
      })));
      setLoading(false);
    }).catch(() => {
      setError("Failed to load. Check your connection and try again.");
      setLoading(false);
    });
  }, [surahNum]);

  function toggleAyah(n: number) {
    setOpenAyahs(prev => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  function expandAll() {
    setOpenAyahs(new Set(ayahs.map(a => a.number)));
  }

  function collapseAll() {
    setOpenAyahs(new Set());
  }

  if (!surahInfo) {
    return (
      <div style={{ minHeight: "100vh", background: "#0D1117", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#9ca3af", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p>Surah not found</p>
          <a href="/quran/browse" style={{ color: "#4ade80", textDecoration: "none" }}>← Back to list</a>
        </div>
      </div>
    );
  }

  const prevSurah = SURAHS.find(s => s.n === surahNum - 1);
  const nextSurah = SURAHS.find(s => s.n === surahNum + 1);

  return (
    <div style={{ minHeight: "100vh", background: "#0D1117", color: "white" }}>
      {/* Sticky header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(13,17,23,0.96)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1f2937", padding: "12px 16px",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/quran/browse" style={{ color: "#4ade80", textDecoration: "none", fontSize: 22, lineHeight: 1 }}>‹</a>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "white", lineHeight: 1.2 }}>{surahInfo.en}</div>
            <div style={{ color: "#6b7280", fontSize: 11 }}>Surah {surahNum} · {surahInfo.ayahs} ayahs</div>
          </div>
          <div dir="rtl" style={{ fontFamily: "serif", fontSize: 26, color: "#4ade80", fontWeight: 600 }}>{surahInfo.ar}</div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 100px" }}>
        {/* Controls */}
        <div style={{ padding: "16px 0 12px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Font size */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 160 }}>
            <span style={{ color: "#6b7280", fontSize: 12, whiteSpace: "nowrap" }}>أ size</span>
            <input type="range" min={24} max={60} value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#22c55e" }} />
            <span style={{ color: "#4ade80", fontSize: 12, fontWeight: 700, width: 28 }}>{fontSize}</span>
          </div>
          {/* Expand / collapse all */}
          <button onClick={expandAll} style={{
            padding: "6px 12px", borderRadius: 8, background: "#14532d", border: "none",
            color: "#4ade80", fontSize: 12, fontWeight: 600, cursor: "pointer"
          }}>Show all</button>
          <button onClick={collapseAll} style={{
            padding: "6px 12px", borderRadius: 8, background: "#1f2937", border: "none",
            color: "#9ca3af", fontSize: 12, fontWeight: 600, cursor: "pointer"
          }}>Hide all</button>
        </div>

        {/* Bismillah (not for At-Tawbah #9, and Al-Fatihah starts with it already) */}
        {surahNum !== 9 && surahNum !== 1 && (
          <div style={{ textAlign: "center", padding: "20px 0 16px", borderBottom: "1px solid #1f2937", marginBottom: 8 }}>
            <p dir="rtl" style={{ fontFamily: "serif", fontSize: Math.min(fontSize, 36), color: "#86efac", margin: "0 0 8px", lineHeight: 1.8 }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p style={{ color: "#6b7280", fontSize: 13, fontStyle: "italic", margin: "0 0 4px" }}>
              Bismi llāhi r-raḥmāni r-raḥīm
            </p>
            <p style={{ color: "#4b5563", fontSize: 12, margin: 0 }}>
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6b7280" }}>
            <div style={{ fontSize: 40, marginBottom: 12, animation: "pulse 1.5s infinite" }}>📖</div>
            <p style={{ margin: 0, fontSize: 14 }}>Loading {surahInfo.en}...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#f87171" }}>
            <p>{error}</p>
          </div>
        )}

        {/* Ayahs */}
        {!loading && !error && (
          <div>
            <p style={{ color: "#4b5563", fontSize: 11, textAlign: "center", margin: "10px 0 16px" }}>
              Tap any ayah to show transliteration &amp; translation
            </p>
            {ayahs.map((a) => {
              const isOpen = openAyahs.has(a.number);
              return (
                <div
                  key={a.number}
                  onClick={() => toggleAyah(a.number)}
                  style={{
                    marginBottom: 12,
                    borderRadius: 20,
                    background: isOpen ? "#0f2218" : "#111827",
                    border: `1.5px solid ${isOpen ? "#166534" : "#1f2937"}`,
                    cursor: "pointer",
                    transition: "background 0.15s, border-color 0.15s",
                    overflow: "hidden",
                  }}
                >
                  {/* Arabic row — always visible */}
                  <div style={{ padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                    {/* Ayah number */}
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                      background: isOpen ? "#14532d" : "#1f2937",
                      border: `1px solid ${isOpen ? "#166534" : "#374151"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginTop: 4,
                    }}>
                      <span style={{ color: isOpen ? "#4ade80" : "#6b7280", fontSize: 11, fontWeight: 700 }}>{a.number}</span>
                    </div>

                    {/* Arabic text */}
                    <p
                      dir="rtl"
                      style={{
                        flex: 1, margin: 0, fontFamily: "serif",
                        fontSize: fontSize, color: "white",
                        lineHeight: 1.85, textAlign: "right", fontWeight: 400,
                      }}
                    >
                      {a.arabic}
                    </p>

                    {/* Expand indicator */}
                    <div style={{ color: isOpen ? "#4ade80" : "#374151", fontSize: 18, flexShrink: 0, marginTop: 4, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none" }}>›</div>
                  </div>

                  {/* Transliteration + Translation — shown on tap */}
                  {isOpen && (
                    <div style={{ padding: "0 20px 18px", borderTop: "1px solid #1a3a2a" }}>
                      {/* Transliteration */}
                      <p style={{
                        margin: "14px 0 10px", fontSize: 17, fontStyle: "italic",
                        color: "#86efac", lineHeight: 1.6,
                      }}>
                        {a.transliteration}
                      </p>
                      {/* Divider */}
                      <div style={{ height: 1, background: "#1f2937", margin: "10px 0" }} />
                      {/* Translation */}
                      <p style={{
                        margin: 0, fontSize: 17, color: "#d1d5db", lineHeight: 1.7,
                      }}>
                        {a.translation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Prev / Next navigation */}
        {!loading && (
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {prevSurah ? (
              <a href={`/quran/browse/${prevSurah.n}`} style={{
                flex: 1, textAlign: "center", textDecoration: "none",
                background: "#111827", borderRadius: 16, padding: "14px 12px",
                border: "1.5px solid #1f2937", color: "inherit",
              }}>
                <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 4 }}>‹ Previous</div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>{prevSurah.en}</div>
                <div dir="rtl" style={{ fontFamily: "serif", color: "#4ade80", fontSize: 18 }}>{prevSurah.ar}</div>
              </a>
            ) : <div style={{ flex: 1 }} />}
            {nextSurah ? (
              <a href={`/quran/browse/${nextSurah.n}`} style={{
                flex: 1, textAlign: "center", textDecoration: "none",
                background: "#111827", borderRadius: 16, padding: "14px 12px",
                border: "1.5px solid #1f2937", color: "inherit",
              }}>
                <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 4 }}>Next ›</div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>{nextSurah.en}</div>
                <div dir="rtl" style={{ fontFamily: "serif", color: "#4ade80", fontSize: 18 }}>{nextSurah.ar}</div>
              </a>
            ) : <div style={{ flex: 1 }} />}
          </div>
        )}
      </div>
    </div>
  );
}
