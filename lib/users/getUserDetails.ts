import { db } from "@/lib/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getUserGoals() {
  const { userId } = await auth();
  if (!userId) return;

  const data = await db
    .select({
      calorieMin: users.calorieMin,
      calorieGoal: users.calorieGoal,
      proteinGoal: users.proteinGoal,
    })
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  return data[0] ?? null;
}

export async function getUserKey() {
  const { userId } = await auth();
  if (!userId) return;

  const data = await db
    .select({ apiKey: users.apiKey })
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);
  return data[0] ?? null;
}
