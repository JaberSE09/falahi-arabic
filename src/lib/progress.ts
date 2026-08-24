import type { Word } from "@/lib/vocabulary";

export type WordStatus = "known" | "learning";
export type ProgressMap = Record<string, WordStatus>;
export type ProgressFilter = "all" | "learning" | "known";

const STORAGE_KEY = "falahi-word-progress";

export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function getProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const result: ProgressMap = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (value === "known" || value === "learning") result[key] = value;
    }
    return result;
  } catch {
    return {};
  }
}

export function setStatus(id: number, status: WordStatus): ProgressMap {
  const next = { ...getProgress(), [String(id)]: status };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function getWordStatus(progress: ProgressMap, id: number): WordStatus | "unseen" {
  return progress[String(id)] ?? "unseen";
}

export function getWordsByStatus(words: Word[], progress: ProgressMap, filter: ProgressFilter): Word[] {
  if (filter === "all") return words;
  if (filter === "known") return words.filter((word) => progress[String(word.id)] === "known");
  return words.filter((word) => progress[String(word.id)] !== "known");
}

export function countStatus(progress: ProgressMap, total: number) {
  let known = 0;
  let learning = 0;
  for (const status of Object.values(progress)) {
    if (status === "known") known += 1;
    else if (status === "learning") learning += 1;
  }
  const unseen = Math.max(0, total - known - learning);
  return { known, learning, unseen };
}

export function pickGapWords(words: Word[], progress: ProgressMap, count: number): Word[] {
  const learning = shuffle(words.filter((word) => progress[String(word.id)] === "learning"));
  const unseen = shuffle(words.filter((word) => !progress[String(word.id)]));
  const known = shuffle(words.filter((word) => progress[String(word.id)] === "known"));
  return [...learning, ...unseen, ...known].slice(0, Math.min(count, words.length));
}

export function pickPracticeWords(words: Word[], progress: ProgressMap, minCount: number): Word[] {
  const learning = shuffle(words.filter((word) => progress[String(word.id)] === "learning"));
  const unseen = shuffle(words.filter((word) => !progress[String(word.id)]));
  let pool = [...learning, ...unseen];
  if (pool.length < minCount) {
    pool = [...pool, ...shuffle(words.filter((word) => progress[String(word.id)] === "known"))];
  }
  if (pool.length < minCount) pool = shuffle(words);
  return pool.slice(0, Math.min(Math.max(minCount, pool.length), words.length));
}
