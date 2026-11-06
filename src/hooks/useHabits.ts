import { useCallback, useEffect, useState } from 'react';
import { loadJson, saveJson } from '@/lib/storage';

export interface Habit {
  id: string;
  text: string;
  completed: boolean;
}

interface HabitsSnapshot {
  date: string;
  habits: Habit[];
}

const STORAGE_KEY = 'habit-tracker-habits';

function getTodayKey(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function isHabit(value: unknown): value is Habit {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === 'string' && typeof v.text === 'string' && typeof v.completed === 'boolean';
}

function parseHabitsSnapshot(value: unknown): HabitsSnapshot | null {
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (typeof v.date !== 'string' || !Array.isArray(v.habits) || !v.habits.every(isHabit)) return null;
  return { date: v.date, habits: v.habits };
}

function restoreHabits(): Habit[] {
  const snapshot = loadJson(STORAGE_KEY, parseHabitsSnapshot);
  if (!snapshot) return [];
  if (snapshot.date === getTodayKey()) return snapshot.habits;
  return snapshot.habits.map((habit) => ({ ...habit, completed: false }));
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(restoreHabits);

  useEffect(() => {
    const snapshot: HabitsSnapshot = { date: getTodayKey(), habits };
    saveJson(STORAGE_KEY, snapshot);
  }, [habits]);

  const addHabit = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setHabits((prev) => [...prev, { id: createId(), text: trimmed, completed: false }]);
  }, []);

  const toggleHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)),
    );
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }, []);

  const completedCount = habits.filter((habit) => habit.completed).length;

  return { habits, completedCount, addHabit, toggleHabit, deleteHabit };
}
