import { ListChecks, Plus } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import HabitItem from '@/components/HabitItem';
import HabitProgress from '@/components/HabitProgress';
import { useHabits } from '@/hooks/useHabits';

const MAX_HABIT_LENGTH = 80;

export default function HabitsCard() {
  const { habits, completedCount, addHabit, toggleHabit, deleteHabit } = useHabits();
  const [draft, setDraft] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    addHabit(draft);
    setDraft('');
  };

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-stone-800">Daily Habits</h2>
        <p className="mt-1 text-sm text-stone-500">Small steps, checked off one at a time.</p>
      </header>

      <HabitProgress completed={completedCount} total={habits.length} />

      <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={MAX_HABIT_LENGTH}
          placeholder="Add a habit, e.g. Drink water"
          aria-label="New habit"
          className="min-w-0 flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 placeholder:text-stone-400 transition focus:border-sage-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sage-100"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-sage-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-sage-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add
        </button>
      </form>

      {habits.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-stone-200 px-6 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-50 text-sage-600">
            <ListChecks className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="mt-4 font-medium text-stone-700">No habits yet</p>
          <p className="mt-1 max-w-xs text-sm text-stone-500">
            Add your first habit above to start building your daily routine.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-1">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} onToggle={toggleHabit} onDelete={deleteHabit} />
          ))}
        </ul>
      )}
    </section>
  );
}
