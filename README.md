# Habit Tracker & Focus Timer


A calm, distraction-free single-page productivity app. It combines a Pomodoro-style focus timer with a daily habits checklist and a progress bar that shows how your day is going. Everything runs in the browser, and data is saved in `localStorage`, so there is no login, backend, or database to set up.

## Features

### Focus timer
- Large circular countdown starting at 25:00
- Start / Pause and Reset controls
- When the timer reaches 0:00, a short three-note chime plays and the app switches to a 05:00 "Break Time" state
- Timer state (mode, time left, running or paused) survives page refreshes. If a session ends while the page is closed, the app moves to the next mode when you return

### Daily habits
- Add habits such as "Drink Water" or "Read 10 pages" (up to 80 characters)
- Custom checkboxes; checking a habit strikes through its text and turns it a muted green
- Delete any habit with the trash icon
- Habits are saved across reloads. Checkmarks reset automatically at the start of each new day, while the habits themselves stay in your list

### Daily progress
- Animated progress bar with the summary "X of Y habits completed today" and a percentage

## Tech stack

- [React](https://react.dev) with [Vite](https://vitejs.dev) and TypeScript
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide React](https://lucide.dev) for icons
- Web Audio API for the break chime (no audio files needed)
- Inter font via Google Fonts

## Getting started

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Then open the local address Vite prints in your terminal.

## Scripts

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Starts the development server                 |
| `npm run build`     | Creates an optimized production build in `dist/` |
| `npm run preview`   | Serves the production build locally           |
| `npm run typecheck` | Runs the TypeScript checker                   |
| `npm run lint`      | Runs ESLint                                   |

## Project structure

```
src/
  App.tsx                      Page layout and header
  components/
    FocusTimer.tsx             Circular timer, mode label, and controls
    HabitsCard.tsx             Habits section: progress, input form, and list
    HabitItem.tsx              A single habit row with checkbox and delete
    HabitProgress.tsx          Animated "X of Y completed" progress bar
  hooks/
    useFocusTimer.ts           Timer logic and localStorage persistence
    useHabits.ts               Habit list logic and localStorage persistence
  lib/
    storage.ts                 Safe JSON read/write helpers for localStorage
    chime.ts                   Break-time chime built with the Web Audio API
```

Imports use the `@/` alias, which points to `src/`.

## Data storage

Two keys are used in the browser's `localStorage`:

- `focus-timer-state` stores the current mode, time remaining, whether the timer is running, and the end timestamp used to keep the countdown accurate across refreshes.
- `habit-tracker-habits` stores the habit list (`id`, `text`, `completed`) along with the date it was last saved, which drives the daily reset.

Clearing site data in your browser removes both keys and resets the app.

## Design

- Calm, neutral palette: soft off-white background (`stone-50`), deep charcoal text (`stone-800`), and a sage green accent for primary buttons, checkmarks, and progress
- Centered single column with a 600px maximum width, generous padding, and rounded corners
- Responsive from mobile to desktop
- Subtle transitions on the timer ring, checkboxes, progress bar, and new habits
