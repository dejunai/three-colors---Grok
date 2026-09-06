/** Web Audio mixer. Unlock on first gesture. Cough is the only sound until shatter. */

type Bus = GainNode;

class GameAudio {
  ctx: AudioContext | null = null;
  master!: Bus;
  sfx!: Bus;
  music!: Bus;
  unlocked = false;
  muted = false;
  private lastCough = 0;

  unlock() {
    if (this.unlocked && this.ctx) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC({ latencyHint: "interactive" });
    this.master = this.ctx.createGain();
    this.sfx = this.ctx.createGain();
    this.music = this.ctx.createGain();
    this.sfx.gain.value = 0.7;
    this.music.gain.value = 0.35;
    this.master.gain.value = 0.85;
    this.sfx.connect(this.master);
    this.music.connect(this.master);
    this.master.connect(this.ctx.destination);
    void this.ctx.resume();
    this.unlocked = true;
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) void this.ctx?.resume();
    });
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : 0.85, this.ctx!.currentTime, 0.02);
  }

  private noise(duration: number, color = 1) {
    if (!this.ctx) return null;
    const n = this.ctx.sampleRate * duration;
    const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      last = last * (1 - color) + w * color;
      d[i] = last;
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    return src;
  }

  cough(intensity = 0.4) {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    if (now - this.lastCough < 2.4) return;
    this.lastCough = now;
    const src = this.noise(0.28, 0.35);
    if (!src) return;
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1400 + Math.random() * 400;
    f.Q.value = 1.6;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18 * intensity, now + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
    src.playbackRate.value = 0.9 + Math.random() * 0.25;
    src.connect(f);
    f.connect(g);
    g.connect(this.sfx);
    src.start(now);
    src.stop(now + 0.3);
  }

  groan() {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(70, now);
    o.frequency.exponentialRampToValueAtTime(42, now + 0.8);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.12, now + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
    o.connect(g);
    g.connect(this.sfx);
    o.start(now);
    o.stop(now + 1.2);
  }

  shatter() {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const src = this.noise(0.7, 1);
    if (!src) return;
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = 1800;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.55, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
    src.connect(f);
    f.connect(g);
    g.connect(this.sfx);
    src.start(now);
    src.stop(now + 0.7);
  }

  foot(rate = 1) {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const src = this.noise(0.08, 0.8);
    if (!src) return;
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 500;
    g.gain.setValueAtTime(0.07 * rate, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    src.playbackRate.value = 0.8 + Math.random() * 0.4;
    src.connect(f);
    f.connect(g);
    g.connect(this.sfx);
    src.start(now);
    src.stop(now + 0.09);
  }

  gun() {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const src = this.noise(0.22, 1);
    if (!src) return;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.5, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    src.connect(g);
    g.connect(this.sfx);
    src.start(now);
    src.stop(now + 0.22);
  }

  drone(on: boolean) {
    if (!this.ctx) return;
    if (!on) return;
    // light bed after shatter only — created per call as a short pad
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.value = 48;
    g.gain.value = 0.03;
    o.connect(g);
    g.connect(this.music);
    o.start();
    setTimeout(() => {
      try {
        o.stop();
      } catch {
        /* already stopped */
      }
    }, 4000);
  }
}

export const audio = new GameAudio();
