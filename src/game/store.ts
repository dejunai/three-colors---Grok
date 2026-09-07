import { create } from "zustand";
import type { A11y, ChapterId, Coat, ItemId, SaveV1, Screen, ConsultOption } from "./types";
import { CLUES, SPINE } from "./content";
import { defaultA11y, readSave, writeSave, clearSave } from "./save";
import { audio } from "./audio";

export type Overlay =
  | null
  | { kind: "examine"; title: string; body: string; clueId?: string }
  | { kind: "card"; lines: { speaker?: string; text: string }[]; index: number }
  | { kind: "choices"; title: string; options: ConsultOption[] }
  | { kind: "file" }
  | { kind: "board" }
  | { kind: "inventory" }
  | { kind: "prompt"; text: string };

type GameStore = {
  screen: Screen;
  chapter: ChapterId;
  locationId: string;
  overlay: Overlay;
  prompt: string | null;
  coat: Coat;
  flask: number;
  flaskSpilled: boolean;
  ammo: number;
  spare: number;
  matches: number;
  opium: number;
  strength: number;
  fuel: number;
  combat: number;
  decay: number;
  iris: number;
  examined: Record<string, true>;
  clues: Record<string, true>;
  inventory: ItemId[];
  flags: Record<string, true>;
  pack: ItemId[];
  codex: string[];
  filedEight: boolean;
  triplicate: boolean;
  spine: boolean;
  heardShatter: boolean;
  finalAct: "seal" | "place" | "burn" | null;
  wageClaim: boolean;
  chaptersDone: ChapterId[];
  achievements: Record<string, true>;
  a11y: A11y;
  muted: boolean;
  locked: boolean;
  glitch: number;
  lookHint: boolean;

  hydrate: () => void;
  persist: () => void;
  setScreen: (s: Screen) => void;
  setA11y: (p: Partial<A11y>) => void;
  setMuted: (m: boolean) => void;
  newGame: (chapter: ChapterId) => void;
  continueGame: () => void;
  wipeSave: () => void;
  setLocation: (id: string) => void;
  examine: (id: string, title: string, body: string, opts?: { clueId?: string; perception?: number; item?: ItemId; flag?: string }) => void;
  closeOverlay: () => void;
  advanceCard: () => void;
  openFile: () => void;
  openBoard: () => void;
  openInventory: () => void;
  drinkFlask: () => void;
  drinkOpium: () => void;
  strikeMatch: () => void;
  toggleCoat: () => void;
  addClue: (id: string, perception?: number) => void;
  setFlag: (id: string) => void;
  addItem: (id: ItemId) => void;
  consult: (lines: { speaker?: string; text: string }[], opts?: { clueId?: string; perception?: number; flag?: string; item?: ItemId; unlock?: string }) => void;
  fire: () => boolean;
  spillFlask: () => void;
  shatter: () => void;
  bumpDecay: (n: number) => void;
  tickDecay: (dt: number) => void;
  setIris: (v: number) => void;
  die: () => void;
  chooseFinal: (act: "seal" | "place" | "burn") => void;
  fileEight: () => void;
  fileTriplicate: () => void;
  collectPack: (id: ItemId, documentOnly: boolean, note: string) => void;
  difficultyGlitch: () => void;
  setPrompt: (t: string | null) => void;
  setLocked: (v: boolean) => void;
  openChoices: (title: string, options: ConsultOption[]) => void;
  pickChoice: (id: string) => void;
};

const startInv = (ch: ChapterId): ItemId[] => {
  if (ch === 1) return ["flask", "notebook", "lantern", "revolver"];
  if (ch === 2) return ["opaline", "notebook", "lantern"];
  return ["cigarettes", "matches", "walter-file", "lantern"];
};

function snapshot(s: GameStore): SaveV1 {
  return {
    version: 1,
    screen: s.screen === "play" || s.screen === "pause" ? "play" : s.screen,
    chapter: s.chapter,
    locationId: s.locationId,
    coat: s.coat,
    flask: s.flask,
    flaskSpilled: s.flaskSpilled,
    ammo: s.ammo,
    spare: s.spare,
    matches: s.matches,
    opium: s.opium,
    strength: s.strength,
    fuel: s.fuel,
    combat: s.combat,
    examined: Object.keys(s.examined),
    clues: Object.keys(s.clues),
    inventory: s.inventory,
    flags: Object.keys(s.flags),
    pack: s.pack,
    codex: s.codex,
    filedEight: s.filedEight,
    triplicate: s.triplicate,
    spine: s.spine,
    heardShatter: s.heardShatter,
    finalAct: s.finalAct,
    wageClaim: s.wageClaim,
    chaptersDone: s.chaptersDone,
    achievements: Object.keys(s.achievements),
    a11y: s.a11y,
  };
}

function applySave(s: GameStore, d: SaveV1) {
  s.screen = d.screen;
  s.chapter = d.chapter;
  s.locationId = d.locationId;
  s.coat = d.coat;
  s.flask = d.flask;
  s.flaskSpilled = d.flaskSpilled;
  s.ammo = d.ammo;
  s.spare = d.spare;
  s.matches = d.matches;
  s.opium = d.opium;
  s.strength = d.strength;
  s.fuel = d.fuel;
  s.combat = d.combat;
  s.examined = Object.fromEntries(d.examined.map((k) => [k, true]));
  s.clues = Object.fromEntries(d.clues.map((k) => [k, true]));
  s.inventory = d.inventory;
  s.flags = Object.fromEntries(d.flags.map((k) => [k, true]));
  s.pack = d.pack;
  s.codex = d.codex;
  s.filedEight = d.filedEight;
  s.triplicate = d.triplicate;
  s.spine = d.spine;
  s.heardShatter = d.heardShatter;
  s.finalAct = d.finalAct;
  s.wageClaim = d.wageClaim;
  s.chaptersDone = d.chaptersDone;
  s.achievements = Object.fromEntries(d.achievements.map((k) => [k, true]));
  s.a11y = { ...defaultA11y(), ...d.a11y };
}

function maybeSpine(get: () => GameStore, set: (p: Partial<GameStore>) => void) {
  const s = get();
  if (s.spine || s.chapter !== 1) return;
  const has = (id: string) => Boolean(s.clues[id]);
  const ready = SPINE.every((id) => has(id)) || s.fuel >= 72;
  if (ready) set({ spine: true });
}

let persistTimer: ReturnType<typeof setTimeout> | null = null;

export const useGame = create<GameStore>((set, get) => ({
  screen: "title",
  chapter: 1,
  locationId: "drive",
  overlay: null,
  prompt: null,
  coat: "uniform",
  flask: 5,
  flaskSpilled: false,
  ammo: 6,
  spare: 6,
  matches: 12,
  opium: 4,
  strength: 3,
  fuel: 8,
  combat: 6,
  decay: 0.05,
  iris: 0.72,
  examined: {},
  clues: {},
  inventory: startInv(1),
  flags: {},
  pack: [],
  codex: [],
  filedEight: false,
  triplicate: false,
  spine: false,
  heardShatter: false,
  finalAct: null,
  wageClaim: false,
  chaptersDone: [],
  achievements: {},
  a11y: defaultA11y(),
  muted: false,
  locked: false,
  glitch: 0,
  lookHint: true,

  hydrate: () => {
    const d = readSave();
    if (!d) return;
    set((s) => {
      const next = { ...s };
      applySave(next, d);
      return next;
    });
  },
  persist: () => {
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(() => writeSave(snapshot(get())), 400);
  },
  setScreen: (screen) => {
    set({ screen, overlay: screen === "play" ? get().overlay : null });
    get().persist();
  },
  setA11y: (p) => {
    set({ a11y: { ...get().a11y, ...p } });
    get().persist();
  },
  setMuted: (m) => {
    set({ muted: m });
    audio.setMuted(m);
  },
  newGame: (chapter) => {
    const loc = chapter === 1 ? "drive" : chapter === 2 ? "shore" : "voss";
    set({
      screen: chapter === 1 ? "prologue" : "play",
      chapter,
      locationId: loc,
      overlay: null,
      coat: "uniform",
      flask: 5,
      flaskSpilled: false,
      ammo: chapter === 3 ? 18 : 6,
      spare: chapter === 3 ? 18 : 6,
      matches: 12,
      opium: 4,
      strength: chapter === 3 ? 6 : 3,
      fuel: chapter === 1 ? 8 : 10,
      combat: chapter === 3 ? 7 : 2,
      decay: 0.04,
      iris: chapter === 1 ? 0.72 : 0.95,
      examined: {},
      clues: {},
      inventory: startInv(chapter),
      flags: {},
      pack: [],
      codex: [],
      filedEight: false,
      triplicate: false,
      spine: false,
      heardShatter: false,
      finalAct: null,
      wageClaim: false,
      locked: false,
    });
    get().persist();
  },
  wipeSave: () => {
    clearSave();
    set({
      screen: "title",
      chapter: 1,
      locationId: "drive",
      overlay: null,
      prompt: null,
      coat: "uniform",
      flask: 5,
      flaskSpilled: false,
      ammo: 6,
      spare: 6,
      matches: 12,
      opium: 4,
      strength: 3,
      fuel: 8,
      combat: 6,
      decay: 0.04,
      iris: 0.72,
      examined: {},
      clues: {},
      inventory: startInv(1),
      flags: {},
      pack: [],
      codex: [],
      filedEight: false,
      triplicate: false,
      spine: false,
      heardShatter: false,
      finalAct: null,
      wageClaim: false,
      chaptersDone: [],
      achievements: {},
      locked: false,
      glitch: 0,
    });
  },
  continueGame: () => {
    const d = readSave();
    if (!d) {
      get().newGame(1);
      return;
    }
    set((s) => {
      const next = { ...s };
      applySave(next, d);
      next.screen = d.screen === "title" ? "play" : d.screen;
      return next;
    });
  },
  setLocation: (id) => {
    set({ locationId: id, overlay: null, prompt: null });
    if (id === "garden" && get().iris < 0.8) set({ iris: 0.86 });
    if (id === "room" && get().spine) set({ iris: 1.15 });
    get().persist();
  },
  examine: (id, title, body, opts) => {
    const s = get();
    const examined = { ...s.examined, [id]: true as const };
    let fuel = s.fuel;
    let clues = s.clues;
    let inventory = s.inventory;
    let flags = s.flags;
    if (opts?.perception) fuel = Math.min(100, fuel + opts.perception);
    if (opts?.clueId) clues = { ...clues, [opts.clueId]: true };
    if (opts?.item && !inventory.includes(opts.item)) inventory = [...inventory, opts.item];
    if (opts?.flag) flags = { ...flags, [opts.flag]: true };
    const protect = s.a11y.protectClues;
    const unstable = opts?.clueId ? CLUES[opts.clueId]?.unstable : undefined;
    const shown =
      !protect && unstable && s.decay > 0.45 && Math.random() < s.decay * 0.5
        ? unstable
        : body;
    set({
      examined,
      fuel,
      clues,
      inventory,
      flags,
      overlay: { kind: "examine", title, body: shown, clueId: opts?.clueId },
      decay: Math.min(1, s.decay + 0.015),
    });
    maybeSpine(get, set);
    get().persist();
  },
  closeOverlay: () => set({ overlay: null }),
  advanceCard: () => {
    const o = get().overlay;
    if (!o || o.kind !== "card") return;
    if (o.index + 1 >= o.lines.length) set({ overlay: null });
    else set({ overlay: { ...o, index: o.index + 1 } });
  },
  openFile: () => set({ overlay: { kind: "file" } }),
  openBoard: () => set({ overlay: { kind: "board" } }),
  openInventory: () => set({ overlay: { kind: "inventory" } }),
  drinkFlask: () => {
    const s = get();
    if (s.chapter !== 1 || s.flask <= 0 || s.flaskSpilled) return;
    set({ flask: s.flask - 1, decay: Math.max(0.02, s.decay * 0.45) });
    get().persist();
  },
  drinkOpium: () => {
    const s = get();
    if (s.chapter !== 2 || s.opium <= 0) return;
    set({ opium: s.opium - 1, decay: Math.max(0.02, s.decay * 0.5) });
    get().persist();
  },
  strikeMatch: () => {
    const s = get();
    if (s.chapter !== 3 || s.matches <= 0) return;
    set({ matches: s.matches - 1, flags: { ...s.flags, lit: true } });
    get().persist();
  },
  toggleCoat: () => {
    if (get().chapter !== 1) return;
    const s = get();
    if (s.coat === "uniform" && !s.inventory.includes("coat-plain")) return;
    set({ coat: s.coat === "uniform" ? "plain" : "uniform" });
  },
  addClue: (id, perception = 4) => {
    const s = get();
    if (s.clues[id]) return;
    set({ clues: { ...s.clues, [id]: true }, fuel: Math.min(100, s.fuel + perception) });
    maybeSpine(get, set);
    get().persist();
  },
  setFlag: (id) => set({ flags: { ...get().flags, [id]: true } }),
  addItem: (id) => {
    if (get().inventory.includes(id)) return;
    set({ inventory: [...get().inventory, id] });
  },
  consult: (lines, opts) => {
    const s = get();
    let fuel = s.fuel;
    let clues = s.clues;
    let flags = s.flags;
    let inventory = s.inventory;
    if (opts?.perception) fuel = Math.min(100, fuel + opts.perception);
    if (opts?.clueId) clues = { ...clues, [opts.clueId]: true };
    if (opts?.flag) flags = { ...flags, [opts.flag]: true };
    if (opts?.item && !inventory.includes(opts.item)) inventory = [...inventory, opts.item];
    if (opts?.unlock) flags = { ...flags, [opts.unlock]: true };
    set({
      fuel,
      clues,
      flags,
      inventory,
      overlay: { kind: "card", lines, index: 0 },
      decay: Math.min(1, s.decay + 0.02),
    });
    maybeSpine(get, set);
    get().persist();
  },
  fire: () => {
    const s = get();
    if (s.ammo <= 0) return false;
    set({ ammo: s.ammo - 1 });
    audio.gun();
    return true;
  },
  spillFlask: () => {
    if (get().flaskSpilled) return;
    set({ flaskSpilled: true, flask: 0, flags: { ...get().flags, flaskLost: true } });
    get().persist();
  },
  shatter: () => {
    if (get().heardShatter) return;
    set({ heardShatter: true, decay: Math.min(1, get().decay + 0.12) });
    audio.shatter();
  },
  bumpDecay: (n) => set({ decay: Math.min(1, get().decay + n) }),
  tickDecay: (dt) => {
    const s = get();
    const add = dt * 0.004 * (0.4 + s.fuel / 140);
    set({ decay: Math.min(1, s.decay + add) });
  },
  setIris: (v) => set({ iris: v }),
  die: () => {
    const s = get();
    const chaptersDone = s.chaptersDone.includes(s.chapter)
      ? s.chaptersDone
      : [...s.chaptersDone, s.chapter];
    const achievements = { ...s.achievements };
    if (s.chapter === 1) achievements.died = true;
    if (s.chapter === 2) achievements.diedAgain = true;
    if (s.chapter === 3) achievements.diedKnowing = true;
    set({ screen: "ending", chaptersDone, achievements, overlay: null });
    get().persist();
  },
  chooseFinal: (act) => {
    set({ finalAct: act });
    get().die();
  },
  fileEight: () => set({ filedEight: true, flags: { ...get().flags, eight: true } }),
  fileTriplicate: () => set({ triplicate: true, flags: { ...get().flags, triplicate: true } }),
  collectPack: (id, documentOnly, note) => {
    const s = get();
    const pack = documentOnly ? s.pack : s.pack.length < 10 ? [...s.pack, id] : s.pack;
    const codex = s.codex.includes(note) ? s.codex : [...s.codex, note];
    set({ pack, codex, fuel: Math.min(100, s.fuel + 3) });
    get().persist();
  },
  difficultyGlitch: () => {
    set({ glitch: Date.now() });
    setTimeout(() => {
      if (get().glitch) set({ glitch: 0 });
    }, 280);
  },
  setPrompt: (t) => set({ prompt: t }),
  setLocked: (v) => set({ locked: v }),
  openChoices: (title, options) => set({ overlay: { kind: "choices", title, options } }),
  pickChoice: (id) => {
    const o = get().overlay;
    if (!o || o.kind !== "choices") return;
    const pick = o.options.find((x) => x.id === id);
    if (!pick) return;
    const r = pick.result;
    get().consult(r.lines, {
      clueId: r.clueId,
      perception: r.perception,
      flag: r.flag,
      item: r.item,
      unlock: r.unlock,
    });
  },
}));

export function hasSave() {
  return Boolean(readSave());
}

export { clearSave };
