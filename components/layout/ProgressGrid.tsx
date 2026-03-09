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

export default function ProgressGrid({
  year,
  entries,
  maxCal,
  minCal,
  proteinGoal,
}: ProgressGridProps) {
  const slots = useMemo(() => generateCalendarYear(year), [year]);

  const entryCounts = useMemo(() => {
    const calCounts: Record<string, number> = {};
    const proteinCounts: Record<string, number> = {};

    entries.forEach((entry) => {
      // Create a local date object
      const d = new Date(entry.createdAt);

      // Generate a YYYY-MM-DD string based on LOCAL time, not UTC
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const localDay = `${year}-${month}-${day}`;

      if (entry.type === cal) {
        calCounts[localDay] = (calCounts[localDay] || 0) + entry.amount;
      } else if (entry.type === protein) {
        proteinCounts[localDay] = (proteinCounts[localDay] || 0) + entry.amount;
      }
    });
    return { calCounts, proteinCounts };
  }, [entries]);

  const months = useMemo(() => {
    const monthGroups: Record<string, (typeof slots)[0][]> = {};
    slots.forEach((slot) => {
      const mName = slot
        ? slot.date.toLocaleString("default", { month: "short" })
        : "Jan";
      if (!monthGroups[mName]) monthGroups[mName] = [];
      monthGroups[mName].push(slot);
    });
    return Object.entries(monthGroups);
  }, [slots]);

  return (
    <div className="p-6 bg-white/50 backdrop-blur-md border border-white rounded-3xl shadow-sm overflow-x-auto no-scrollbar">
      <div className="flex gap-8 w-max items-end">
        {months.map(([monthName, monthSlots]) => (
          <div key={monthName} className="flex flex-col gap-4">
            <div
              className="grid grid-rows-7 grid-flow-col gap-1.5"
              style={{ height: "130px" }}
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
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em] text-center">
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

  // Empty state: subtle and clean
  if (calCount === 0 && proCount === 0) {
    return (
      <div
        title={`${date}: No data`}
        className="w-[14px] h-[14px] rounded-[3px] bg-zinc-100 transition-colors hover:bg-zinc-200"
      />
    );
  }

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      className="rounded-[3px] transition-all hover:scale-[1.7] hover:z-50 cursor-pointer"
      role="img"
    >
      <title>{`${date} | Cal: ${calCount} | Pro: ${proCount}g`}</title>
      <path d="M0 0 H8 C12 0 14 4 8 8 C2 12 4 16 8 16 H0 Z" fill={proColor} />
      <path d="M8 0 C12 0 14 4 8 8 C2 12 4 16 8 16 H16 V0 Z" fill={calColor} />
    </svg>
  );
}

function getHexColor(type: string, val: number, goal: number, min = 0) {
  if (val === 0) return "#f4f4f5"; // zinc-100

  if (type === cal) {
    if (val > goal) return "#fda4af"; // rose-300 (Subtle red)
    if (val > min) return "#6ee7b7"; // emerald-300 (Subtle green)
    return "#fcd34d"; // amber-300 (Subtle yellow)
  }

  // Protein
  return val >= goal ? "#6ee7b7" : "#fb7185"; // emerald-300 : rose-400
}
