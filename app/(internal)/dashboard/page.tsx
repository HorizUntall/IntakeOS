import AddEntry from "@/components/entry/AddEntry";
import CircularProgress from "@/components/layout/Progress";
import ProgressGrid from "@/components/layout/ProgressGrid";
import TodayLog from "@/components/layout/TodayLog";
import { getEntries } from "@/lib/entries/entries";
import { getTodayAmounts } from "@/lib/utils/getAmount";
import getTodayEntries from "@/lib/utils/getTodayEntries";
import { cal, protein } from "@/types/entryType";
import { currentUser } from "@clerk/nextjs/server";

export default async function dashboard() {
  const user = await currentUser();
  const maxCalories = 2000;
  const minCalories = 1200;
  const proteinGoal = 100;
  const entries = await getEntries();
  const todayEntries = getTodayEntries(entries!);
  const todayAmounts = getTodayAmounts(todayEntries);
  const currCal = todayAmounts.calAmt;
  const currProtein = todayAmounts.proteinAmt;

  return (
    <main className="relative bg-[#F8F9FA] min-h-screen pt-28 pb-32 px-4 md:px-6 overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-zinc-100/50 to-transparent -z-10 pointer-events-none" />

      <div className="w-full mx-auto max-w-5xl space-y-10">
        {/* Welcome Header */}
        <header className="space-y-1 px-2">
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
            Hi, {user?.firstName || "there"}
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Here's your progress for today.
          </p>
        </header>

        {/* Progress Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Subtle Decorative Icon/Text Background */}
            <span className="absolute top-6 right-8 text-[10px] font-black text-zinc-100 uppercase tracking-[0.2em] select-none">
              Energy
            </span>

            <h3 className="text-zinc-400 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">
              Calories
            </h3>
            <CircularProgress
              type={cal}
              val1={currCal}
              val2={maxCalories}
              val3={minCalories}
              size={210}
            />
          </div>

          <div className="group bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="absolute top-6 right-8 text-[10px] font-black text-zinc-100 uppercase tracking-[0.2em] select-none">
              Muscle
            </span>

            <h3 className="text-zinc-400 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">
              Protein
            </h3>
            <CircularProgress
              type={protein}
              val1={currProtein}
              val2={proteinGoal}
              size={210}
            />
          </div>
        </section>

        {/* History Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Consistency Grid
            </h3>
            <span className="text-zinc-300 text-[10px] font-medium uppercase">
              Year 2026
            </span>
          </div>
          <div className="bg-white/50 backdrop-blur-md border border-white rounded-[2rem] p-2 shadow-sm">
            <ProgressGrid
              year={2026}
              entries={entries!}
              maxCal={maxCalories}
              minCal={minCalories}
              proteinGoal={proteinGoal}
            />
          </div>
        </section>

        {/* Today's Timeline */}
        <section className="space-y-4">
          <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] px-2">
            Daily Feed
          </h3>
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <TodayLog todayEntries={todayEntries!} />
          </div>
        </section>
      </div>

      <AddEntry />
    </main>
  );
}
