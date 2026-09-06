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
]);

class Input {
  keys = new Set<string>();
  injected = new Set<string>();
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

  bind() {
    if (this.bound) return;
    this.bound = true;
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("blur", this.clear);
    document.addEventListener("visibilitychange", this.onVis);
    window.addEventListener("pointermove", this.onMove);
    window.addEventListener("pointerup", this.onUp);
    window.addEventListener("pointercancel", this.onUp);
    window.addEventListener("contextmenu", this.onMenu);
  }

  unbind() {
    if (!this.bound) return;
    this.bound = false;
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("blur", this.clear);
    document.removeEventListener("visibilitychange", this.onVis);
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerup", this.onUp);
    window.removeEventListener("pointercancel", this.onUp);
    window.removeEventListener("contextmenu", this.onMenu);
    this.clear();
  }

  private onMenu = (e: Event) => e.preventDefault();

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    if (GAME_KEYS.has(e.code)) e.preventDefault();
    this.keys.add(e.code);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
  };

  private onVis = () => {
    if (document.hidden) this.clear();
  };

  private onMove = (e: PointerEvent) => {
    if (!this.pointerDown) return;
    this.lookX += e.movementX;
    this.lookY += e.movementY;
  };

  private onUp = () => {
    this.pointerDown = false;
  };

  clear = () => {
    this.keys.clear();
    this.pointerDown = false;
    this.stickX = 0;
    this.stickY = 0;
  };

  setKeys(codes: string[]) {
    this.injected = new Set(codes);
  }

  has(code: string) {
    return this.keys.has(code) || this.injected.has(code);
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
    now.interact = this.has("KeyE") || this.has("Mouse0");
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
    return { now, just };
  }
}

export const input = new Input();
