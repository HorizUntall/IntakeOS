"use client";

import { addEntries } from "@/lib/entries/entries";
import { useState } from "react";
import { cal, protein } from "@/types/entryType";

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

    if (calAmt > 0) {
      entriesToSave.push({ amount: calAmt, type: cal });
    }
    if (proteinAmt > 0) {
      entriesToSave.push({ amount: proteinAmt, type: protein });
    }

    if (entriesToSave.length > 0) {
      // One network request, one database write, one refresh
      await addEntries(entriesToSave);
    }

    setcalAmt(0);
    setProteinAmt(0);
    setIsOpen(false);
  };

  return (
    <div className="w-full h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" bg-blue-700 right-20 bottom-20 fixed"
      >
        Add Entry
      </button>

      {isOpen && (
        <div className="z-50 w-full h-full bg-blue-800/80 fixed top-0 flex items-center justify-center">
          <form
            onSubmit={submitEntry}
            className="w-100 h-100 bg-yellow-500 flex flex-col"
          >
            <button type="button" onClick={() => setIsOpen(false)}>
              X
            </button>
            <h2>Log Entry</h2>
            <h4>calories</h4>
            <input type="number" value={calAmt} onChange={handlecalAmtChange} />
            <h4>protein</h4>
            <input
              type="number"
              value={proteinAmt}
              onChange={handleproteinAmtChange}
            />
            <button type="submit" onClick={submitEntry}>
              Add Entry
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
