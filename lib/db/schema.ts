import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const entries = pgTable("entries", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  amount: integer("amount").notNull(),
  type: text("type").notNull(),
  userId: text("userId").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
