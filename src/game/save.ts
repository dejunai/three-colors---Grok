import type { A11y, SaveV1 } from "./types";

const KEY = "tcom.save.v1";
const BACKUP = "tcom.save.v1.bak";
export const SAVE_VERSION = 1 as const;

export const defaultA11y = (): A11y => ({
  flickerReduce: false,
  distortion: 0.7,
  highContrast: false,
  protectClues: true,
  subtitleScale: 1,
  reducedMotion: false,
});

export function writeSave(data: SaveV1) {
  try {
    const prev = localStorage.getItem(KEY);
    if (prev) localStorage.setItem(BACKUP, prev);
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* private mode / quota */
  }
}

export function readSave(): SaveV1 | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveV1;
    if (!parsed || parsed.version !== 1) return null;
    parsed.a11y = { ...defaultA11y(), ...parsed.a11y };
    return parsed;
  } catch {
    return null;
  }
}

export function clearSave() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
