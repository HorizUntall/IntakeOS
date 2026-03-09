"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";

export async function completeOnboarding(
  calorieMin: number,
  calorieGoal: number,
  proteinGoal: number,
  apiKey: string,
) {
  const { userId } = await auth();
  const client = await clerkClient();

  if (!userId) throw new Error("Unauthorized");

  // 1. Mark as complete in Clerk (so Middleware lets them through)
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { onboardingComplete: true },
  });

  // 2. Create the user in Drizzle DB
  const user = await client.users.getUser(userId);
  await db
    .insert(users)
    .values({
      clerkId: userId,
      email: user.emailAddresses[0].emailAddress,
      calorieMin: calorieMin,
      calorieGoal: calorieGoal,
      proteinGoal: proteinGoal,
      apiKey: apiKey || null,
    })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        calorieMin,
        calorieGoal,
        proteinGoal,
        apiKey,
      },
    });
}
