import { db } from "@/lib/db/drizzle";
import { entries, users } from "@/lib/db/schema";
import { eq, and, isNotNull } from "drizzle-orm";
import { parseEntryPOST } from "@/lib/utils/parseEntry";

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("api-key");
    const { command } = await req.json();

    if (!apiKey || apiKey.trim() === "")
      return Response.json({ message: "API Key missing" }, { status: 401 });

    // Find the user
    const user = await db.query.users.findFirst({
      where: and(eq(users.apiKey, apiKey), isNotNull(users.apiKey)),
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
