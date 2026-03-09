"use client";

import { useState } from "react";
import { generateKey } from "@/lib/utils/generateKey";
import { completeOnboarding } from "./_actions";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { session } = useSession();
  const router = useRouter();

  // State for goals
  const [goals, setGoals] = useState({
    calorieMin: 1200,
    calories: 2000,
    protein: 150,
  });

  const handleGenerateKey = async () => {
    const key = await generateKey();
    setApiKey(key);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      // Pass the goals and key to your action
      await completeOnboarding(
        goals.calorieMin,
        goals.calories,
        goals.protein,
        apiKey,
      );
      await session?.reload();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#FDFDFD] relative overflow-hidden">
      {/* Background Glows (Matching Landing Page) */}
      <div className="fixed top-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-100/40 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-100/40 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-xl z-10">
        <div className="bg-white/60 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-zinc-200/50">
          {step === 1 ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
                  Set your targets.
                </h2>
                <p className="text-zinc-500 mt-2 font-medium">
                  What are we aiming for every day?
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                    Minimum Calories (Optional)
                  </label>
                  <input
                    type="number"
                    value={goals.calorieMin}
                    onChange={(e) =>
                      setGoals({ ...goals, calorieMin: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-zinc-100 rounded-2xl p-4 text-xl font-bold focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                    Daily Calories
                  </label>
                  <input
                    type="number"
                    value={goals.calories}
                    onChange={(e) =>
                      setGoals({ ...goals, calories: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-zinc-100 rounded-2xl p-4 text-xl font-bold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                    Daily Protein (g)
                  </label>
                  <input
                    type="number"
                    value={goals.protein}
                    onChange={(e) =>
                      setGoals({ ...goals, protein: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-zinc-100 rounded-2xl p-4 text-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-zinc-200"
              >
                Continue to Siri Setup
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
                  Siri Activation.
                </h2>
                <p className="text-zinc-500 mt-2 font-medium">
                  Log your food hands-free.
                </p>
              </div>

              <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 space-y-4">
                <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                  1. Download our{" "}
                  <span className="text-purple-600 font-bold">Shortcut</span>.
                  <br />
                  2. Generate your unique API Key below.
                  <br />
                  3. Paste it when prompted by Siri.
                </p>

                {!apiKey ? (
                  <button
                    onClick={handleGenerateKey}
                    className="w-full py-3 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-all"
                  >
                    Generate Siri Key
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <code className="flex-1 p-3 bg-white border border-purple-100 rounded-xl text-xs font-mono text-purple-600 break-all">
                      {apiKey}
                    </code>
                    <button
                      onClick={copyToClipboard}
                      className={`px-4 rounded-xl text-xs font-bold transition-all ${
                        copied
                          ? "bg-green-500 text-white"
                          : "bg-purple-600 text-white"
                      }`}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  disabled={loading}
                  onClick={handleFinish}
                  className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-zinc-200 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Finish Setup"}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-zinc-600 transition-all"
                >
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
