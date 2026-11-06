interface HabitProgressProps {
  completed: number;
  total: number;
}

export default function HabitProgress({ completed, total }: HabitProgressProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium text-stone-700">
          {total === 0 ? 'No habits yet' : `${completed} of ${total} habits completed today`}
        </p>
        <span className="text-sm tabular-nums text-sage-700">{percent}%</span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-stone-100"
        role="progressbar"
        aria-label="Daily habit progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className="h-full rounded-full bg-sage-500 transition-[width] duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
