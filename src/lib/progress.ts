import type { Word } from "@/lib/vocabulary";
import { vocabulary } from "@/lib/vocabulary";

export type WordStatus = "known" | "learning";

export type ProgressEntry = {
  status: WordStatus;
  streak: number;
  nextReview: number;
  lastSeen: number;
};

export type ProgressMap = Record<string, ProgressEntry>;
export type ProgressFilter = "all" | "learning" | "known";

const STORAGE_KEY = "falahi-word-progress";
const LEGACY_LEARNED_KEY = "falahi_learned_v1";

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

export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function intervalFor(status: WordStatus, streak: number): number {
  const table = status === "learning" ? LEARNING_INTERVALS_MS : KNOWN_INTERVALS_MS;
  const idx = Math.min(Math.max(streak - 1, 0), table.length - 1);
  return table[idx] ?? table[table.length - 1]!;
}

function normalizeEntry(raw: unknown): ProgressEntry | null {
  if (raw === "known" || raw === "learning") {
    const now = Date.now();
    return {
      status: raw,
      streak: raw === "known" ? 1 : 0,
      nextReview: raw === "learning" ? now : now + KNOWN_INTERVALS_MS[0]!,
      lastSeen: now,
    };
  }
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

function migrateLegacyLearned(map: ProgressMap): ProgressMap {
  if (typeof window === "undefined") return map;
  try {
    const raw = localStorage.getItem(LEGACY_LEARNED_KEY);
    if (!raw) return map;
    const list = JSON.parse(raw) as unknown;
    if (!Array.isArray(list)) return map;
    const next = { ...map };
    const now = Date.now();
    for (const arabic of list) {
      if (typeof arabic !== "string") continue;
      const word = vocabulary.find((w) => w.arabic === arabic);
      if (!word) continue;
      const key = String(word.id);
      if (next[key]) continue;
      next[key] = {
        status: "known",
        streak: 1,
        nextReview: now + KNOWN_INTERVALS_MS[0]!,
        lastSeen: now,
      };
    }
    return next;
  } catch {
    return map;
  }
}

function saveProgress(map: ProgressMap): ProgressMap {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  return map;
}

export function getProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let map: ProgressMap = {};
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        for (const [key, value] of Object.entries(parsed)) {
          const entry = normalizeEntry(value);
          if (entry) map[key] = entry;
        }
      }
    }
    map = migrateLegacyLearned(map);
    return map;
  } catch {
    return {};
  }
}

export function getEntry(progress: ProgressMap, id: number): ProgressEntry | null {
  return progress[String(id)] ?? null;
}

export function getWordStatus(progress: ProgressMap, id: number): WordStatus | "unseen" {
  return progress[String(id)]?.status ?? "unseen";
}

export function setStatus(id: number, status: WordStatus): ProgressMap {
  const now = Date.now();
  const prev = getProgress()[String(id)];
  const entry: ProgressEntry =
    status === "learning"
      ? { status: "learning", streak: 0, nextReview: now, lastSeen: now }
      : {
          status: "known",
          streak: Math.max(prev?.streak ?? 0, 1),
          nextReview: now + intervalFor("known", Math.max(prev?.streak ?? 0, 1)),
          lastSeen: now,
        };
  return saveProgress({ ...getProgress(), [String(id)]: entry });
}

export function recordWrong(id: number): ProgressMap {
  const now = Date.now();
  return saveProgress({
    ...getProgress(),
    [String(id)]: { status: "learning", streak: 0, nextReview: now, lastSeen: now },
  });
}

export function recordCorrect(id: number): ProgressMap {
  const now = Date.now();
  const prev = getProgress()[String(id)];
  let status: WordStatus;
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

  return saveProgress({
    ...getProgress(),
    [String(id)]: {
      status,
      streak,
      nextReview: now + intervalFor(status, streak),
      lastSeen: now,
    },
  });
}

export function resetProgress(): ProgressMap {
  localStorage.removeItem(STORAGE_KEY);
  return {};
}

export function getWordsByStatus(words: Word[], progress: ProgressMap, filter: ProgressFilter): Word[] {
  if (filter === "all") return words;
  if (filter === "known") return words.filter((word) => progress[String(word.id)]?.status === "known");
  return words.filter((word) => progress[String(word.id)]?.status !== "known");
}

export function getMissedWords(words: Word[], progress: ProgressMap): Word[] {
  return words.filter((word) => progress[String(word.id)]?.status === "learning");
}

export function getDueWords(words: Word[], progress: ProgressMap, now = Date.now()): Word[] {
  return words.filter((word) => {
    const entry = progress[String(word.id)];
    if (!entry) return false;
    return entry.nextReview <= now;
  });
}

export function countStatus(progress: ProgressMap, total: number, now = Date.now()) {
  let known = 0;
  let learning = 0;
  let due = 0;
  for (const entry of Object.values(progress)) {
    if (entry.status === "known") known += 1;
    else if (entry.status === "learning") learning += 1;
    if (entry.nextReview <= now) due += 1;
  }
  const unseen = Math.max(0, total - known - learning);
  return { known, learning, unseen, due, missed: learning };
}

export function pickGapWords(words: Word[], progress: ProgressMap, count: number): Word[] {
  const now = Date.now();
  const due = shuffle(getDueWords(words, progress, now));
  const learning = shuffle(
    words.filter(
      (word) =>
        progress[String(word.id)]?.status === "learning" && !due.some((d) => d.id === word.id),
    ),
  );
  const unseen = shuffle(words.filter((word) => !progress[String(word.id)]));
  const known = shuffle(words.filter((word) => progress[String(word.id)]?.status === "known"));
  return [...due, ...learning, ...unseen, ...known].slice(0, Math.min(count, words.length));
}

export function pickPracticeWords(words: Word[], progress: ProgressMap, minCount: number): Word[] {
  const learning = shuffle(words.filter((word) => progress[String(word.id)]?.status === "learning"));
  const unseen = shuffle(words.filter((word) => !progress[String(word.id)]));
  let pool = [...learning, ...unseen];
  if (pool.length < minCount) {
    pool = [...pool, ...shuffle(words.filter((word) => progress[String(word.id)]?.status === "known"))];
  }
  if (pool.length < minCount) pool = shuffle(words);
  return pool.slice(0, Math.min(Math.max(minCount, pool.length), words.length));
}

