import { SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FDFDFD] overflow-hidden relative">
      {/* Soft Ambient Glows */}
      <div className="fixed top-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-100/40 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-100/40 blur-[120px] rounded-full -z-10" />

      {/* Hero Section */}
      <div className="z-10 text-center max-w-4xl mt-12">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white border border-zinc-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            IntakeOS — Pure & Simple Tracking
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 mb-8">
          The minimalist <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            macro tracker.
          </span>
        </h1>

        <p className="text-zinc-500 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
          A focused calorie and protein manager for people who value speed.
          Manage your goals with a clean dashboard or use our native Siri
          integration.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zinc-200 cursor-pointer text-lg">
                Get Started for Free
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="mt-24 z-10 w-full max-w-5xl px-4 mb-24">
        <div className="relative bg-white/60 backdrop-blur-2xl border border-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-zinc-200/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Side: Siri Focus */}
            <div className="space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Siri Native
                </span>
              </div>

              <h3 className="text-4xl font-bold text-zinc-900 leading-tight">
                "Hey Siri, <br /> log 300 calories."
              </h3>

              <div className="space-y-4">
                <p className="text-zinc-500 text-lg font-medium">
                  Complete integration with iOS Shortcuts. Check your progress
                  or log entries without even unlocking your phone.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-sm font-bold text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                    "How much protein so far?"
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                    "Daily Status Update"
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest pt-4">
                Google Assistant & Android Support Coming Soon
              </p>
            </div>

            {/* Right Side: Visual Demo */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-gradient-to-b from-zinc-50 to-white border border-zinc-100 rounded-3xl p-6 flex flex-col justify-end shadow-sm">
                  <div className="w-full h-2 bg-zinc-100 rounded-full mb-2" />
                  <div className="w-2/3 h-2 bg-zinc-100 rounded-full" />
                  <span className="mt-4 block text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    Minimalist UI
                  </span>
                </div>
                <div className="h-32 bg-purple-600 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-100">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-32 bg-zinc-900 rounded-3xl flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-white/20 rounded-full animate-bounce" />
                    <div className="w-1 h-8 bg-white/50 rounded-full animate-bounce delay-75" />
                    <div className="w-1 h-5 bg-white/30 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
                <div className="h-48 bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
                  <span className="text-2xl font-bold text-zinc-900">150g</span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Protein Target
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
