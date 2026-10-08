import { MapPin, PhoneOff, Sparkles } from 'lucide-react';

export default function OutdoorMode({ mission, onClose }) {
  if (!mission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-emerald-200/50 bg-gradient-to-br from-emerald-900 via-moss-900 to-slate-900 p-6 text-white shadow-2xl shadow-emerald-900/30 md:p-8">
        <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -right-8 bottom-5 h-32 w-32 rounded-full bg-amber-300/15 blur-3xl" />

        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
            <MapPin size={14} /> Step outside
          </div>

          <h3 className="text-4xl font-black tracking-tight md:text-5xl">Put the phone away.</h3>
          <p className="mt-3 max-w-lg text-base text-emerald-50/85">
            {mission.screenRule}
          </p>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
              <PhoneOff size={16} /> Mission active
            </div>
            <p className="text-2xl font-bold">{mission.mission}</p>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-amber-200/20 bg-amber-300/10 p-3 text-amber-100">
            <Sparkles size={18} />
            <span>{mission.safetyNote}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-base font-semibold text-slate-900 transition hover:scale-[1.01]"
          >
            I’m outside. Reset.
          </button>
        </div>
      </div>
    </div>
  );
}
