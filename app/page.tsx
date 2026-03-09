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
      {/* Soft Ambient Glows (Light Mode version) */}
      <div className="fixed top-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-100/40 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-100/40 blur-[120px] rounded-full -z-10" />

      {/* Hero Section */}
      <div className="z-10 text-center max-w-3xl">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white border border-zinc-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            IntakeOS — The Siri Native Tracker
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 mb-8">
          Track with your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            voice.
          </span>
        </h1>

        <p className="text-zinc-500 text-lg md:text-xl mb-12 leading-relaxed max-w-xl mx-auto font-medium">
          The minimalist macro tracker designed for Siri.{" "}
          <br className="hidden md:block" />
          No typing. Just speak, and stay on track.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zinc-200 cursor-pointer">
                Get Started for Free
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Glassmorphism Preview Card (Refined for Light Theme) */}
      <div className="mt-24 z-10 w-full max-w-5xl px-4">
        <div className="relative group">
          {/* Subtle Glow behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-[3rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

          <div className="relative bg-white/60 backdrop-blur-2xl border border-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-zinc-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-200">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-zinc-900 leading-tight">
                  "Hey Siri, log <br /> 500 calories."
                </h3>
                <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                  Sync nutrition data instantly. Perfect for busy lifestyles
                  where every second counts.
                </p>
              </div>

              {/* Decorative Visual */}
              <div className="relative">
                <div className="w-full aspect-square bg-gradient-to-tr from-zinc-50 to-white rounded-3xl border border-zinc-100 flex items-center justify-center overflow-hidden">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-8 h-16 bg-purple-200 rounded-full animate-pulse" />
                      <div className="w-8 h-24 bg-blue-200 rounded-full animate-pulse delay-75" />
                      <div className="w-8 h-12 bg-zinc-200 rounded-full animate-pulse delay-150" />
                    </div>
                    <span className="text-zinc-300 font-bold uppercase tracking-[0.3em] text-[10px]">
                      Processing Voice...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
