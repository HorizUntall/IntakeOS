"use server";

import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";

export async function generateKey() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const newKey = `intakeos_${crypto.randomBytes(16).toString("hex")}`;

  return newKey;
}
