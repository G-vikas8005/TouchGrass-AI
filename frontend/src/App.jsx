import { useMemo, useState } from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import Header from './components/Header';
import Planner from './components/Planner';
import ActivityCard from './components/ActivityCard';
import OutdoorMode from './components/OutdoorMode';

const defaultForm = {
  time: 30,
  mood: 'Explore',
  energy: 'Medium',
  environment: 'college campus'
};

function App() {
  const [form, setForm] = useState(defaultForm);
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outdoorMode, setOutdoorMode] = useState(false);

  const statusLabel = useMemo(() => {
    if (!mission) return 'Ready when you are';
    return 'Mission ready';
  }, [mission]);

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const generateMission = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Something went wrong while generating your mission.');
      }

      setMission(payload);
    } catch (error) {
      console.error(error);
      setMission({
        title: 'Take a quick reset',
        description: 'Your mission is ready to start; keep it simple and walk a little way outside.',
        steps: [
          'Step outside and pick a short route you can complete without overthinking it.',
          'Walk slowly and notice one sound, color, or shape around you.',
          'Take a full breath and let your attention settle on the environment.',
          'When you finish, head back in with your phone still away.'
        ],
        mission: 'A 10-minute outdoor walk with no screen use at all.',
        screenRule: 'Phone stays in your pocket until you return.',
        safetyNote: 'Stay on a familiar route and keep a clear path back.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,237,176,0.35),_transparent_35%),linear-gradient(180deg,#f7f9f4_0%,#eef8f0_100%)] text-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
        <Header />

        <main className="grid gap-6 lg:grid-cols-[1.15fr_1.45fr]">
          <div className="space-y-6">
            <Planner
              form={form}
              onChange={handleChange}
              onSubmit={generateMission}
              loading={loading}
            />

            <div className="rounded-[28px] border border-emerald-100 bg-white/70 p-5 shadow-soft backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-200 to-emerald-200 text-emerald-700">
                    <Compass size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Status</p>
                    <p className="text-lg font-bold text-slate-800">{statusLabel}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  <Sparkles size={12} />
                  Minimal friction
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/60 p-4 text-sm leading-7 text-slate-600">
                Generate a mission, start it, and put your phone away. Keep the whole interaction short enough to feel easy.
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px]">
            <div className="absolute right-6 top-4 h-16 w-16 rounded-full bg-amber-200/40 blur-2xl" />
            <div className="absolute bottom-8 left-6 h-20 w-20 rounded-full bg-emerald-200/40 blur-2xl" />

            <div className="relative h-full">
              {!mission ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[32px] border border-dashed border-emerald-200 bg-white/50 p-8 text-center shadow-soft backdrop-blur-sm">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-emerald-100 to-amber-100 text-emerald-700 shadow-sm">
                    <ArrowRight size={28} />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">A tiny outdoors mission is waiting.</h2>
                  <p className="mt-3 max-w-md text-base text-slate-600">
                    Tell us how much time you have, then leave the screen behind and go outside.
                  </p>
                </div>
              ) : (
                <ActivityCard mission={mission} onStart={() => setOutdoorMode(true)} loading={loading} />
              )}
            </div>
          </div>
        </main>
      </div>

      <OutdoorMode mission={outdoorMode ? mission : null} onClose={() => setOutdoorMode(false)} />
    </div>
  );
}

export default App;
