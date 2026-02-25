"use server";
import { eq, and, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/drizzle";
import { entries } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { cal, protein } from "@/types/entryType";

export const getEntries = async () => {
  const { userId } = await auth();

  if (!userId) return;

  const data = await db
    .select({
      id: entries.id,
      type: entries.type,
      amount: entries.amount,
      createdAt: entries.createdAt,
    })
    .from(entries)
    .where(eq(entries.userId, userId))
    .orderBy(asc(entries.createdAt));
  return data;
};

export const addEntry = async (amount: number, type: string) => {
  const { userId } = await auth();
  if (!userId) return;

  if (type !== cal && type !== protein) {
    return;
  }
  await db.insert(entries).values({
    amount,
    type,
    userId,
  });

  revalidatePath("/dashboard");
};

export const addEntries = async (data: { amount: number; type: string }[]) => {
  const { userId } = await auth();
  if (!userId) return;

  const validEntries = data
    .filter(
      (item) => (item.type === cal || item.type === protein) && item.amount > 0,
    )
    .map((item) => ({
      ...item,
      userId,
    }));

  if (validEntries.length === 0) return;

  await db.insert(entries).values(validEntries);
  revalidatePath("/dashboard");
};

export const deleteEntry = async (id: number) => {
  const { userId } = await auth();

  if (!userId) return;

  await db
    .delete(entries)
    .where(and(eq(entries.id, id), eq(entries.userId, userId)));

  revalidatePath("/");
};

export const editEntry = async (id: number, amount: number) => {
  const { userId } = await auth();

  if (!userId) return;

  await db
    .update(entries)
    .set({
      amount: amount,
    })
    .where(and(eq(entries.id, id), eq(entries.userId, userId)));

  revalidatePath("/");
};
