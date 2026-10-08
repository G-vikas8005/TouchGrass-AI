import { ArrowRight, Mountain, Sparkles, TimerReset } from 'lucide-react';

const timeOptions = [15, 30, 45, 60, 90];

const moods = ['Explore', 'Reset', 'Social', 'Creative', 'Focused', 'Playful'];
const energies = ['Low', 'Medium', 'High'];

export default function Planner({ form, onChange, onSubmit, loading }) {
  return (
    <section className="rounded-[28px] border border-emerald-100 bg-white/75 p-5 shadow-soft backdrop-blur-sm md:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Quick mission
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Build your outdoor reset</h2>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <TimerReset size={15} className="text-amber-500" /> Time available
          </span>
          <select
            value={form.time}
            onChange={(event) => onChange('time', Number(event.target.value))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white"
          >
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option} minutes
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Sparkles size={15} className="text-violet-500" /> Mood
          </span>
          <select
            value={form.mood}
            onChange={(event) => onChange('mood', event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white"
          >
            {moods.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <BatteryIcon /> Energy level
          </span>
          <select
            value={form.energy}
            onChange={(event) => onChange('energy', event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white"
          >
            {energies.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Mountain size={15} className="text-cyan-600" /> Where you want to go
          </span>
          <input
            value={form.environment}
            onChange={(event) => onChange('environment', event.target.value)}
            placeholder="college campus, park, river walk..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:bg-white"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-moss-600 to-teal-600 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:translate-y-[-1px] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Generating...' : 'Generate mission'}
        <ArrowRight size={18} />
      </button>
    </section>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-emerald-500">
      <rect x="2" y="7" width="18" height="10" rx="2" />
      <path d="M22 10.5h1.5v3H22" />
      <path d="M6 12h8" />
    </svg>
  );
}
