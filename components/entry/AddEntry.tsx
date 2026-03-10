"use client";

import { addEntries } from "@/lib/entries/entries";
import { useState } from "react";
import { type_cal, type_protein } from "@/types/entryType";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function AddEntry() {
  const [isOpen, setIsOpen] = useState(false);
  const [calAmt, setcalAmt] = useState(0);
  const [proteinAmt, setProteinAmt] = useState(0);

  const handlecalAmtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setcalAmt(val === "" ? 0 : Number(val));
  };
  const handleproteinAmtChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = event.target.value;
    setProteinAmt(val === "" ? 0 : Number(val));
  };

  const submitEntry = async (event: React.FormEvent) => {
    event.preventDefault();
    const entriesToSave = [];
    if (calAmt > 0) entriesToSave.push({ amount: calAmt, type: type_cal });
    if (proteinAmt > 0)
      entriesToSave.push({ amount: proteinAmt, type: type_protein });

    if (entriesToSave.length > 0) {
      await addEntries(entriesToSave);
    }

    setcalAmt(0);
    setProteinAmt(0);
    setIsOpen(false);
  };

  return (
    <>
      {/* Dynamic Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-24 md:bottom-10 bg-zinc-900 text-white p-4 md:px-6 md:py-4 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all z-40 flex items-center gap-2 cursor-pointer"
      >
        <PlusIcon className="h-6 w-6" />
        <span className="hidden md:inline font-bold tracking-tight">
          Log Entry
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
          {/* Backdrop (Click to close) */}
          <div
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Form Card */}
          <form
            onSubmit={submitEntry}
            className="relative bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-white transform transition-transform animate-in slide-in-from-bottom-10 duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">Add Entry</h2>
                <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
                  Manual Log
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-zinc-100 p-2 rounded-full text-zinc-500 hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-6 mb-10">
              <div className="relative">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2 block ml-1">
                  Calories
                </label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={calAmt || ""}
                    onChange={handlecalAmtChange}
                    className="w-full bg-zinc-50 border-2 border-transparent focus:border-zinc-100 focus:bg-white rounded-2xl p-5 text-xl font-bold outline-none transition-all"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300 font-medium italic mr-10">
                    kcal
                  </span>
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2 block ml-1">
                  Protein
                </label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={proteinAmt || ""}
                    onChange={handleproteinAmtChange}
                    className="w-full bg-zinc-50 border-2 border-transparent focus:border-zinc-100 focus:bg-white rounded-2xl p-5 text-xl font-bold outline-none transition-all"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300 font-medium italic mr-10">
                    grams
                  </span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-zinc-900 text-white font-bold py-5 rounded-[1.5rem] hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-zinc-200 cursor-pointer"
            >
              Save Entry
            </button>
          </form>
        </div>
      )}
    </>
  );
}
