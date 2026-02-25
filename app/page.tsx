import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0a0a0a] overflow-hidden">
      {/* Mesh Gradient Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />

      {/* Hero Section */}
      <div className="z-10 text-center max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Track with your <span className="text-purple-400">voice.</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
          The minimalist calorie and protein tracker designed for Siri. No
          tedious typing. Just speak, and we'll handle the rest.
        </p>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all shadow-xl shadow-white/5 cursor-pointer">
              Get Started for Free
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link href={`/dashboard`}>
            <button className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/20 cursor-pointer">
              Go to Dashboard
            </button>
          </Link>
        </SignedIn>
      </div>

      {/* Glassmorphism Preview Card */}
      <div className="mt-20 z-10 w-full max-w-4xl">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                  Siri Integration
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  "Hey Siri, Log 500 Calories"
                </h3>
                <p className="text-gray-400">
                  Instantly sync your nutrition data without ever opening the
                  app. Perfect for busy lifestyles and on-the-go tracking.
                </p>
              </div>
              <div className="flex justify-center">
                {/* Visual Placeholder for a Chart or Stats */}
                <div className="w-full aspect-video bg-gradient-to-br from-white/5 to-transparent rounded-lg border border-white/5 flex items-center justify-center">
                  <span className="text-white/20 font-mono italic">
                    Visualizing Progress...
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
