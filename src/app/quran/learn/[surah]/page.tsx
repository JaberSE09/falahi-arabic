"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import SpeakButton from "@/components/SpeakButton";
import PronounceButton from "@/components/PronounceButton";
import { useQuranProgress } from "@/hooks/useQuranProgress";
import { ayahKey, getSurahBySlug } from "@/lib/quranSurahs";

type Phase = "study" | "recall" | "chain" | "done";

export default function QuranSurahLearnPage() {
  const params = useParams();
  const slug = typeof params.surah === "string" ? params.surah : "";
  const surah = getSurahBySlug(slug);
  const { progress, correct, wrong, surahSummary, dueInSurah } = useQuranProgress();

  const summary = surah ? surahSummary(surah) : null;
  const due = surah ? dueInSurah(surah) : [];

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("study");
  const [reviewMode, setReviewMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(false);
    setPhase("study");
    setReviewMode(false);
  }, [slug]);

  useEffect(() => {
    if (!surah || !summary || hydrated) return;
    setIdx(Math.max(0, summary.nextAyah - 1));
    setHydrated(true);
  }, [surah, summary, hydrated]);

  if (!surah) {
    return (
      <div className="fade-in" style={{ padding: 24, textAlign: "center" }}>
        <p style={{ marginBottom: 16, fontWeight: 700, color: "var(--navy)" }}>Surah not found.</p>
        <Link href="/quran/learn" style={{ color: "var(--gold)", fontWeight: 800 }}>
          ← Back to Learn Surahs
        </Link>
      </div>
    );
  }

  const ayah = surah.ayahs[Math.min(idx, surah.ayahs.length - 1)]!;
  const entry = progress[ayahKey(surah.number, ayah.ayah)];
  const chainAyahs = surah.ayahs.slice(0, idx + 1);
  const isLast = idx >= surah.ayahs.length - 1;

  const goStudy = (nextIdx: number) => {
    setIdx(nextIdx);
    setPhase("study");
  };

  const startDueReview = () => {
    if (due.length === 0) return;
    const first = due[0]!;
    const i = surah.ayahs.findIndex((a) => a.ayah === first.ayah);
    setReviewMode(true);
    goStudy(Math.max(0, i));
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 8 }}>
        <Link href="/quran/learn" style={{ color: "var(--gold)", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
          ← Learn Surahs
        </Link>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <div>
          <div className="arabic" style={{ fontSize: 36, color: "var(--navy)", lineHeight: 1.2 }}>
            {surah.nameAr}
          </div>
          <div style={{ fontWeight: 800, fontSize: 20, color: "var(--navy)" }}>
            {surah.nameEn}{" "}
            <span style={{ color: "#888", fontWeight: 600, fontSize: 15 }}>({surah.number})</span>
          </div>
        </div>
        <div style={{ textAlign: "right", fontWeight: 700, color: "var(--navy)" }}>
          <div style={{ fontSize: 22 }}>{summary?.percent ?? 0}%</div>
          <div style={{ fontSize: 13, color: "#666" }}>
            Line {ayah.ayah} / {surah.ayahCount}
          </div>
        </div>
      </div>

      <div style={{ height: 8, borderRadius: 99, background: "#eee", overflow: "hidden", marginBottom: 20 }}>
        <div
          style={{
            width: `${((idx + 1) / surah.ayahCount) * 100}%`,
            height: "100%",
            background: "var(--gold)",
            borderRadius: 99,
          }}
        />
      </div>

      {due.length > 0 && !reviewMode && (
        <button
          type="button"
          onClick={startDueReview}
          style={{
            width: "100%",
            marginBottom: 16,
            padding: "12px 16px",
            borderRadius: 12,
            border: "2px solid #e85d75",
            background: "rgba(232,93,117,0.08)",
            color: "#e85d75",
            fontWeight: 800,
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          Review {due.length} due line{due.length === 1 ? "" : "s"} in this surah
        </button>
      )}

      {phase === "done" ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 24px",
            borderRadius: 20,
            background: "white",
            border: "2px solid #e8e0d0",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
          <div style={{ fontWeight: 900, fontSize: 24, color: "var(--navy)", marginBottom: 8 }}>
            Surah complete for now
          </div>
          <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.5 }}>
            Come back for due reviews so the lines stay with you.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/quran/learn"
              style={{
                padding: "12px 20px",
                borderRadius: 12,
                background: "var(--navy)",
                color: "white",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Next surah →
            </Link>
            <button
              type="button"
              onClick={() => goStudy(0)}
              style={{
                padding: "12px 20px",
                borderRadius: 12,
                background: "white",
                color: "var(--navy)",
                fontWeight: 800,
                border: "2px solid var(--navy)",
                cursor: "pointer",
              }}
            >
              Restart from line 1
            </button>
          </div>
        </div>
      ) : phase === "chain" ? (
        <div
          style={{
            borderRadius: 20,
            background: "white",
            border: "2px solid var(--navy)",
            padding: "24px 20px",
            marginBottom: 20,
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 18, color: "var(--navy)", marginBottom: 8 }}>
            Chain check — recite ayah 1 → {ayah.ayah}
          </div>
          <p style={{ color: "#555", marginBottom: 16, fontSize: 15, lineHeight: 1.5 }}>
            Cover the lines if you can. Tap Speak on any line you need, then mark Done.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
            {chainAyahs.map((a) => (
              <div
                key={a.ayah}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "#f9f6f0",
                  border: "1px solid #e8e0d0",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#888", marginBottom: 6 }}>
                  {surah.nameEn} {a.ayah}
                </div>
                <div
                  className="arabic"
                  style={{
                    fontSize: 28,
                    lineHeight: 1.8,
                    color: "var(--navy)",
                    textAlign: "right",
                    direction: "rtl",
                    marginBottom: 8,
                  }}
                >
                  {a.arabic}
                </div>
                <SpeakButton text={a.arabic} size="md" />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                if (isLast) {
                  setPhase("done");
                  setReviewMode(false);
                } else {
                  goStudy(idx + 1);
                }
              }}
              style={{
                padding: "14px 22px",
                borderRadius: 12,
                background: "#2D7A4F",
                color: "white",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Done — {isLast ? "finish surah" : "next line"}
            </button>
            <button
              type="button"
              onClick={() => setPhase("recall")}
              style={{
                padding: "14px 22px",
                borderRadius: 12,
                background: "white",
                color: "var(--navy)",
                fontWeight: 800,
                border: "2px solid var(--navy)",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Retry this line
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              borderRadius: 22,
              background: "var(--navy)",
              padding: "28px 22px",
              marginBottom: 18,
              textAlign: "center",
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
              AYAH {ayah.ayah}
              {entry?.status === "known" ? " · known" : entry?.status === "learning" ? " · learning" : " · new"}
              {reviewMode ? " · review" : ""}
            </div>

            {phase === "study" ? (
              <>
                <div
                  className="arabic"
                  style={{
                    fontSize: "clamp(36px, 9vw, 52px)",
                    lineHeight: 1.7,
                    color: "var(--gold-light)",
                    marginBottom: 14,
                    direction: "rtl",
                  }}
                >
                  {ayah.arabic}
                </div>
                <div style={{ marginBottom: 14 }}>
                  <SpeakButton text={ayah.arabic} size="lg" />
                </div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic", fontSize: 17, marginBottom: 10 }}>
                  {ayah.transliteration}
                </div>
                <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: 17, lineHeight: 1.45 }}>
                  {ayah.english}
                </div>
              </>
            ) : (
              <>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 16, lineHeight: 1.5 }}>
                  Recite ayah {ayah.ayah} from memory, then check yourself.
                </div>
                <button
                  type="button"
                  onClick={() => setPhase("study")}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 10,
                    border: "2px solid rgba(255,255,255,0.35)",
                    background: "transparent",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer",
                    marginBottom: 18,
                  }}
                >
                  Peek at the line
                </button>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: 16 }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, marginBottom: 10, fontSize: 14 }}>
                    Say it (optional)
                  </div>
                  <PronounceButton
                    key={`${surah.number}-${ayah.ayah}-say`}
                    targetArabic={ayah.arabic}
                    size="md"
                    onResult={(ok) => {
                      if (ok) correct(surah.number, ayah.ayah);
                      else wrong(surah.number, ayah.ayah);
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {phase === "study" ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setPhase("recall")}
                style={{
                  padding: "14px 24px",
                  borderRadius: 12,
                  background: "var(--gold)",
                  color: "var(--navy)",
                  fontWeight: 900,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                Hide &amp; recall
              </button>
              <button
                type="button"
                onClick={() => {
                  wrong(surah.number, ayah.ayah);
                }}
                style={{
                  padding: "14px 20px",
                  borderRadius: 12,
                  background: "white",
                  color: "var(--navy)",
                  fontWeight: 800,
                  border: "2px solid #ddd",
                  cursor: "pointer",
                  fontSize: 15,
                }}
              >
                Still learning
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => {
                  correct(surah.number, ayah.ayah);
                  setPhase("chain");
                }}
                style={{
                  padding: "14px 24px",
                  borderRadius: 12,
                  background: "#2D7A4F",
                  color: "white",
                  fontWeight: 900,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                I know this line
              </button>
              <button
                type="button"
                onClick={() => {
                  wrong(surah.number, ayah.ayah);
                  setPhase("study");
                }}
                style={{
                  padding: "14px 20px",
                  borderRadius: 12,
                  background: "white",
                  color: "#e85d75",
                  fontWeight: 800,
                  border: "2px solid #e85d75",
                  cursor: "pointer",
                  fontSize: 15,
                }}
              >
                Still learning
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
            <button
              type="button"
              disabled={idx === 0}
              onClick={() => goStudy(idx - 1)}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                border: "2px solid #ddd",
                background: "white",
                fontWeight: 700,
                cursor: idx === 0 ? "not-allowed" : "pointer",
                opacity: idx === 0 ? 0.4 : 1,
                color: "var(--navy)",
              }}
            >
              ← Prev line
            </button>
            <button
              type="button"
              disabled={isLast}
              onClick={() => goStudy(idx + 1)}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                border: "2px solid #ddd",
                background: "white",
                fontWeight: 700,
                cursor: isLast ? "not-allowed" : "pointer",
                opacity: isLast ? 0.4 : 1,
                color: "var(--navy)",
              }}
            >
              Next line →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
