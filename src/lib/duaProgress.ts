const STORAGE_KEY = "falahi-dua-progress";

export type DuaMark = "known" | "learning";
export type DuaProgressMap = Record<string, DuaMark>;

function normalize(raw: unknown): DuaProgressMap {
  if (!raw || typeof raw !== "object") return {};
  const map: DuaProgressMap = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value === "known" || value === "learning") map[key] = value;
  }
  return map;
}

export function getDuaProgress(): DuaProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return normalize(JSON.parse(raw) as unknown);
  } catch {
    return {};
  }
}

export function markDua(id: number, mark: DuaMark): DuaProgressMap {
  const next = { ...getDuaProgress(), [String(id)]: mark };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
