"use client";

import { useMemo, useState, useEffect } from "react";
import CircularProgress from "@/components/layout/Progress";
import ProgressGrid from "@/components/layout/ProgressGrid";
import TodayLog from "@/components/layout/TodayLog";
import getTodayEntries from "@/lib/utils/getTodayEntries";
import { getTodayAmounts } from "@/lib/utils/getAmount";
import { type_protein, type_cal } from "@/types/entryType";
import { Entry } from "@/types/entry";

interface DashboardClientProps {
  entries: Entry[];
  goals: {
    calorieMin: number;
    calorieGoal: number;
    proteinGoal: number;
  };
}

export default function DashboardClient({
  entries,
  goals,
}: DashboardClientProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure we only calculate dates on the client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { todayEntries, currCal, currProtein } = useMemo(() => {
    if (!isClient) return { todayEntries: [], currCal: 0, currProtein: 0 };

    const filtered = getTodayEntries(entries);
    const amounts = getTodayAmounts(filtered);

    return {
      todayEntries: filtered,
      currCal: amounts.calAmt,
      currProtein: amounts.proteinAmt,
    };
  }, [entries, isClient]);

  // Loading state to prevent "Yesterday's" data flickering from server
  if (!isClient)
    return <div className="min-h-screen bg-[#F8F9FA] animate-pulse" />;

  return (
    <div className="w-full mx-auto max-w-5xl space-y-10">
      {/* Progress Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-zinc-400 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">
            Calories
          </h3>
          <CircularProgress
            type={type_cal}
            val1={currCal}
            val2={goals.calorieGoal}
            val3={goals.calorieMin}
            size={210}
          />
        </div>

        <div className="group bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-zinc-400 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">
            Protein
          </h3>
          <CircularProgress
            type={type_protein}
            val1={currProtein}
            val2={goals.proteinGoal}
            size={210}
          />
        </div>
      </section>

      {/* History Grid - Always passes ALL entries */}
      <section className="space-y-4">
        <div className="bg-white/50 backdrop-blur-md border border-white rounded-[2rem] p-2">
          <ProgressGrid
            year={2026}
            entries={entries}
            maxCal={goals.calorieGoal}
            minCal={goals.calorieMin}
            proteinGoal={goals.proteinGoal}
          />
        </div>
      </section>

      {/* Today's Timeline */}
      <section className="space-y-4">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-sm">
          <TodayLog todayEntries={todayEntries} />
        </div>
      </section>
    </div>
  );
}
