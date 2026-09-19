/** Normalize Arabic for loose pronunciation matching. */
export function normalizeArabic(text: string): string {
  return text
    .normalize("NFC")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "") // tashkeel
    .replace(/\u0640/g, "") // tatweel
    .replace(/[إأآاٱ]/g, "ا")
    .replace(/[ىي]/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\u0600-\u06FF\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function maxAllowedDistance(len: number): number {
  if (len <= 4) return 1;
  return 2;
}

export function pronunciationMatches(heard: string, target: string): boolean {
  const a = normalizeArabic(heard);
  const b = normalizeArabic(target);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;

  const targetTokens = b.split(" ").filter(Boolean);
  if (targetTokens.some((tok) => tok === a || a.includes(tok) || tok.includes(a))) {
    return true;
  }

  const heardTokens = a.split(" ").filter(Boolean);
  if (heardTokens.some((tok) => tok === b || pronunciationTokenClose(tok, b))) {
    return true;
  }

  const limit = maxAllowedDistance(Math.min(a.length, b.length));
  if (Math.abs(a.length - b.length) <= limit && editDistance(a, b) <= limit) {
    return true;
  }
  return false;
}

function pronunciationTokenClose(heardTok: string, target: string): boolean {
  if (!heardTok || !target) return false;
  if (heardTok === target) return true;
  const limit = maxAllowedDistance(Math.min(heardTok.length, target.length));
  return (
    Math.abs(heardTok.length - target.length) <= limit &&
    editDistance(heardTok, target) <= limit
  );
}

/** Pick the best transcript alternative against the target Arabic. */
export function bestPronunciationMatch(
  heardAlternatives: string[],
  target: string,
): { ok: boolean; heard: string } {
  const alts = heardAlternatives.map((s) => s.trim()).filter(Boolean);
  if (alts.length === 0) return { ok: false, heard: "" };

  for (const alt of alts) {
    if (pronunciationMatches(alt, target)) {
      return { ok: true, heard: alt };
    }
  }
  return { ok: false, heard: alts[0] ?? "" };
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
