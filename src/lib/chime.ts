type AudioContextConstructor = typeof AudioContext;

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (audioContext) return audioContext;
  const Constructor: AudioContextConstructor | undefined =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;
  if (!Constructor) return null;
  audioContext = new Constructor();
  return audioContext;
}

export function primeAudio(): void {
  void getAudioContext()?.resume();
}

const CHIME_NOTES = [523.25, 659.25, 783.99];
const NOTE_SPACING_S = 0.25;
const NOTE_DECAY_S = 1.2;

export function playChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  void ctx.resume();

  CHIME_NOTES.forEach((frequency, index) => {
    const startAt = ctx.currentTime + index * NOTE_SPACING_S;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.18, startAt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + NOTE_DECAY_S);

    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + NOTE_DECAY_S + 0.1);
  });
}
