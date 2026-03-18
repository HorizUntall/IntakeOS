import { integer, pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

// export const entries = pgTable("entries", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   amount: integer("amount").notNull(),
//   type: text("type").notNull(),
//   userId: text("userId").notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
//     .defaultNow()
//     .notNull(),
// });

export const entries = pgTable(
  "entries",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    amount: integer("amount").notNull(),
    type: text("type").notNull(),
    userId: text("userId").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // This adds the "Catalog" for User IDs
    index("user_id_idx").on(table.userId),
    // Optional: Add this if you often sort by date (like your Component 2)
    index("created_at_idx").on(table.createdAt),
  ],
);

export const users = pgTable("users", {
  clerkId: text("clerk_id").primaryKey().notNull(),
  email: text("email").notNull(),
  apiKey: text("api_key").unique(),
  calorieMin: integer("calorie_min").notNull().default(1200),
  calorieGoal: integer("calorie_goal").notNull().default(2000),
  proteinGoal: integer("protein_goal").notNull().default(150),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});
