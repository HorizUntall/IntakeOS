import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import VoiceSupportForm from "./voice-form";

export default async function VoiceSupportPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .then((res) => res[0]);

  if (!user) redirect("/onboarding");

  return (
    <div>
      <VoiceSupportForm user={user} />
    </div>
  );
}
