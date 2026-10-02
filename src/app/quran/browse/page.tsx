"use client";
import { useState } from "react";
import Link from "next/link";

export const SURAHS = [
  { n: 1, ar: "الفاتحة", en: "Al-Fatihah", tr: "The Opening", ayahs: 7 },
  { n: 2, ar: "البقرة", en: "Al-Baqarah", tr: "The Cow", ayahs: 286 },
  { n: 3, ar: "آل عمران", en: "Ali 'Imran", tr: "Family of Imran", ayahs: 200 },
  { n: 4, ar: "النساء", en: "An-Nisa", tr: "The Women", ayahs: 176 },
  { n: 5, ar: "المائدة", en: "Al-Ma'idah", tr: "The Table Spread", ayahs: 120 },
  { n: 6, ar: "الأنعام", en: "Al-An'am", tr: "The Cattle", ayahs: 165 },
  { n: 7, ar: "الأعراف", en: "Al-A'raf", tr: "The Heights", ayahs: 206 },
  { n: 8, ar: "الأنفال", en: "Al-Anfal", tr: "The Spoils of War", ayahs: 75 },
  { n: 9, ar: "التوبة", en: "At-Tawbah", tr: "The Repentance", ayahs: 129 },
  { n: 10, ar: "يونس", en: "Yunus", tr: "Jonah", ayahs: 109 },
  { n: 11, ar: "هود", en: "Hud", tr: "Hud", ayahs: 123 },
  { n: 12, ar: "يوسف", en: "Yusuf", tr: "Joseph", ayahs: 111 },
  { n: 13, ar: "الرعد", en: "Ar-Ra'd", tr: "The Thunder", ayahs: 43 },
  { n: 14, ar: "إبراهيم", en: "Ibrahim", tr: "Abraham", ayahs: 52 },
  { n: 15, ar: "الحجر", en: "Al-Hijr", tr: "The Rocky Tract", ayahs: 99 },
  { n: 16, ar: "النحل", en: "An-Nahl", tr: "The Bee", ayahs: 128 },
  { n: 17, ar: "الإسراء", en: "Al-Isra", tr: "The Night Journey", ayahs: 111 },
  { n: 18, ar: "الكهف", en: "Al-Kahf", tr: "The Cave", ayahs: 110 },
  { n: 19, ar: "مريم", en: "Maryam", tr: "Mary", ayahs: 98 },
  { n: 20, ar: "طه", en: "Ta-Ha", tr: "Ta-Ha", ayahs: 135 },
  { n: 21, ar: "الأنبياء", en: "Al-Anbiya", tr: "The Prophets", ayahs: 112 },
  { n: 22, ar: "الحج", en: "Al-Hajj", tr: "The Pilgrimage", ayahs: 78 },
  { n: 23, ar: "المؤمنون", en: "Al-Mu'minun", tr: "The Believers", ayahs: 118 },
  { n: 24, ar: "النور", en: "An-Nur", tr: "The Light", ayahs: 64 },
  { n: 25, ar: "الفرقان", en: "Al-Furqan", tr: "The Criterion", ayahs: 77 },
  { n: 26, ar: "الشعراء", en: "Ash-Shu'ara", tr: "The Poets", ayahs: 227 },
  { n: 27, ar: "النمل", en: "An-Naml", tr: "The Ant", ayahs: 93 },
  { n: 28, ar: "القصص", en: "Al-Qasas", tr: "The Stories", ayahs: 88 },
  { n: 29, ar: "العنكبوت", en: "Al-Ankabut", tr: "The Spider", ayahs: 69 },
  { n: 30, ar: "الروم", en: "Ar-Rum", tr: "The Romans", ayahs: 60 },
  { n: 31, ar: "لقمان", en: "Luqman", tr: "Luqman", ayahs: 34 },
  { n: 32, ar: "السجدة", en: "As-Sajdah", tr: "The Prostration", ayahs: 30 },
  { n: 33, ar: "الأحزاب", en: "Al-Ahzab", tr: "The Combined Forces", ayahs: 73 },
  { n: 34, ar: "سبإ", en: "Saba", tr: "Sheba", ayahs: 54 },
  { n: 35, ar: "فاطر", en: "Fatir", tr: "Originator", ayahs: 45 },
  { n: 36, ar: "يس", en: "Ya-Sin", tr: "Ya Sin", ayahs: 83 },
  { n: 37, ar: "الصافات", en: "As-Saffat", tr: "Those Who Set the Ranks", ayahs: 182 },
  { n: 38, ar: "ص", en: "Sad", tr: "The Letter Sad", ayahs: 88 },
  { n: 39, ar: "الزمر", en: "Az-Zumar", tr: "The Troops", ayahs: 75 },
  { n: 40, ar: "غافر", en: "Ghafir", tr: "The Forgiver", ayahs: 85 },
  { n: 41, ar: "فصلت", en: "Fussilat", tr: "Explained in Detail", ayahs: 54 },
  { n: 42, ar: "الشورى", en: "Ash-Shuraa", tr: "The Consultation", ayahs: 53 },
  { n: 43, ar: "الزخرف", en: "Az-Zukhruf", tr: "The Ornaments of Gold", ayahs: 89 },
  { n: 44, ar: "الدخان", en: "Ad-Dukhan", tr: "The Smoke", ayahs: 59 },
  { n: 45, ar: "الجاثية", en: "Al-Jathiyah", tr: "The Crouching", ayahs: 37 },
  { n: 46, ar: "الأحقاف", en: "Al-Ahqaf", tr: "The Wind-Curved Sandhills", ayahs: 35 },
  { n: 47, ar: "محمد", en: "Muhammad", tr: "Muhammad", ayahs: 38 },
  { n: 48, ar: "الفتح", en: "Al-Fath", tr: "The Victory", ayahs: 29 },
  { n: 49, ar: "الحجرات", en: "Al-Hujurat", tr: "The Rooms", ayahs: 18 },
  { n: 50, ar: "ق", en: "Qaf", tr: "The Letter Qaf", ayahs: 45 },
  { n: 51, ar: "الذاريات", en: "Adh-Dhariyat", tr: "The Winnowing Winds", ayahs: 60 },
  { n: 52, ar: "الطور", en: "At-Tur", tr: "The Mount", ayahs: 49 },
  { n: 53, ar: "النجم", en: "An-Najm", tr: "The Star", ayahs: 62 },
  { n: 54, ar: "القمر", en: "Al-Qamar", tr: "The Moon", ayahs: 55 },
  { n: 55, ar: "الرحمن", en: "Ar-Rahman", tr: "The Beneficent", ayahs: 78 },
  { n: 56, ar: "الواقعة", en: "Al-Waqi'ah", tr: "The Inevitable", ayahs: 96 },
  { n: 57, ar: "الحديد", en: "Al-Hadid", tr: "The Iron", ayahs: 29 },
  { n: 58, ar: "المجادلة", en: "Al-Mujadila", tr: "The Pleading Woman", ayahs: 22 },
  { n: 59, ar: "الحشر", en: "Al-Hashr", tr: "The Exile", ayahs: 24 },
  { n: 60, ar: "الممتحنة", en: "Al-Mumtahanah", tr: "She That is to be Examined", ayahs: 13 },
  { n: 61, ar: "الصف", en: "As-Saf", tr: "The Ranks", ayahs: 14 },
  { n: 62, ar: "الجمعة", en: "Al-Jumu'ah", tr: "The Congregation", ayahs: 11 },
  { n: 63, ar: "المنافقون", en: "Al-Munafiqun", tr: "The Hypocrites", ayahs: 11 },
  { n: 64, ar: "التغابن", en: "At-Taghabun", tr: "The Mutual Disillusion", ayahs: 18 },
  { n: 65, ar: "الطلاق", en: "At-Talaq", tr: "The Divorce", ayahs: 12 },
  { n: 66, ar: "التحريم", en: "At-Tahrim", tr: "The Prohibition", ayahs: 12 },
  { n: 67, ar: "الملك", en: "Al-Mulk", tr: "The Sovereignty", ayahs: 30 },
  { n: 68, ar: "القلم", en: "Al-Qalam", tr: "The Pen", ayahs: 52 },
  { n: 69, ar: "الحاقة", en: "Al-Haqqah", tr: "The Reality", ayahs: 52 },
  { n: 70, ar: "المعارج", en: "Al-Ma'arij", tr: "The Ascending Stairways", ayahs: 44 },
  { n: 71, ar: "نوح", en: "Nuh", tr: "Noah", ayahs: 28 },
  { n: 72, ar: "الجن", en: "Al-Jinn", tr: "The Jinn", ayahs: 28 },
  { n: 73, ar: "المزمل", en: "Al-Muzzammil", tr: "The Enshrouded One", ayahs: 20 },
  { n: 74, ar: "المدثر", en: "Al-Muddaththir", tr: "The Cloaked One", ayahs: 56 },
  { n: 75, ar: "القيامة", en: "Al-Qiyamah", tr: "The Resurrection", ayahs: 40 },
  { n: 76, ar: "الإنسان", en: "Al-Insan", tr: "The Human", ayahs: 31 },
  { n: 77, ar: "المرسلات", en: "Al-Mursalat", tr: "The Emissaries", ayahs: 50 },
  { n: 78, ar: "النبإ", en: "An-Naba", tr: "The Tidings", ayahs: 40 },
  { n: 79, ar: "النازعات", en: "An-Nazi'at", tr: "Those Who Drag Forth", ayahs: 46 },
  { n: 80, ar: "عبس", en: "Abasa", tr: "He Frowned", ayahs: 42 },
  { n: 81, ar: "التكوير", en: "At-Takwir", tr: "The Overthrowing", ayahs: 29 },
  { n: 82, ar: "الانفطار", en: "Al-Infitar", tr: "The Cleaving", ayahs: 19 },
  { n: 83, ar: "المطففين", en: "Al-Mutaffifin", tr: "The Defrauding", ayahs: 36 },
  { n: 84, ar: "الانشقاق", en: "Al-Inshiqaq", tr: "The Sundering", ayahs: 25 },
  { n: 85, ar: "البروج", en: "Al-Buruj", tr: "The Mansions of the Stars", ayahs: 22 },
  { n: 86, ar: "الطارق", en: "At-Tariq", tr: "The Morning Star", ayahs: 17 },
  { n: 87, ar: "الأعلى", en: "Al-A'la", tr: "The Most High", ayahs: 19 },
  { n: 88, ar: "الغاشية", en: "Al-Ghashiyah", tr: "The Overwhelming", ayahs: 26 },
  { n: 89, ar: "الفجر", en: "Al-Fajr", tr: "The Dawn", ayahs: 30 },
  { n: 90, ar: "البلد", en: "Al-Balad", tr: "The City", ayahs: 20 },
  { n: 91, ar: "الشمس", en: "Ash-Shams", tr: "The Sun", ayahs: 15 },
  { n: 92, ar: "الليل", en: "Al-Layl", tr: "The Night", ayahs: 21 },
  { n: 93, ar: "الضحى", en: "Ad-Duhaa", tr: "The Morning Hours", ayahs: 11 },
  { n: 94, ar: "الشرح", en: "Ash-Sharh", tr: "The Relief", ayahs: 8 },
  { n: 95, ar: "التين", en: "At-Tin", tr: "The Fig", ayahs: 8 },
  { n: 96, ar: "العلق", en: "Al-Alaq", tr: "The Clot", ayahs: 19 },
  { n: 97, ar: "القدر", en: "Al-Qadr", tr: "The Power", ayahs: 5 },
  { n: 98, ar: "البينة", en: "Al-Bayyinah", tr: "The Clear Proof", ayahs: 8 },
  { n: 99, ar: "الزلزلة", en: "Az-Zalzalah", tr: "The Earthquake", ayahs: 8 },
  { n: 100, ar: "العاديات", en: "Al-Adiyat", tr: "The Courser", ayahs: 11 },
  { n: 101, ar: "القارعة", en: "Al-Qari'ah", tr: "The Calamity", ayahs: 11 },
  { n: 102, ar: "التكاثر", en: "At-Takathur", tr: "The Rivalry in World Increase", ayahs: 8 },
  { n: 103, ar: "العصر", en: "Al-Asr", tr: "The Declining Day", ayahs: 3 },
  { n: 104, ar: "الهمزة", en: "Al-Humazah", tr: "The Traducer", ayahs: 9 },
  { n: 105, ar: "الفيل", en: "Al-Fil", tr: "The Elephant", ayahs: 5 },
  { n: 106, ar: "قريش", en: "Quraysh", tr: "Quraysh", ayahs: 4 },
  { n: 107, ar: "الماعون", en: "Al-Ma'un", tr: "The Small Kindnesses", ayahs: 7 },
  { n: 108, ar: "الكوثر", en: "Al-Kawthar", tr: "The Abundance", ayahs: 3 },
  { n: 109, ar: "الكافرون", en: "Al-Kafirun", tr: "The Disbelievers", ayahs: 6 },
  { n: 110, ar: "النصر", en: "An-Nasr", tr: "The Divine Support", ayahs: 3 },
  { n: 111, ar: "المسد", en: "Al-Masad", tr: "The Palm Fibre", ayahs: 5 },
  { n: 112, ar: "الإخلاص", en: "Al-Ikhlas", tr: "The Sincerity", ayahs: 4 },
  { n: 113, ar: "الفلق", en: "Al-Falaq", tr: "The Daybreak", ayahs: 5 },
  { n: 114, ar: "الناس", en: "An-Nas", tr: "The Mankind", ayahs: 6 },
];

export default function QuranBrowsePage() {
  const [search, setSearch] = useState("");

  const filtered = SURAHS.filter(
    (s) =>
      s.en.toLowerCase().includes(search.toLowerCase()) ||
      s.ar.includes(search) ||
      s.tr.toLowerCase().includes(search.toLowerCase()) ||
      String(s.n).includes(search)
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0D1117", color: "white" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a3a2a, #0D1117)", padding: "40px 20px 28px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>📖</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px", color: "white" }}>Al-Quran</h1>
        <p style={{ color: "#86efac", fontSize: 13, margin: "0 0 6px", letterSpacing: "0.05em" }}>كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ</p>
        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>114 Surahs · Tap any surah to read</p>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 80px" }}>
        {/* Back link */}
        <div style={{ padding: "14px 0 10px" }}>
          <a href="/quran" style={{ color: "#4ade80", fontSize: 14, textDecoration: "none" }}>← Back to Quran</a>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, number, or meaning..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box", padding: "12px 16px",
            borderRadius: 14, background: "#111827", border: "1.5px solid #1f2937",
            color: "white", fontSize: 15, marginBottom: 8, outline: "none",
          }}
        />
        <p style={{ color: "#4b5563", fontSize: 12, margin: "0 0 16px" }}>{filtered.length} surahs</p>

        {/* Surah cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((s) => (
            <a
              key={s.n}
              href={`/quran/browse/${s.n}`}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "#111827", borderRadius: 18,
                padding: "16px 18px", textDecoration: "none",
                border: "1.5px solid #1f2937", color: "inherit",
                transition: "border-color 0.15s",
              }}
            >
              {/* Number badge */}
              <div style={{
                width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                background: "#14532d", border: "1.5px solid #166534",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "#4ade80", fontWeight: 700, fontSize: 13 }}>{s.n}</span>
              </div>

              {/* Name + meta */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: "white", fontSize: 16, marginBottom: 2 }}>{s.en}</div>
                <div style={{ color: "#9ca3af", fontSize: 12 }}>{s.tr} · {s.ayahs} ayahs</div>
              </div>

              {/* Arabic name */}
              <div dir="rtl" style={{
                fontFamily: "serif", fontSize: 22, color: "#4ade80",
                fontWeight: 600, flexShrink: 0,
              }}>{s.ar}</div>

              {/* Arrow */}
              <div style={{ color: "#374151", fontSize: 18, flexShrink: 0 }}>›</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
