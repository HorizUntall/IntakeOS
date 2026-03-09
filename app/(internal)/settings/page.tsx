import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import SettingsForm from "./settings-form";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .then((res) => res[0]);

  if (!user) redirect("/onboarding");

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 mt-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
          Settings
        </h1>
        <p className="text-zinc-500 font-medium">
          Manage your goals and Siri integration.
        </p>
      </header>

      <SettingsForm user={user} />
    </div>
  );
}
