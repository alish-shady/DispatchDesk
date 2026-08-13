import { date, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  date: date("date"),
});
