import { db } from "@/lib/db/drizzle";
import { entries, users } from "@/lib/db/schema";
import { eq, and, gte, lt, sum, isNotNull } from "drizzle-orm";
import { parseEntryGET } from "@/lib/utils/parseEntry";
import { type_protein, type_cal } from "@/types/entryType";

export async function GET(req: Request) {
  try {
    const apiKey = req.headers.get("api-key");
    // const { command } = await req.json();
    const { searchParams } = new URL(req.url);
    const command = searchParams.get("command");
    if (!command) {
      return Response.json(
        { message: "No command provided in URL" },
        { status: 400 },
      );
    }

    if (!apiKey || apiKey.trim() === "")
      return Response.json({ message: "API Key missing" }, { status: 401 });

    // Find the user
    const user = await db.query.users.findFirst({
      where: and(eq(users.apiKey, apiKey), isNotNull(users.apiKey)),
    });

    if (!user)
      return Response.json({ message: "Invalid API Key" }, { status: 401 });

    const parsedLogs = parseEntryGET(decodeURIComponent(command));

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

    const userTodayCalories = await db
      .select({ total: sum(entries.amount) })
      .from(entries)
      .where(
        and(
          eq(entries.userId, user.clerkId),
          eq(entries.type, type_cal),
          gte(entries.createdAt, startOfToday),
          lt(entries.createdAt, endOfToday),
        ),
      );
    const totalCalories = Number(userTodayCalories[0]?.total ?? 0);

    const userTodayProtein = await db
      .select({ total: sum(entries.amount) })
      .from(entries)
      .where(
        and(
          eq(entries.userId, user.clerkId),
          eq(entries.type, type_protein),
          gte(entries.createdAt, startOfToday),
          lt(entries.createdAt, endOfToday),
        ),
      );
    const totalProtein = Number(userTodayProtein[0]?.total ?? 0);

    if (parsedLogs === "summary") {
      let summary = `Calories consumed so far is ${totalCalories} calories. `;
      summary +=
        totalCalories <= (user.calorieGoal ?? 0)
          ? "You're still within goal. "
          : "You're over goal. ";
      summary += `Protein intake so far is ${totalProtein}. `;
      summary +=
        totalProtein >= (user.proteinGoal ?? 0)
          ? "You've achieved your protein goal!"
          : `${(user.proteinGoal ?? 0) - totalProtein} grams of protein to go. `;

      return Response.json({ message: summary });
    }

    if (parsedLogs.startsWith("remaining")) {
      let message = "You have ";
      const remainingCal = (user.calorieGoal ?? 0) - totalCalories;
      const remainingProtein = (user.proteinGoal ?? 0) - totalProtein;
      if (parsedLogs.includes("both")) {
        if (remainingCal >= 0) {
          message += `${remainingCal} calories remaining and `;
        } else {
          message += "already exceeded your calorie goal and ";
        }
        if (remainingProtein >= 0) {
          message += `you have ${remainingProtein} grams of protein to go.`;
        } else {
          message += "you have already achieved your protein goal. ";
        }
      } else if (parsedLogs.includes("calories")) {
        if (remainingCal >= 0) {
          message += `${remainingCal} calories remaining.`;
        } else {
          message += "already exceeded your calorie goal and ";
        }
      } else if (parsedLogs.includes("protein")) {
        if (remainingProtein >= 0) {
          message += `${remainingProtein} grams of protein to go.`;
        } else {
          message += "already achieved your protein goal. ";
        }
      }
      return Response.json({ message: message });
    } else {
      let message = "You have consumed ";
      if (parsedLogs.includes("both")) {
        message += `${totalCalories} calories and ${totalProtein} grams of protein.`;
      } else if (parsedLogs.includes("protein")) {
        message += `${totalProtein} grams of protein.`;
      } else if (parsedLogs.includes("calories")) {
        message += `${totalCalories} calories.`;
      }
      return Response.json({ message: message });
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Something went wrong on the server." },
      { status: 500 },
    );
  }
}
