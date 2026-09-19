/** Normalize Arabic for loose pronunciation matching. */
export function normalizeArabic(text: string): string {
  return text
    .normalize("NFC")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "") // tashkeel + Quran marks
    .replace(/[\u0610-\u061A\u06DF-\u06E8\u06EA-\u06ED]/g, "")
    .replace(/\u0640/g, "") // tatweel
    .replace(/[إأآاٱ]/g, "ا")
    .replace(/[ىي]/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[^\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function maxAllowedDistance(len: number): number {
  if (len <= 4) return 1;
  if (len <= 8) return 2;
  return Math.min(4, Math.floor(len * 0.25));
}

function tokensOf(text: string): string[] {
  return normalizeArabic(text).split(" ").filter((t) => t.length > 0);
}

function tokenClose(a: string, b: string): boolean {
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) {
    const shorter = Math.min(a.length, b.length);
    if (shorter >= 3) return true;
  }
  const limit = maxAllowedDistance(Math.min(a.length, b.length));
  return Math.abs(a.length - b.length) <= limit && editDistance(a, b) <= limit;
}

/** Share of target words that appear (fuzzily) in heard. */
export function arabicWordCoverage(heard: string, target: string): number {
  const heardToks = tokensOf(heard);
  const targetToks = tokensOf(target);
  if (targetToks.length === 0) return 0;
  let hit = 0;
  for (const t of targetToks) {
    if (heardToks.some((h) => tokenClose(h, t))) hit += 1;
  }
  return hit / targetToks.length;
}

export function pronunciationMatches(heard: string, target: string): boolean {
  const a = normalizeArabic(heard);
  const b = normalizeArabic(target);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;

  const targetTokens = b.split(" ").filter(Boolean);
  const heardTokens = a.split(" ").filter(Boolean);

  // Short targets (1–2 words): allow edit distance / soft includes
  if (targetTokens.length <= 2) {
    if (targetTokens.some((tok) => tok.length >= 3 && (a === tok || a.includes(tok) || tok.includes(a)))) {
      return true;
    }
    if (heardTokens.some((tok) => tok === b || tokenClose(tok, b))) {
      return true;
    }
    const limit = maxAllowedDistance(Math.min(a.length, b.length));
    if (Math.abs(a.length - b.length) <= limit && editDistance(a, b) <= limit) {
      return true;
    }
    return arabicWordCoverage(heard, target) >= 0.8;
  }

  // Longer ayahs / phrases: require most content words, not exact string
  const coverage = arabicWordCoverage(heard, target);
  if (coverage >= 0.65) return true;

  // Also accept if heard is a long contiguous chunk of target
  if (b.includes(a) && a.length >= Math.floor(b.length * 0.55)) return true;

  const limit = maxAllowedDistance(Math.min(a.length, b.length));
  if (Math.abs(a.length - b.length) <= limit && editDistance(a, b) <= limit) {
    return true;
  }
  return false;
}

/** Pick the best transcript alternative against the target Arabic. */
export function bestPronunciationMatch(
  heardAlternatives: string[],
  target: string,
): { ok: boolean; heard: string } {
  const alts = heardAlternatives.map((s) => s.trim()).filter(Boolean);
  if (alts.length === 0) return { ok: false, heard: "" };

  let best = alts[0] ?? "";
  let bestScore = -1;
  for (const alt of alts) {
    if (pronunciationMatches(alt, target)) {
      return { ok: true, heard: alt };
    }
    const score = arabicWordCoverage(alt, target);
    if (score > bestScore) {
      bestScore = score;
      best = alt;
    }
  }
  return { ok: false, heard: best };
}

function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i]![0] = i;
  for (let j = 0; j <= n; j++) dp[0]![j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(
        dp[i - 1]![j]! + 1,
        dp[i]![j - 1]! + 1,
        dp[i - 1]![j - 1]! + cost,
      );
    }
  }
  return dp[m]![n]!;
}

export type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

export type SpeechRecognitionEventLike = {
  results: ArrayLike<{
    0: { transcript: string };
    isFinal: boolean;
    length: number;
    [index: number]: { transcript: string };
  }>;
};

export function getSpeechRecognitionCtor():
  | (new () => SpeechRecognitionLike)
  | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Scale mic listen window for longer Quran ayahs. */
export function listenMsForArabic(target: string): number {
  const len = normalizeArabic(target).length;
  if (len <= 20) return 6000;
  if (len <= 50) return 9000;
  return 12000;
}
