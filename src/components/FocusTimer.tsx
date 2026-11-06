import { Brain, Coffee, Pause, Play, RotateCcw } from 'lucide-react';
import { useFocusTimer, type TimerMode } from '@/hooks/useFocusTimer';

const RING_RADIUS = 120;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const MODE_LABELS: Record<TimerMode, string> = {
  focus: 'Focus Session',
  break: 'Break Time',
};

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function FocusTimer() {
  const { mode, remaining, duration, isRunning, start, pause, reset } = useFocusTimer();

  const isBreak = mode === 'break';
  const ModeIcon = isBreak ? Coffee : Brain;
  const dashOffset = RING_CIRCUMFERENCE * (1 - remaining / duration);

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
      <div className="flex flex-col items-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
            isBreak ? 'bg-amber-50 text-amber-800' : 'bg-sage-50 text-sage-700'
          }`}
        >
          <ModeIcon className="h-4 w-4" aria-hidden="true" />
          {MODE_LABELS[mode]}
        </span>

        <div className="relative mt-8 flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
          <svg viewBox="0 0 260 260" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle
              cx="130"
              cy="130"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="8"
              className="stroke-stone-100"
            />
            <circle
              cx="130"
              cy="130"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className={`transition-[stroke-dashoffset,stroke] duration-700 ease-linear ${
                isBreak ? 'stroke-amber-500' : 'stroke-sage-500'
              }`}
            />
          </svg>

          <div className="flex flex-col items-center">
            <span
              className="text-6xl font-light tabular-nums tracking-tight text-stone-800 sm:text-7xl"
              role="timer"
              aria-label={`${MODE_LABELS[mode]} time remaining`}
            >
              {formatTime(remaining)}
            </span>
            <span className="mt-2 text-sm text-stone-500">
              {isRunning ? (isBreak ? 'Stretch and breathe' : 'Stay with it') : 'Ready when you are'}
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={isRunning ? pause : start}
            className="inline-flex items-center gap-2 rounded-2xl bg-sage-600 px-8 py-3.5 font-medium text-white shadow-sm transition hover:bg-sage-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200 active:scale-[0.98]"
          >
            {isRunning ? (
              <Pause className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5 fill-current" aria-hidden="true" />
            )}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-6 py-3.5 font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-stone-200 active:scale-[0.98]"
          >
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
