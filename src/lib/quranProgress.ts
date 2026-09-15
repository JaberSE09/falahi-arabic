import {
  allPathAyahs,
  ayahKey,
  type QuranAyah,
  type QuranSurah,
  quranSurahs,
} from "@/lib/quranSurahs";

export type AyahStatus = "known" | "learning";

export type AyahProgressEntry = {
  status: AyahStatus;
  streak: number;
  nextReview: number;
  lastSeen: number;
};

export type AyahProgressMap = Record<string, AyahProgressEntry>;

const STORAGE_KEY = "falahi-quran-ayah-progress";

const LEARNING_INTERVALS_MS = [
  10 * 60 * 1000,
  24 * 60 * 60 * 1000,
  3 * 24 * 60 * 60 * 1000,
];

const KNOWN_INTERVALS_MS = [
  3 * 24 * 60 * 60 * 1000,
  7 * 24 * 60 * 60 * 1000,
  14 * 24 * 60 * 60 * 1000,
];

function intervalFor(status: AyahStatus, streak: number): number {
  const table = status === "learning" ? LEARNING_INTERVALS_MS : KNOWN_INTERVALS_MS;
  const idx = Math.min(Math.max(streak - 1, 0), table.length - 1);
  return table[idx] ?? table[table.length - 1]!;
}

function normalizeEntry(raw: unknown): AyahProgressEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  if (obj.status !== "known" && obj.status !== "learning") return null;
  return {
    status: obj.status,
    streak: typeof obj.streak === "number" ? obj.streak : 0,
    nextReview: typeof obj.nextReview === "number" ? obj.nextReview : Date.now(),
    lastSeen: typeof obj.lastSeen === "number" ? obj.lastSeen : Date.now(),
  };
}

function save(map: AyahProgressMap): AyahProgressMap {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  return map;
}

export function getQuranProgress(): AyahProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const map: AyahProgressMap = {};
    for (const [key, value] of Object.entries(parsed)) {
      const entry = normalizeEntry(value);
      if (entry) map[key] = entry;
    }
    return map;
  } catch {
    return {};
  }
}

export function recordAyahWrong(surahNumber: number, ayah: number): AyahProgressMap {
  const now = Date.now();
  const key = ayahKey(surahNumber, ayah);
  return save({
    ...getQuranProgress(),
    [key]: { status: "learning", streak: 0, nextReview: now, lastSeen: now },
  });
}

export function recordAyahCorrect(surahNumber: number, ayah: number): AyahProgressMap {
  const now = Date.now();
  const key = ayahKey(surahNumber, ayah);
  const prev = getQuranProgress()[key];
  let status: AyahStatus;
  let streak: number;

  if (!prev || prev.status === "learning") {
    streak = (prev?.streak ?? 0) + 1;
    if (streak >= 2) {
      status = "known";
      streak = 1;
    } else {
      status = "learning";
    }
  } else {
    status = "known";
    streak = prev.streak + 1;
  }

  return save({
    ...getQuranProgress(),
    [key]: {
      status,
      streak,
      nextReview: now + intervalFor(status, streak),
      lastSeen: now,
    },
  });
}

export function resetQuranProgress(): AyahProgressMap {
  localStorage.removeItem(STORAGE_KEY);
  return {};
}

export type SurahProgressSummary = {
  known: number;
  learning: number;
  unseen: number;
  due: number;
  percent: number;
  nextAyah: number;
};

export function getSurahProgress(
  surah: QuranSurah,
  progress: AyahProgressMap,
  now = Date.now(),
): SurahProgressSummary {
  let known = 0;
  let learning = 0;
  let due = 0;

  for (const a of surah.ayahs) {
    const entry = progress[ayahKey(surah.number, a.ayah)];
    if (!entry) continue;
    if (entry.status === "known") known += 1;
    else learning += 1;
    if (entry.nextReview <= now) due += 1;
  }

  const unseen = Math.max(0, surah.ayahCount - known - learning);
  const percent = Math.round((known / surah.ayahCount) * 100);

  const firstIncomplete = surah.ayahs.find((a) => {
    const entry = progress[ayahKey(surah.number, a.ayah)];
    return !entry || entry.status !== "known";
  });
  const nextAyah = firstIncomplete?.ayah ?? surah.ayahCount;

  return { known, learning, unseen, due, percent, nextAyah };
}

export function getDueAyahs(
  progress: AyahProgressMap,
  surah?: QuranSurah,
  now = Date.now(),
): QuranAyah[] {
  const pool = surah ? surah.ayahs : allPathAyahs();
  return pool.filter((a) => {
    const entry = progress[ayahKey(a.surahNumber, a.ayah)];
    if (!entry) return false;
    return entry.nextReview <= now;
  });
}

export function countPathProgress(progress: AyahProgressMap, now = Date.now()) {
  const total = allPathAyahs().length;
  let known = 0;
  let learning = 0;
  let due = 0;
  for (const a of allPathAyahs()) {
    const entry = progress[ayahKey(a.surahNumber, a.ayah)];
    if (!entry) continue;
    if (entry.status === "known") known += 1;
    else learning += 1;
    if (entry.nextReview <= now) due += 1;
  }
  const unseen = Math.max(0, total - known - learning);
  const percent = total === 0 ? 0 : Math.round((known / total) * 100);
  const surahsDone = quranSurahs.filter((s) => getSurahProgress(s, progress, now).percent === 100).length;
  return { known, learning, unseen, due, total, percent, surahsDone, surahCount: quranSurahs.length };
}
