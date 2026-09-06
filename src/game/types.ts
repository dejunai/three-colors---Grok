export type Screen =
  | "title"
  | "accessibility"
  | "difficulty"
  | "chapters"
  | "prologue"
  | "play"
  | "ending"
  | "archive"
  | "pause";

export type ChapterId = 1 | 2 | 3;

export type Coat = "uniform" | "plain";

export type Vec3 = [number, number, number];

export type A11y = {
  flickerReduce: boolean;
  distortion: number; // 0–1, player-facing intensity cap
  highContrast: boolean;
  protectClues: boolean;
  subtitleScale: number;
  reducedMotion: boolean;
};

export type ItemId =
  | "flask"
  | "notebook"
  | "lantern"
  | "knife"
  | "revolver"
  | "whistle"
  | "coat-plain"
  | "opaline"
  | "codex"
  | "trinket"
  | "artifact"
  | "matches"
  | "cigarettes"
  | "wage-claim"
  | "ophion-book"
  | "walter-file"
  | "charges";

export type ClueId = string;

export type DialogueLine = {
  speaker?: string;
  text: string;
  card?: boolean; // silent intertitle
};

export type ConsultOption = {
  id: string;
  label: string;
  requireCoat?: Coat;
  requireClue?: ClueId;
  requireFlag?: string;
  hideIf?: ClueId;
  result: ConsultResult;
};

export type ConsultResult = {
  lines: DialogueLine[];
  clueId?: ClueId;
  perception?: number;
  flag?: string;
  item?: ItemId;
  unlock?: string;
};

export type Interactable = {
  id: string;
  pos: Vec3;
  radius?: number;
  label: string;
  kind: "examine" | "person" | "exit" | "pickup" | "use";
  title?: string;
  body?: string;
  bodyAlt?: string; // unstable presentation; facts remain
  clueId?: ClueId;
  perception?: number;
  item?: ItemId;
  exitTo?: string;
  exitSpawn?: Vec3;
  requireItem?: ItemId;
  requireFlag?: string;
  hideIfExamined?: boolean;
  once?: boolean;
  options?: ConsultOption[];
  heavy?: boolean; // Strength check flavor
  flag?: string;
};

export type Wall = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

export type SetKind =
  | "drive"
  | "garden"
  | "street"
  | "interior"
  | "tunnel"
  | "island"
  | "cavern"
  | "office";

export type LocationDef = {
  id: string;
  chapter: ChapterId;
  name: string;
  set: SetKind;
  spawn: Vec3;
  yaw?: number;
  fog: string;
  fogNear: number;
  fogFar: number;
  ambient: string;
  iris: "square" | "open" | "wide" | "burn";
  floor: "grass" | "gravel" | "wood" | "stone" | "water";
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  walls?: Wall[];
  interactables: Interactable[];
  note?: string;
};

export type ClueDef = {
  id: ClueId;
  title: string;
  fact: string;
  unstable?: string;
  boardColumn: "club" | "victims" | "town" | "below" | "codex" | "war";
  required?: boolean;
};

export type SaveV1 = {
  version: 1;
  screen: Screen;
  chapter: ChapterId;
  locationId: string;
  coat: Coat;
  flask: number;
  flaskSpilled: boolean;
  ammo: number;
  spare: number;
  matches: number;
  opium: number;
  strength: number;
  fuel: number; // perception / agility / (unused for ekon)
  combat: number;
  examined: string[];
  clues: string[];
  inventory: ItemId[];
  flags: string[];
  pack: ItemId[];
  codex: string[];
  filedEight: boolean;
  triplicate: boolean;
  spine: boolean;
  heardShatter: boolean;
  finalAct: "seal" | "place" | "burn" | null;
  wageClaim: boolean;
  chaptersDone: ChapterId[];
  achievements: string[];
  a11y: A11y;
};
