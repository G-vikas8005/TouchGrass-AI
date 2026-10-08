import { Sparkles, TreePine } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-moss-300 via-moss-500 to-emerald-600 text-white shadow-soft">
          <TreePine size={24} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-moss-700/80">
            TouchGrass AI
          </p>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
            AI gives you a reason to go outside.
          </h1>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-white/60 px-3 py-2 text-sm font-medium text-emerald-800 shadow-sm backdrop-blur md:flex">
        <Sparkles size={16} className="text-amber-500" />
        Generate → Start → Put phone away → Go outside
      </div>
    </header>
  );
}
