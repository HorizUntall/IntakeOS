"use client";

import { useState } from "react";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  MicrophoneIcon,
  ChartBarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { getUserKey } from "@/lib/users/getUserDetails";

export default function VoiceSupportPage() {
  const [activeTab, setActiveTab] = useState<"log" | "status">("log");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Constants - Replace with your real logic
  const baseUrl = "https://intake-os-pearl.vercel.app/m";
  // const apiKey = "your_actual_api_key_here";
  const apiKey = getUserKey();

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 mt-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
          Siri Shortcuts Guide
        </h1>
        <p className="text-zinc-500 font-medium mt-2">
          Set up your voice commands. Just copy, paste, and speak.
        </p>
      </header>

      {/* Action Selector */}
      <div className="grid grid-cols-2 gap-4 mb-12 p-1.5 bg-zinc-100 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("log")}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "log"
              ? "bg-white shadow-md text-purple-600"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          <MicrophoneIcon className="w-5 h-5" />
          Log Entry
        </button>
        <button
          onClick={() => setActiveTab("status")}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "status"
              ? "bg-white shadow-md text-blue-600"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          <ChartBarIcon className="w-5 h-5" />
          Check Status
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left Side: Instructions */}
        <div className="lg:col-span-3 space-y-10">
          {activeTab === "log" ? (
            <GuideSection
              title="Logging Entries"
              description="Siri will ask what you ate and send it to your log via POST."
              steps={[
                {
                  label: "Naming your Command",
                  instruction:
                    "Create a new Shortcut. The Title is the 'Wake Word'. If you name it 'Log Entry', you say 'Hey Siri, Log Entry'.",
                  copyValue: "Log Entry",
                },
                {
                  label: "Dictation",
                  instruction:
                    "Add 'Dictate Text'. Tip: Set 'Stop Listening' to 'After Pause'.",
                },
                {
                  label: "The API Link",
                  instruction:
                    "Add 'Get Contents of URL'. Change method to POST and paste this link:",
                  copyValue: `${baseUrl}/api/log`,
                },
                {
                  label: "Authentication",
                  instruction:
                    "In the Headers section, add 'api-key' as the field name and paste your key:",
                  copyValue: apiKey,
                  keyLabel: "api-key",
                },
                {
                  label: "The Data (JSON)",
                  instruction:
                    "Set Request Body to JSON. Add new field 'command' and select the 'Dictated Text' variable.",
                  copyValue: "command",
                  keyLabel: "JSON Key",
                },
                {
                  label: "Speech Response",
                  instruction:
                    "Add 'Get Value for Key' (message). Finally, add a 'Speak Text' action for that value.",
                  copyValue: "message",
                  keyLabel: "JSON Key",
                },
              ]}
              copyToClipboard={copyToClipboard}
              copiedField={copiedField}
            />
          ) : (
            <GuideSection
              title="Checking Status"
              description="Retrieve your daily summary using a GET request with URL params."
              steps={[
                {
                  label: "Naming your Command",
                  instruction:
                    "Name this 'Status Update' or 'Check my Calories'.",
                  copyValue: "Status Update",
                },
                {
                  label: "Dictate & URL Encode",
                  instruction:
                    "Add 'Dictate Text'. Add a 'URL Encode' action and pass the Dictated Text into it.",
                },
                {
                  label: "Build the Query URL",
                  instruction:
                    "Add a 'URL' action and paste this precisely. This is where the GET command lives:",
                  copyValue: `${baseUrl}/api/status?command=`,
                },
                {
                  label: "Auth Header",
                  instruction:
                    "Add 'Get Contents of URL' (Method: GET). Add the header 'api-key' and paste your key:",
                  copyValue: apiKey,
                  keyLabel: "api-key",
                },
                {
                  label: "Siri Speaks",
                  instruction:
                    "Extract the 'message' key from the dictionary and add the 'Speak Text' action.",
                  copyValue: "message",
                  keyLabel: "JSON Key",
                },
              ]}
              copyToClipboard={copyToClipboard}
              copiedField={copiedField}
            />
          )}
        </div>

        {/* Right Side: Visual Reference */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-4">
            <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <PhotoIcon className="w-4 h-4" />
              Shortcut Reference
            </h4>
            <div className="aspect-[9/16] w-full bg-zinc-100 rounded-[2.5rem] border-[8px] border-zinc-200 shadow-xl overflow-hidden flex items-center justify-center relative">
              {/* Replace 'src' with your actual screenshot path later */}
              <div className="text-center p-6">
                <PhotoIcon className="w-12 h-12 text-zinc-300 mx-auto mb-2" />
                <p className="text-xs text-zinc-400 font-medium">
                  Upload your shortcut screenshot here
                  <br />
                  for the {activeTab === "log" ? "POST" : "GET"} flow
                </p>
              </div>
              {/* Once you have your image, use:
                  <img src="/path-to-your-screenshot.png" className="object-cover w-full h-full" alt="Shortcut Screenshot" /> 
               */}
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed px-4">
              Your shortcut should look exactly like this screenshot. Ensure
              variables (blue pills) are mapped correctly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuideSection({
  title,
  description,
  steps,
  copyToClipboard,
  copiedField,
}: any) {
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-zinc-900">{title}</h2>
        <p className="text-zinc-500 font-medium">{description}</p>
      </div>
      <div className="space-y-10">
        {steps.map((step: any, index: number) => (
          <div key={index} className="group relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-100 group-hover:bg-zinc-200 transition-colors" />
            <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-zinc-300 ring-4 ring-white" />

            <h5 className="text-sm font-bold text-zinc-900 mb-1">
              {index + 1}. {step.label}
            </h5>
            <p className="text-sm text-zinc-500 mb-3 leading-relaxed">
              {step.instruction}
            </p>

            {step.copyValue && (
              <div className="space-y-1.5">
                {step.keyLabel && (
                  <span className="text-[10px] font-mono font-bold text-purple-500 uppercase">
                    {step.keyLabel}
                  </span>
                )}
                <CopyBox
                  id={`${title}-${index}`}
                  text={step.copyValue}
                  onCopy={copyToClipboard}
                  copiedField={copiedField}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CopyBox({ id, text, onCopy, copiedField }: any) {
  return (
    <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 p-1.5 pl-4 rounded-xl hover:bg-white hover:shadow-md transition-all group/box">
      <code className="flex-1 text-[11px] font-mono text-zinc-600 truncate">
        {text}
      </code>
      <button
        onClick={() => onCopy(text, id)}
        className={`p-2 rounded-lg transition-all ${
          copiedField === id
            ? "bg-green-500 text-white"
            : "bg-white border border-zinc-200 text-zinc-400 group-hover/box:text-zinc-900"
        }`}
      >
        {copiedField === id ? (
          <CheckIcon className="w-3.5 h-3.5" />
        ) : (
          <ClipboardDocumentIcon className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
