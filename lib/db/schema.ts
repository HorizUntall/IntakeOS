import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const entries = pgTable("entries", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  amount: integer("amount").notNull(),
  type: text("type").notNull(),
  userId: text("userId").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});

export const users = pgTable("users", {
  clerkId: text("clerk_id").primaryKey().notNull(),
  email: text("email").notNull(),
  apiKey: text("api_key").unique(),
  calorieMin: integer("calorie_min").default(1200),
  calorieGoal: integer("calorie_goal").default(2000),
  proteinGoal: integer("protein_goal").notNull().default(150),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});
