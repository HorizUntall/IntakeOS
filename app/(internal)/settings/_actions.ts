"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateUserSettings(formData: {
  calorieMin: number;
  calorieGoal: number;
  proteinGoal: number;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db
    .update(users)
    .set({
      calorieMin: formData.calorieMin,
      calorieGoal: formData.calorieGoal,
      proteinGoal: formData.proteinGoal,
    })
    .where(eq(users.clerkId, userId));

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  return { success: true };
}
