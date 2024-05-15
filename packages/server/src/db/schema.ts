import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey().notNull(),
  text: text("text").notNull(),
  done: boolean("done").notNull().default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const createToDo = createInsertSchema(todos, {
  text: z
    .string()
    .min(3, { message: "Text must be at least 3 characters" })
    .max(30, { message: "Text must be at most 30 characters" }),
  done: z.boolean().default(false),
});

export const queryToDo = createSelectSchema(todos);
