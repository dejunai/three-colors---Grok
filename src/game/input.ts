/** Device layer → abstract actions. Gameplay reads only actions. */

export type Actions = {
  moveX: number;
  moveY: number;
  lookX: number;
  lookY: number;
  interact: boolean;
  flask: boolean;
  file: boolean;
  inventory: boolean;
  coat: boolean;
  fire: boolean;
  jump: boolean;
  crouch: boolean;
  pause: boolean;
};

const empty = (): Actions => ({
  moveX: 0,
  moveY: 0,
  lookX: 0,
  lookY: 0,
  interact: false,
  flask: false,
  file: false,
  inventory: false,
  coat: false,
  fire: false,
  jump: false,
  crouch: false,
  pause: false,
});

const GAME_KEYS = new Set([
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Space",
  "KeyE",
  "KeyF",
  "KeyQ",
  "KeyC",
  "KeyI",
  "Tab",
  "KeyR",
  "ShiftLeft",
  "ControlLeft",
  "Escape",
  "Enter",
]);

/** Map KeyboardEvent.key (lowercased) → KeyboardEvent.code for synthetic events. */
const KEY_TO_CODE: Record<string, string> = {
  w: "KeyW",
  a: "KeyA",
  s: "KeyS",
  d: "KeyD",
  e: "KeyE",
  f: "KeyF",
  i: "KeyI",
  c: "KeyC",
  q: "KeyQ",
  r: "KeyR",
  tab: "Tab",
  escape: "Escape",
  esc: "Escape",
  " ": "Space",
  space: "Space",
  spacebar: "Space",
  arrowup: "ArrowUp",
  arrowdown: "ArrowDown",
  arrowleft: "ArrowLeft",
  arrowright: "ArrowRight",
  shift: "ShiftLeft",
  control: "ControlLeft",
  ctrl: "ControlLeft",
  enter: "Enter",
  return: "Enter",
};

/** Prefer event.code; fall back to event.key when code is missing or unrecognized. */
export function resolveKeyCode(e: { code?: string; key?: string }): string | null {
  const code = e.code ?? "";
  if (code && GAME_KEYS.has(code)) return code;
  const mapped = KEY_TO_CODE[(e.key ?? "").toLowerCase()];
  if (mapped && GAME_KEYS.has(mapped)) return mapped;
  return null;
}

export type GameInputHook = {
  /** Strafe X (−1 left … +1 right), forward Y (−1 back … +1 forward). Held for `ms` (default 400). */
  move: (x: number, y: number, ms?: number) => void;
  /** Add look delta in the same units as pointer movement. */
  look: (dx: number, dy: number) => void;
  interact: () => void;
  openFile: () => void;
  openInventory: () => void;
  flask: () => void;
  coat: () => void;
  pause: () => void;
  jump: () => void;
  fire: () => void;
  /** One-frame pulse of a KeyboardEvent.code. */
  tap: (code: string) => void;
  /** Hold these codes until the next setKeys / clear. */
  setKeys: (codes: string[]) => void;
  clear: () => void;
};

const listenOpts: AddEventListenerOptions = { capture: true };

class Input {
  keys = new Set<string>();
  injected = new Set<string>();
  pulses = new Set<string>();
  lookX = 0;
  lookY = 0;
  stickX = 0;
  stickY = 0;
  lookStickX = 0;
  lookStickY = 0;
  private prev: Actions = empty();
  private edges: Actions = empty();
  private bound = false;
  pointerDown = false;
  /** Failed pointer-lock (iframe / WrongDocumentError) must not wipe held WASD. */
  private suppressBlurClear = false;
  private moveTimer: ReturnType<typeof setTimeout> | null = null;

  bind() {
    if (this.bound) return;
    this.bound = true;
    window.addEventListener("keydown", this.onKeyDown, listenOpts);
    window.addEventListener("keyup", this.onKeyUp, listenOpts);
    window.addEventListener("blur", this.onBlur);
    document.addEventListener("visibilitychange", this.onVis);
    window.addEventListener("pointermove", this.onMove);
    window.addEventListener("pointerup", this.onUp);
    window.addEventListener("pointercancel", this.onUp);
    window.addEventListener("contextmenu", this.onMenu);
    document.addEventListener("pointerlockerror", this.onLockError);
    this.installHook();
  }

  unbind() {
    if (!this.bound) return;
    this.bound = false;
    window.removeEventListener("keydown", this.onKeyDown, listenOpts);
    window.removeEventListener("keyup", this.onKeyUp, listenOpts);
    window.removeEventListener("blur", this.onBlur);
    document.removeEventListener("visibilitychange", this.onVis);
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerup", this.onUp);
    window.removeEventListener("pointercancel", this.onUp);
    window.removeEventListener("contextmenu", this.onMenu);
    document.removeEventListener("pointerlockerror", this.onLockError);
    this.clear();
  }

  installHook() {
    if (typeof window === "undefined") return;
    window.__gameInput = {
      move: (x, y, ms = 400) => this.move(x, y, ms),
      look: (dx, dy) => {
        this.lookX += dx;
        this.lookY += dy;
      },
      interact: () => this.tap("KeyE"),
      openFile: () => this.tap("Tab"),
      openInventory: () => this.tap("KeyI"),
      flask: () => this.tap("KeyF"),
      coat: () => this.tap("KeyC"),
      pause: () => this.tap("Escape"),
      jump: () => this.tap("Space"),
      fire: () => {
        this.tap("ControlLeft");
        this.tap("Mouse0");
      },
      tap: (code) => this.tap(code),
      setKeys: (codes) => this.setKeys(codes),
      clear: () => this.clear(),
    };
  }

  tap(code: string) {
    this.pulses.add(code);
  }

  move(x: number, y: number, ms = 400) {
    this.stickX = Math.max(-1, Math.min(1, x));
    this.stickY = Math.max(-1, Math.min(1, y));
    if (this.moveTimer) clearTimeout(this.moveTimer);
    this.moveTimer = setTimeout(() => {
      this.stickX = 0;
      this.stickY = 0;
      this.moveTimer = null;
    }, Math.max(0, ms));
  }

  /** Next window blur (failed pointer lock) must not drop held movement keys. */
  ignoreNextBlur() {
    this.suppressBlurClear = true;
  }

  private onMenu = (e: Event) => e.preventDefault();

  private onLockError = () => {
    this.suppressBlurClear = true;
  };

  private onKeyDown = (e: KeyboardEvent) => {
    const code = resolveKeyCode(e);
    if (!code) return;
    e.preventDefault();
    this.keys.add(code);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    const code = resolveKeyCode(e);
    if (!code) return;
    this.keys.delete(code);
  };

  private onVis = () => {
    if (document.hidden) this.clear();
  };

  private onBlur = () => {
    if (this.suppressBlurClear) {
      this.suppressBlurClear = false;
      this.pointerDown = false;
      return;
    }
    this.clear();
  };

  private onMove = (e: PointerEvent) => {
    const locked = Boolean(document.pointerLockElement);
    if (!locked && !this.pointerDown) return;
    this.lookX += e.movementX;
    this.lookY += e.movementY;
  };

  private onUp = () => {
    this.pointerDown = false;
  };

  clear = () => {
    this.keys.clear();
    this.injected.clear();
    this.pulses.clear();
    this.pointerDown = false;
    this.stickX = 0;
    this.stickY = 0;
    if (this.moveTimer) {
      clearTimeout(this.moveTimer);
      this.moveTimer = null;
    }
  };

  setKeys(codes: string[]) {
    this.injected = new Set(codes);
  }

  has(code: string) {
    return this.keys.has(code) || this.injected.has(code) || this.pulses.has(code);
  }

  pollGamepad() {
    const pads = navigator.getGamepads?.() ?? [];
    for (const p of pads) {
      if (!p || p.mapping !== "standard") continue;
      const lx = p.axes[0] ?? 0;
      const ly = p.axes[1] ?? 0;
      const mag = Math.hypot(lx, ly);
      const dz = 0.15;
      if (mag > dz) {
        const s = (mag - dz) / (1 - dz) / mag;
        this.stickX = lx * s;
        this.stickY = -ly * s;
      }
      const rx = p.axes[2] ?? 0;
      const ry = p.axes[3] ?? 0;
      const rm = Math.hypot(rx, ry);
      if (rm > dz) {
        const s = (rm - dz) / (1 - dz) / rm;
        this.lookX += rx * s * 18;
        this.lookY += ry * s * 14;
      }
      if (p.buttons[0]?.pressed) this.keys.add("Space");
      if (p.buttons[1]?.pressed) this.keys.add("KeyF");
      if (p.buttons[2]?.pressed) this.keys.add("KeyE");
      if (p.buttons[9]?.pressed) this.keys.add("Escape");
      if (p.buttons[7]?.value && p.buttons[7].value > 0.5) this.keys.add("Mouse0");
    }
  }

  sample(): { now: Actions; just: Actions } {
    this.pollGamepad();
    const now = empty();
    let x = 0;
    let y = 0;
    if (this.has("KeyA") || this.has("ArrowLeft")) x -= 1;
    if (this.has("KeyD") || this.has("ArrowRight")) x += 1;
    if (this.has("KeyW") || this.has("ArrowUp")) y += 1;
    if (this.has("KeyS") || this.has("ArrowDown")) y -= 1;
    x += this.stickX;
    y += this.stickY;
    const m = Math.hypot(x, y);
    if (m > 1) {
      x /= m;
      y /= m;
    }
    now.moveX = x;
    now.moveY = y;
    now.lookX = this.lookX + this.lookStickX * 12;
    now.lookY = this.lookY + this.lookStickY * 12;
    this.lookX = 0;
    this.lookY = 0;
    now.interact = this.has("KeyE");
    now.flask = this.has("KeyF");
    now.file = this.has("Tab");
    now.inventory = this.has("KeyI");
    now.coat = this.has("KeyC") || this.has("KeyQ");
    now.fire = this.has("Mouse0") && this.has("ControlLeft");
    now.jump = this.has("Space");
    now.crouch = this.has("ControlLeft") || this.has("ShiftLeft");
    now.pause = this.has("Escape");
    const just = empty();
    (Object.keys(now) as (keyof Actions)[]).forEach((k) => {
      if (typeof now[k] === "boolean") {
        (just as unknown as Record<string, boolean>)[k] = Boolean(now[k]) && !this.prev[k];
      }
    });
    this.prev = now;
    this.edges = just;
    this.pulses.clear();
    return { now, just };
  }
}

export const input = new Input();

if (typeof window !== "undefined") input.installHook();

declare global {
  interface Window {
    __gameInput?: GameInputHook;
  }
}
