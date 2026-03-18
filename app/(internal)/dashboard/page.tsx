// app/dashboard/page.tsx
import DashboardClient from "@/components/dashboard/DashboardClient";
import AddEntry from "@/components/entry/AddEntry";
import { getEntries } from "@/lib/entries/entries";
import { getUserGoals } from "@/lib/users/getUserDetails";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { sessionClaims } = await auth();
  const goals = await getUserGoals();

  if (sessionClaims?.metadata?.onboardingComplete !== true || !goals) {
    redirect("/onboarding");
  }

  const user = await currentUser();
  const entries = await getEntries();

  return (
    <main className="relative bg-[#F8F9FA] min-h-screen pt-28 pb-32 px-4 md:px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-zinc-100/50 to-transparent -z-10" />

      <div className="w-full mx-auto max-w-5xl space-y-10">
        <header className="space-y-1 px-2">
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
            Hi, {user?.firstName || "there"}
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Here's your progress for today.
          </p>
        </header>

        {/* This is where the magic happens */}
        <DashboardClient entries={entries || []} goals={goals} />
      </div>

      <AddEntry />
    </main>
  );
}
