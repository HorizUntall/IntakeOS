import AddEntry from "@/components/entry/AddEntry";
import CircularProgress from "@/components/layout/Progress";
import ProgressGrid from "@/components/layout/ProgressGrid";
import TodayLog from "@/components/layout/TodayLog";
import { getEntries } from "@/lib/entries/entries";
import { getTodayAmounts } from "@/lib/utils/getAmount";
import getTodayEntries from "@/lib/utils/getTodayEntries";
import { cal, protein } from "@/types/entryType";

export default async function dashboard() {
  // Temp Data
  const maxCalories = 2000;
  const minCalories = 1200;
  const proteinGoal = 100;
  const userName = "Sodium0112";
  const entries = await getEntries();
  const todayEntries = getTodayEntries(entries!);
  const todayAmounts = getTodayAmounts(todayEntries);
  const currCal = todayAmounts.calAmt;
  const currProtein = todayAmounts.proteinAmt;

  return (
    <main className="bg-amber-50 min-h-screen mt-20">
      <div className="relative w-full mx-auto max-w-300">
        {/* Calorie and Protein Progress Tracker */}
        <div className="flex w-full bg-yellow-400 gap-10">
          {/* Calories */}
          <div className="flex flex-col w-full border-black-200 border-2">
            <h3>Calories</h3>
            <div>
              <CircularProgress
                type={cal}
                val1={currCal}
                val2={maxCalories}
                val3={minCalories}
              />
            </div>
          </div>

          {/* Protein */}
          <div className="flex flex-col w-full border-black-200 border-2">
            <h3>Protein</h3>
            <div>
              <CircularProgress
                type={protein}
                val1={currProtein}
                val2={proteinGoal}
              />
            </div>
          </div>
        </div>

        {/* Year Progress Tracker Grid */}
        <div>
          <ProgressGrid
            year={2026}
            entries={entries!}
            maxCal={maxCalories}
            minCal={minCalories}
            proteinGoal={proteinGoal}
          ></ProgressGrid>
        </div>

        {/* Today Log */}
        <TodayLog todayEntries={todayEntries!}></TodayLog>
      </div>

      <AddEntry />
    </main>
  );
}
