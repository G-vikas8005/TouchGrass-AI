import { Check, ShieldCheck, Sparkles, StepForward } from 'lucide-react';

export default function ActivityCard({ mission, onStart, loading }) {
  if (!mission) return null;

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-lime-50 p-5 shadow-soft md:p-7">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="absolute -bottom-8 left-0 h-24 w-24 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Your mission</p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{mission.title}</h3>
          </div>
          <div className="rounded-full border border-emerald-200 bg-white/70 px-3 py-2 text-sm font-bold text-emerald-700 shadow-sm">
            {mission.screenRule}
          </div>
        </div>

        <p className="mb-6 max-w-2xl text-base text-slate-600">{mission.description}</p>

        <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
              <StepForward size={16} className="text-emerald-600" /> Mission steps
            </div>
            <ol className="space-y-3">
              {mission.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4 rounded-3xl border border-amber-100 bg-amber-50/80 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
              <Sparkles size={16} /> Challenge
            </div>
            <p className="text-lg font-bold text-slate-900">{mission.mission}</p>

            <div className="rounded-2xl border border-emerald-200 bg-white/70 p-3 text-sm text-slate-600">
              <div className="mb-2 flex items-center gap-2 font-semibold text-emerald-700">
                <ShieldCheck size={15} /> Safety note
              </div>
              {mission.safetyNote}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onStart}
          disabled={loading}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Check size={16} /> Start mission
        </button>
      </div>
    </section>
  );
}
