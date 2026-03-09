"use client";

import { useState } from "react";
import { updateUserSettings } from "./_actions";

export default function SettingsForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const [goals, setGoals] = useState({
    calorieMin: user.calorieMin ?? 1200,
    calorieGoal: user.calorieGoal ?? 2000,
    proteinGoal: user.proteinGoal ?? 150,
  });

  const handleSave = async () => {
    setLoading(true);
    await updateUserSettings(goals);
    setLoading(false);
    alert("Settings saved!");
  };

  const copyKey = () => {
    navigator.clipboard.writeText(user.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Section: Nutritional Targets */}
      <section className="bg-white border border-zinc-100 rounded-[2rem] p-8 shadow-sm">
        <h3 className="text-lg font-bold text-zinc-900 mb-6">
          Nutritional Targets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Min Calories
            </label>
            <input
              type="number"
              value={goals.calorieMin}
              onChange={(e) =>
                setGoals({ ...goals, calorieMin: Number(e.target.value) })
              }
              className="w-full bg-zinc-50 border-none rounded-xl p-3 font-bold focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Daily Goal
            </label>
            <input
              type="number"
              value={goals.calorieGoal}
              onChange={(e) =>
                setGoals({ ...goals, calorieGoal: Number(e.target.value) })
              }
              className="w-full bg-zinc-50 border-none rounded-xl p-3 font-bold focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Protein (g)
            </label>
            <input
              type="number"
              value={goals.proteinGoal}
              onChange={(e) =>
                setGoals({ ...goals, proteinGoal: Number(e.target.value) })
              }
              className="w-full bg-zinc-50 border-none rounded-xl p-3 font-bold focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={loading || goals.calorieMin > goals.calorieGoal}
          className="mt-8 w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:scale-[1.02] transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Goal Changes"}
        </button>
        {goals.calorieMin > goals.calorieGoal && (
          <span className="text-red-500 text-xs flex items-center justify-center mt-5">
            Min Calories should not be higher than Daily Goal
          </span>
        )}
      </section>

      {/* Section: Siri API Key */}
      <section className="bg-white border border-zinc-100 rounded-[2rem] p-8 shadow-sm">
        <h3 className="text-lg font-bold text-zinc-900 mb-2">
          Siri Integration
        </h3>
        <p className="text-sm text-zinc-500 mb-6">
          Your unique key for the Apple Shortcut.
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-zinc-50 p-2 rounded-2xl border border-zinc-100">
            <code className="flex-1 px-3 text-xs font-mono text-zinc-600 truncate">
              {showKey ? user.apiKey : "••••••••••••••••••••••••••••"}
            </code>
            <button
              onClick={() => setShowKey(!showKey)}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-tighter bg-white border border-zinc-200 rounded-xl hover:bg-zinc-100"
            >
              {showKey ? "Hide" : "Show"}
            </button>
            <button
              onClick={copyKey}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-tighter rounded-xl transition-all ${
                copied ? "bg-green-500 text-white" : "bg-zinc-900 text-white"
              }`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
