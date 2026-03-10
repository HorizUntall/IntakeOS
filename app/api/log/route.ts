import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { entries, users } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { parseEntryGET, parseEntryPOST } from "@/lib/utils/parseEntry";
import { type_protein, type_cal } from "@/types/entryType";

// export async function POST(req: Request) {
//   const headerList = await headers();
//   const siriKey = headerList.get("x-siri-key");

//   let userId: string | undefined | null = null;

//   if (siriKey === process.env.SIRI_SECRET) {
//     userId = process.env.MY_CLERK_USER_ID;
//   } else {
//     const session = await auth();
//     userId = session.userId;
//   }

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   let { amount, type } = await req.json();
//   type = type.trim().toLowerCase();
//   if (type === "cal") {
//     type = "calories";
//   }

//   if (type !== "protein" && type !== "calories") {
//     // return NextResponse.json({ error: "Invalid Entry Type" }, { status: 400 });
//     return NextResponse.json(
//       { error: `invalid type ${type} and amount ${amount}` },
//       { status: 400 },
//     );
//   }

//   const newEntry = await db
//     .insert(entries)
//     .values({
//       amount,
//       type,
//       userId,
//     })
//     .returning();

//   return NextResponse.json(newEntry[0]);
// }

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("api-key");
    const { command } = await req.json();

    if (!apiKey)
      return Response.json({ message: "API Key missing" }, { status: 401 });

    // Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.apiKey, apiKey),
    });

    if (!user)
      return Response.json({ message: "Invalid API Key" }, { status: 401 });

    const parsedLogs = parseEntryPOST(command);

    if (parsedLogs.length === 0) {
      return Response.json(
        { message: "I couldn't find any numbers. Try saying '500 calories'." },
        { status: 400 },
      );
    }

    const rowstoInsert = parsedLogs.map((log) => ({
      userId: user.clerkId,
      amount: log.amount,
      type: log.type,
    }));

    await db.insert(entries).values(rowstoInsert);

    const summary = parsedLogs
      .map(
        (l) =>
          `${l.amount} ${l.type === "calories" ? "calories" : "grams of protein"}`,
      )
      .join(" and ");

    return Response.json({ message: `Logged ${summary}.` });
  } catch (error) {
    return Response.json(
      { message: "Something went wrong on the server." },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const apiKey = req.headers.get("api-key");
    const { command } = await req.json();

    if (!apiKey) {
      return Response.json({ message: "API Key missing" }, { status: 401 });
    }

    // Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.apiKey, apiKey),
    });

    if (!user)
      return Response.json({ message: "Invalid API Key" }, { status: 401 });

    const parsedLogs = parseEntryGET(command);

    if (parsedLogs === null) {
      return Response.json(
        { message: "Invalid Command. Please try again. " },
        { status: 400 },
      );
    }

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(now);
    endOfToday.setHours(24, 0, 0, 0);

    const userTodayCalories = db.select().from(entries);
    // .where(and(eq(entries.userId, user.clerkId), eq()));

    if (parsedLogs === "summary") {
    }

    if (parsedLogs.startsWith("remaining")) {
      if (parsedLogs.includes("both")) {
      } else if (parsedLogs.includes("protein")) {
      } else if (parsedLogs.includes("calories")) {
      }
    } else {
      if (parsedLogs.includes("both")) {
      } else if (parsedLogs.includes("protein")) {
      } else if (parsedLogs.includes("calories")) {
      }
    }
  } catch (error) {
    return Response.json(
      { message: "Something went wrong on the server." },
      { status: 500 },
    );
  }
}
