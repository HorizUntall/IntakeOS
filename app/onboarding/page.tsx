"use client";

import { useState } from "react";
import { generateKey } from "@/lib/utils/generateKey";
import { completeOnboarding } from "./_actions";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  MicrophoneIcon,
  ChartBarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"log" | "status">("log");

  const { session } = useSession();
  const router = useRouter();

  const baseUrl = "https://intakeostracker.vercel.app";

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

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFinish = async () => {
    if (!apiKey) {
      alert("Please generate your Siri Key before finishing.");
      return;
    }
    setLoading(true);
    try {
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
      <div className="fixed top-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-100/40 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-100/40 blur-[120px] rounded-full -z-10" />

      <div
        className={`w-full transition-all duration-500 ${step === 1 ? "max-w-xl" : "max-w-6xl"} z-10`}
      >
        <div className="bg-white/60 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-zinc-200/50">
          {step === 1 ? (
            /* STEP 1: GOAL SETTING */
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
                <GoalInput
                  label="Minimum Calories (Optional)"
                  value={goals.calorieMin}
                  onChange={(v: number) =>
                    setGoals({ ...goals, calorieMin: v })
                  }
                />
                <GoalInput
                  label="Daily Calories"
                  value={goals.calories}
                  onChange={(v: number) => setGoals({ ...goals, calories: v })}
                  focusColor="focus:ring-purple-500"
                />
                <GoalInput
                  label="Daily Protein (g)"
                  value={goals.protein}
                  onChange={(v: number) => setGoals({ ...goals, protein: v })}
                  focusColor="focus:ring-blue-500"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={goals.calorieMin > goals.calories}
                className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-zinc-200 disabled:opacity-50"
              >
                Continue to Siri Setup
              </button>
            </div>
          ) : (
            /* STEP 2: SIRI GUIDE */
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-8">
                <div>
                  <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
                    Siri Activation.
                  </h2>
                  <p className="text-zinc-500 mt-2 font-medium">
                    Copy these values into your Shortcuts app.
                  </p>
                </div>

                <div className="flex gap-2 p-1 bg-zinc-100 rounded-2xl w-fit">
                  <TabButton
                    active={activeTab === "log"}
                    onClick={() => setActiveTab("log")}
                    icon={<MicrophoneIcon className="w-4 h-4" />}
                    label="Log"
                  />
                  <TabButton
                    active={activeTab === "status"}
                    onClick={() => setActiveTab("status")}
                    icon={<ChartBarIcon className="w-4 h-4" />}
                    label="Status"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* GUIDE COLUMN */}
                <div className="lg:col-span-3 space-y-10">
                  {!apiKey ? (
                    <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100 text-center">
                      <p className="text-purple-900 font-bold mb-4">
                        First, generate your secure key.
                      </p>
                      <button
                        onClick={handleGenerateKey}
                        className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
                      >
                        Generate Siri Key
                      </button>
                    </div>
                  ) : (
                    <GuideSection
                      activeTab={activeTab}
                      baseUrl={baseUrl}
                      apiKey={apiKey}
                      copyToClipboard={copyToClipboard}
                      copiedField={copiedField}
                    />
                  )}
                </div>

                {/* REFERENCE IMAGE COLUMN */}
                <div className="lg:col-span-2">
                  <div className="sticky top-8 space-y-4">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                      <PhotoIcon className="w-4 h-4" /> Reference
                    </h4>
                    <div className="rounded-[2rem] border-[8px] border-zinc-900 shadow-2xl overflow-hidden bg-black ">
                      <img
                        src={
                          activeTab === "log"
                            ? "/images/sslog.png"
                            : "/images/ssupdate.png"
                        }
                        className="object-cover w-full h-full opacity-90"
                        alt="Shortcut Preview"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-8 border-t border-zinc-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-5 text-zinc-400 font-bold uppercase text-xs tracking-widest hover:text-zinc-900 transition-all"
                >
                  Go Back
                </button>
                <button
                  disabled={loading || !apiKey}
                  onClick={handleFinish}
                  className="flex-1 py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Complete Setup & Enter Dashboard"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/** * SUB-COMPONENTS
 */

function GoalInput({
  label,
  value,
  onChange,
  focusColor = "focus:ring-zinc-200",
}: any) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full bg-white border border-zinc-100 rounded-2xl p-4 text-xl font-bold outline-none transition-all ${focusColor} focus:ring-2`}
      />
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
        active
          ? "bg-white shadow-md text-zinc-900"
          : "text-zinc-500 hover:text-zinc-700"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function GuideSection({
  activeTab,
  baseUrl,
  apiKey,
  copyToClipboard,
  copiedField,
}: any) {
  const steps =
    activeTab === "log"
      ? [
          {
            label: "Naming",
            instruction: "Name your shortcut 'Log Entry'.",
            copyValue: "Log Entry",
          },
          { label: "Dictation", instruction: "Add 'Dictate Text' action." },
          {
            label: "The API Link",
            instruction: "Add 'Get Contents of URL', Method POST.",
            copyValue: `${baseUrl}/api/log`,
          },
          {
            label: "Authentication",
            instruction: "Add header 'api-key'.",
            copyValue: apiKey,
            keyLabel: "api-key",
          },
          {
            label: "Data",
            instruction: "JSON Key 'command' = Dictated Text.",
            copyValue: "command",
            keyLabel: "JSON Key",
          },
        ]
      : [
          {
            label: "Naming",
            instruction: "Name it 'Status Update'.",
            copyValue: "Status Update",
          },
          {
            label: "The Query",
            instruction: "Add URL action.",
            copyValue: `${baseUrl}/api/status?command=`,
          },
          {
            label: "Auth",
            instruction: "Method GET, Header 'api-key'.",
            copyValue: apiKey,
            keyLabel: "api-key",
          },
          {
            label: "Speak",
            instruction: "Get 'message' from JSON & Speak.",
            copyValue: "message",
            keyLabel: "JSON Key",
          },
        ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {steps.map((step, i) => (
        <div key={i} className="relative pl-8 group">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-100 group-hover:bg-purple-100 transition-colors" />
          <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-zinc-300 group-hover:border-purple-500 transition-colors" />
          <h5 className="text-sm font-bold text-zinc-900">
            {i + 1}. {step.label}
          </h5>
          <p className="text-xs text-zinc-500 mb-3">{step.instruction}</p>
          {step.copyValue && (
            <div className="max-w-md">
              {step.keyLabel && (
                <span className="text-[9px] font-bold text-purple-500 uppercase block mb-1">
                  {step.keyLabel}
                </span>
              )}
              <div className="flex items-center gap-2 bg-zinc-50 p-1.5 pl-4 rounded-xl border border-zinc-100 group-hover:bg-white transition-all">
                <code className="flex-1 text-[10px] font-mono text-zinc-500 truncate">
                  {step.copyValue}
                </code>
                <button
                  onClick={() =>
                    copyToClipboard(step.copyValue!, `${activeTab}-${i}`)
                  }
                  className={`p-2 rounded-lg ${copiedField === `${activeTab}-${i}` ? "bg-green-500 text-white" : "bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-900"}`}
                >
                  {copiedField === `${activeTab}-${i}` ? (
                    <CheckIcon className="w-3 h-3" />
                  ) : (
                    <ClipboardDocumentIcon className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
