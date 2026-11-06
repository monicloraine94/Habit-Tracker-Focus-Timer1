import { Leaf } from 'lucide-react';
import FocusTimer from '@/components/FocusTimer';
import HabitsCard from '@/components/HabitsCard';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      <main className="mx-auto flex w-full max-w-[600px] flex-col gap-6 px-4 py-10 sm:px-6 sm:py-16">
        <header className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
            <Leaf className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-stone-800">
              Habit Tracker & Focus Timer
            </h1>
            <p className="text-sm text-stone-500">Stay focused, one habit at a time.</p>
          </div>
        </header>

        <FocusTimer />
        <HabitsCard />
      </main>
    </div>
  );
}

export default App;
