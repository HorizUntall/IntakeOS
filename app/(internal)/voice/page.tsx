"use client";

import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function VoiceSupportPage() {
  const [activeAssistant, setActiveAssistant] = useState("siri");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // You can fetch this from your user context or a small hook
  const apiKey = "ios_your_actual_api_key_here";
  const apiUrl = "https://your-domain.com/api/log";

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 mt-10">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
          Voice Integration
        </h1>
        <p className="text-zinc-500 font-medium mt-2">
          Connect your favorite assistant to log food hands-free.
        </p>
      </header>

      {/* Assistant Selector Tabs */}
      <div className="flex gap-4 mb-10 p-1 bg-zinc-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveAssistant("siri")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            activeAssistant === "siri"
              ? "bg-white shadow-sm text-zinc-900"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          Apple Siri
        </button>
        <button
          disabled
          className="px-6 py-2 rounded-xl text-sm font-bold text-zinc-300 cursor-not-allowed"
        >
          Google Assistant (Soon)
        </button>
      </div>

      {activeAssistant === "siri" && (
        <div className="space-y-12">
          {/* Step 1 */}
          <section className="relative pl-10 border-l-2 border-zinc-100">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-white" />
            <h3 className="text-xl font-bold text-zinc-900">
              Create the Shortcut
            </h3>
            <p className="text-zinc-500 text-sm mb-4">
              Open the{" "}
              <span className="font-bold text-zinc-800">Shortcuts</span> app on
              your iPhone and create a new Shortcut named{" "}
              <span className="italic">"Log Calories"</span>.
            </p>
          </section>

          {/* Step 2 - URL Copy */}
          <section className="relative pl-10 border-l-2 border-zinc-100">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-zinc-200 ring-4 ring-white" />
            <h3 className="text-xl font-bold text-zinc-900">
              Set the Destination
            </h3>
            <p className="text-zinc-500 text-sm mb-4">
              Add a <span className="font-bold text-zinc-800">URL</span> action
              and paste this address:
            </p>
            <CopyBox
              id="url"
              text={apiUrl}
              onCopy={copyToClipboard}
              copiedField={copiedField}
            />
          </section>

          {/* Step 3 - API Key Copy */}
          <section className="relative pl-10 border-l-2 border-zinc-100">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-zinc-200 ring-4 ring-white" />
            <h3 className="text-xl font-bold text-zinc-900">Authenticate</h3>
            <p className="text-zinc-500 text-sm mb-4">
              Add a{" "}
              <span className="font-bold text-zinc-800">
                Get Contents of URL
              </span>{" "}
              action. Set the method to{" "}
              <span className="font-bold text-zinc-800">POST</span>. In the
              Headers, add a field named{" "}
              <span className="font-mono text-purple-600">x-siri-key</span> and
              paste your key:
            </p>
            <CopyBox
              id="key"
              text={apiKey}
              onCopy={copyToClipboard}
              copiedField={copiedField}
            />
          </section>

          {/* Step 4 */}
          <section className="relative pl-10">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white" />
            <h3 className="text-xl font-bold text-zinc-900">You're ready.</h3>
            <p className="text-zinc-500 text-sm">
              Just say{" "}
              <span className="font-bold text-zinc-800">
                "Hey Siri, Log Calories"
              </span>{" "}
              and follow your shortcut prompts!
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

// Reusable Copy Component
function CopyBox({ id, text, onCopy, copiedField }: any) {
  return (
    <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 p-2 pl-4 rounded-2xl group">
      <code className="flex-1 text-xs font-mono text-zinc-600 truncate">
        {text}
      </code>
      <button
        onClick={() => onCopy(text, id)}
        className={`p-3 rounded-xl transition-all ${
          copiedField === id
            ? "bg-green-500 text-white"
            : "bg-white border border-zinc-200 text-zinc-400 group-hover:text-zinc-900"
        }`}
      >
        {copiedField === id ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <ClipboardDocumentIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
