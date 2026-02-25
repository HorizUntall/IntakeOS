"use client";

import React, { useMemo } from "react";
import { cal, protein } from "@/types/entryType";
import { generateCalendarYear } from "@/lib/utils/dateHelper";
import { Entry } from "@/types/entry";

interface ProgressGridProps {
  year: number;
  entries: Entry[];
  maxCal: number;
  minCal: number;
  proteinGoal: number;
}

interface DailyAmounts {
  calCounts: Record<string, number>;
  proteinCounts: Record<string, number>;
}

export default function ProgressGrid({
  year,
  entries,
  maxCal,
  minCal,
  proteinGoal,
}: ProgressGridProps) {
  const slots = useMemo(() => generateCalendarYear(year), [year]);

  // Count total calories and protein each day
  const entryCounts = useMemo((): DailyAmounts => {
    const calCounts: Record<string, number> = {};
    const proteinCounts: Record<string, number> = {};

    entries.forEach((entry) => {
      const day = new Date(entry.createdAt).toISOString().split("T")[0];
      if (entry.type === cal) {
        calCounts[day] = (calCounts[day] || 0) + entry.amount;
      } else if (entry.type === protein) {
        proteinCounts[day] = (proteinCounts[day] || 0) + entry.amount;
      }
    });
    return { calCounts, proteinCounts };
  }, [entries, year]);

  // Group slots into months while preserving the 7-row grid structure
  const months = useMemo(() => {
    const monthGroups: Record<string, (typeof slots)[0][]> = {};

    slots.forEach((slot) => {
      let mName = "Jan"; // Default for initial null padding
      if (slot) {
        mName = slot.date.toLocaleString("default", { month: "short" });
      }
      if (!monthGroups[mName]) monthGroups[mName] = [];
      monthGroups[mName].push(slot);
    });

    return Object.entries(monthGroups);
  }, [slots]);

  return (
    <div className="p-6 border rounded-xl bg-white dark:bg-zinc-950 overflow-x-auto shadow-sm">
      <div className="flex gap-6 w-max items-end">
        {months.map(([monthName, monthSlots]) => (
          <div key={monthName} className="flex flex-col gap-3">
            {/* The Grid: 7 rows high (Sun-Sat) */}
            <div
              className="grid grid-rows-7 grid-flow-col gap-1.5"
              style={{ height: "120px" }} // Fixed height to keep months aligned
            >
              {monthSlots.map((slot, i) => {
                if (!slot)
                  return <div key={`empty-${i}`} className="w-4 h-4" />;

                const cVal = entryCounts.calCounts[slot.dateString] || 0;
                const pVal = entryCounts.proteinCounts[slot.dateString] || 0;

                return (
                  <DayBox
                    key={slot.dateString}
                    date={slot.dateString}
                    calCount={cVal}
                    proCount={pVal}
                    limits={{ maxCal, minCal, proteinGoal }}
                  />
                );
              })}
            </div>
            {/* Month Label */}
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-tighter text-center border-t border-zinc-100 dark:border-zinc-800 pt-1">
              {monthName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DayBox({ date, calCount, proCount, limits }: any) {
  const calColor = getHexColor(cal, calCount, limits.maxCal, limits.minCal);
  const proColor = getHexColor(protein, proCount, limits.proteinGoal);

  // If both empty, show standard track color
  if (calCount === 0 && proCount === 0) {
    return (
      <div
        title={`${date}: No data`}
        className="w-4 h-4 rounded-[3px] bg-zinc-100 dark:bg-zinc-900 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
      />
    );
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className="rounded-[3px] transition-all hover:scale-150 hover:z-10 cursor-pointer shadow-sm"
      role="img"
    >
      <title>{`${date} | Cal: ${calCount} | Protein: ${proCount}g`}</title>

      {/* Left side with curved right edge */}
      <path
        d="
      M0 0 
      H8
      C12 0 14 4 8 8
      C2 12 4 16 8 16
      H0
      Z
    "
        fill={proColor}
      />

      {/* Right side with curved left edge */}
      <path
        d="
      M8 0
      C12 0 14 4 8 8
      C2 12 4 16 8 16
      H16
      V0
      Z
    "
        fill={calColor}
      />
    </svg>
  );
}

function getHexColor(type: string, val1: number, val2: number, val3 = 0) {
  if (val1 === 0) return "#3f3f46"; // zinc-700 for empty
  if (type === cal) {
    if (val1 > val2) return "#ef4444"; // red-500
    if (val1 > val3) return "#22c55e"; // green-500
    return "#eab308"; // yellow-500
  }
  // Protein: Meet goal (green) or under (red)
  return val1 >= val2 ? "#22c55e" : "#ef4444";
}
