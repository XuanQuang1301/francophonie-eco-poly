/**
 * Super lightweight Web Audio Synthesizer for board game sounds.
 * 100% client-side, no external files required.
 */
export class SoundEngine {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  private tone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.1) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (_) {}
  }

  playTick() { this.tone(320, 0.1, 'triangle', 0.07); }
  playDice() { this.tone(150, 0.25, 'sine', 0.12); }
  playJail() { this.tone(150, 0.45, 'square', 0.08); }
  playFailure() { this.tone(220, 0.45, 'sawtooth', 0.1); }

  playSuccess() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      gain.connect(this.ctx.destination);
      [523, 659, 784].forEach((f, i) => {
        const o = this.ctx!.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, t + i * 0.1);
        o.connect(gain);
        o.start(t + i * 0.1);
        o.stop(t + 0.5);
      });
    } catch (_) {}
  }

  playStamp() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [880, 1046, 1318].forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t + i * 0.08);
        gain.gain.setValueAtTime(0.09, t + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + i * 0.08);
        osc.stop(t + i * 0.08 + 0.2);
      });
    } catch (_) {}
  }
}

export const sound = new SoundEngine();
