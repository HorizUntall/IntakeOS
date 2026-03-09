"use client";

import { Entry } from "@/types/entry";
import { cal, protein } from "@/types/entryType";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteEntry } from "@/lib/entries/entries";

interface TodayLogProps {
  todayEntries: Entry[];
}

export default function TodayLog({ todayEntries }: TodayLogProps) {
  const [isEdit, setIsEdit] = useState(false);

  // Organize entries by hour
  const hourlyEntries: Record<number, { cal: Entry[]; protein: Entry[] }> = {};

  todayEntries.forEach((entry) => {
    const dateObj = new Date(entry.createdAt);
    const hour = dateObj.getHours();
    if (!hourlyEntries[hour]) {
      hourlyEntries[hour] = { cal: [], protein: [] };
    }
    if (entry.type === cal) hourlyEntries[hour].cal.push(entry);
    else if (entry.type === protein) hourlyEntries[hour].protein.push(entry);
  });

  const activeHours = Object.keys(hourlyEntries)
    .map(Number)
    .sort((a, b) => a - b);

  if (activeHours.length === 0) {
    return (
      <div className="py-12 text-center border-2 border-dashed border-zinc-100 rounded-3xl">
        <p className="text-zinc-400 text-sm font-medium">
          No activity logged today
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="self-end">
        <button
          className=" cursor-pointer"
          onClick={() => {
            console.log("test");
            setIsEdit(!isEdit);
          }}
        >
          <span className="text-zinc-300 text-[10px] font-medium uppercase hover:text-zinc-600">
            Edit
          </span>
        </button>
      </div>
      <div className="relative space-y-8">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[26px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent border-l border-dashed border-zinc-300" />

        {activeHours.map((hour) => (
          <div key={hour} className="relative flex items-start gap-6 group">
            {/* Time Marker */}
            <div className="flex flex-col items-center">
              <div className="z-10 w-[52px] h-[52px] rounded-full bg-white border border-zinc-100 shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-zinc-800">
                  {hour % 12 === 0 ? 12 : hour % 12}
                  <span className="text-[9px] text-zinc-400 block text-center -mt-1 uppercase">
                    {hour >= 12 ? "pm" : "am"}
                  </span>
                </span>
              </div>
            </div>

            {/* Entries Container */}
            <div className="flex-1 pt-1 space-y-3">
              <div className="flex flex-wrap gap-2">
                {/* Calories Entries */}
                {hourlyEntries[hour].cal.map((entry, idx) => (
                  <div
                    key={`cal-${idx}`}
                    className="bg-emerald-50/50 border border-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-emerald-700">
                      {entry.amount}
                    </span>
                    <span className="text-[10px] font-medium text-emerald-600/70 uppercase tracking-wide">
                      kcal
                    </span>
                    {isEdit && (
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          deleteEntry(entry.id);
                        }}
                      >
                        <span>
                          <XMarkIcon className="h-4 w-4 text-emerald-600/40" />
                        </span>
                      </button>
                    )}
                  </div>
                ))}

                {/* Protein Entries */}
                {hourlyEntries[hour].protein.map((entry, idx) => (
                  <div
                    key={`pro-${idx}`}
                    className="bg-amber-50/50 border border-amber-100 px-3 py-1.5 rounded-xl flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-xs font-bold text-amber-700">
                      {entry.amount}g
                    </span>
                    <span className="text-[10px] font-medium text-amber-600/70 uppercase tracking-wide">
                      protein
                    </span>

                    {isEdit && (
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          deleteEntry(entry.id);
                        }}
                      >
                        <span>
                          <XMarkIcon className="h-4 w-4 text-amber-500/40" />
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
