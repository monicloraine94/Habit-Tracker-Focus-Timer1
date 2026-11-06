import { Check, Trash2 } from 'lucide-react';
import type { Habit } from '@/hooks/useHabits';

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitItem({ habit, onToggle, onDelete }: HabitItemProps) {
  return (
    <li className="group flex animate-fade-in items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-stone-50">
      <button
        type="button"
        role="checkbox"
        aria-checked={habit.completed}
        aria-label={`Mark "${habit.text}" as ${habit.completed ? 'not done' : 'done'}`}
        onClick={() => onToggle(habit.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200 ${
          habit.completed
            ? 'border-sage-500 bg-sage-500 text-white'
            : 'border-stone-300 bg-white hover:border-sage-400'
        }`}
      >
        <Check
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            habit.completed ? 'scale-100' : 'scale-0'
          }`}
          strokeWidth={3}
          aria-hidden="true"
        />
      </button>

      <span
        className={`min-w-0 flex-1 break-words text-base transition-colors duration-200 ${
          habit.completed ? 'text-sage-600 line-through decoration-sage-400' : 'text-stone-800'
        }`}
      >
        {habit.text}
      </span>

      <button
        type="button"
        onClick={() => onDelete(habit.id)}
        aria-label={`Delete "${habit.text}"`}
        className="shrink-0 rounded-xl p-2 text-stone-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  );
}
