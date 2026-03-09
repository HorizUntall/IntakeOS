import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { entries } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const headerList = await headers();
  const siriKey = headerList.get("x-siri-key");

  let userId: string | undefined | null = null;

  if (siriKey === process.env.SIRI_SECRET) {
    userId = process.env.MY_CLERK_USER_ID;
  } else {
    const session = await auth();
    userId = session.userId;
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let { amount, type } = await req.json();
  type = type.trim().toLowerCase();
  if (type === "cal") {
    type = "calories";
  }

  if (type !== "protein" && type !== "calories") {
    // return NextResponse.json({ error: "Invalid Entry Type" }, { status: 400 });
    return NextResponse.json(
      { error: `invalid type ${type} and amount ${amount}` },
      { status: 400 },
    );
  }

  const newEntry = await db
    .insert(entries)
    .values({
      amount,
      type,
      userId,
    })
    .returning();

  return NextResponse.json(newEntry[0]);
}
