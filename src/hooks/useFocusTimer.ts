import { useCallback, useEffect, useState } from 'react';
import { playChime, primeAudio } from '@/lib/chime';
import { loadJson, saveJson } from '@/lib/storage';

export type TimerMode = 'focus' | 'break';

export const TIMER_DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  break: 5 * 60,
};

const STORAGE_KEY = 'focus-timer-state';
const TICK_MS = 250;

interface TimerState {
  mode: TimerMode;
  remaining: number;
  isRunning: boolean;
  endAt: number | null;
}

function nextMode(mode: TimerMode): TimerMode {
  return mode === 'focus' ? 'break' : 'focus';
}

function idleState(mode: TimerMode, remaining: number = TIMER_DURATIONS[mode]): TimerState {
  return { mode, remaining, isRunning: false, endAt: null };
}

function secondsUntil(endAt: number): number {
  return Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
}

function parseTimerState(value: unknown): TimerState | null {
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  const isValidMode = v.mode === 'focus' || v.mode === 'break';
  if (!isValidMode || typeof v.remaining !== 'number' || typeof v.isRunning !== 'boolean') return null;
  return {
    mode: v.mode as TimerMode,
    remaining: v.remaining,
    isRunning: v.isRunning,
    endAt: typeof v.endAt === 'number' ? v.endAt : null,
  };
}

function restoreTimerState(): TimerState {
  const stored = loadJson(STORAGE_KEY, parseTimerState);
  if (!stored) return idleState('focus');
  if (stored.isRunning && stored.endAt !== null) {
    const remaining = secondsUntil(stored.endAt);
    return remaining > 0 ? { ...stored, remaining } : idleState(nextMode(stored.mode));
  }
  return idleState(stored.mode, stored.remaining);
}

export function useFocusTimer() {
  const [state, setState] = useState<TimerState>(restoreTimerState);
  const { isRunning, endAt } = state;

  useEffect(() => {
    saveJson(STORAGE_KEY, state);
  }, [state]);

  useEffect(() => {
    if (!isRunning || endAt === null) return;

    const intervalId = window.setInterval(() => {
      const remaining = secondsUntil(endAt);

      if (remaining > 0) {
        setState((prev) =>
          prev.endAt === endAt && prev.remaining !== remaining ? { ...prev, remaining } : prev,
        );
        return;
      }

      window.clearInterval(intervalId);
      setState((prev) => (prev.endAt === endAt ? idleState(nextMode(prev.mode)) : prev));
      playChime();
    }, TICK_MS);

    return () => window.clearInterval(intervalId);
  }, [isRunning, endAt]);

  const start = useCallback(() => {
    primeAudio();
    setState((prev) =>
      prev.isRunning
        ? prev
        : { ...prev, isRunning: true, endAt: Date.now() + prev.remaining * 1000 },
    );
  }, []);

  const pause = useCallback(() => {
    setState((prev) =>
      prev.isRunning && prev.endAt !== null
        ? idleState(prev.mode, secondsUntil(prev.endAt))
        : prev,
    );
  }, []);

  const reset = useCallback(() => {
    setState((prev) => idleState(prev.mode));
  }, []);

  return {
    mode: state.mode,
    remaining: state.remaining,
    duration: TIMER_DURATIONS[state.mode],
    isRunning: state.isRunning,
    start,
    pause,
    reset,
  };
}
