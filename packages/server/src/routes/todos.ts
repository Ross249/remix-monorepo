import { Hono } from "hono";
import { db } from "../db";
import { createToDo, todos } from "../db/schema";
import { zValidator } from "@hono/zod-validator";
import { createToDoSchema } from "../types/shared";
import { eq } from "drizzle-orm";
import { error } from "console";

export const todoRoute = new Hono()
  .get("/", async (c) => {
    try {
      const res = await db.select().from(todos).limit(20);
      return c.json({ success: true, data: res });
    } catch (e) {
      return c.json({
        success: false,
        error: {
          issues: [
            {
              code: "internal_error",
              message: "Internal server error",
            },
          ],
        },
      });
    }
  })
  .post("/", zValidator("json", createToDoSchema), async (c) => {
    const todo = c.req.valid("json");
    const validatedToDo = createToDo.parse(todo);
    const res = await db
      .insert(todos)
      .values(validatedToDo)
      .returning()
      .then((res) => res[0]);
    c.status(201);
    return c.json({ success: true, data: res });
  })
  .put("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const todo = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .then((res) => res[0]);

    if (!todo) {
      return c.json({
        success: false,
        error: {
          issues: [
            {
              code: "not_found",
              message: "Todo not found",
            },
          ],
        },
      });
    }

    const res = await db
      .update(todos)
      .set({ done: !todo.done })
      .where(eq(todos.id, id))
      .returning()
      .then((res) => res[0]);

    if (!res) {
      return c.json({
        success: false,
        error: {
          issues: [
            {
              code: "internal_error",
              message: "Internal server error",
            },
          ],
        },
      });
    }

    return c.json({ success: true, data: res });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const res = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning()
      .then((res) => res[0]);
    if (!res) {
      return c.json({
        success: false,
        error: {
          issues: [
            {
              code: "not_found",
              message: "Todo not found",
            },
          ],
        },
      });
    }
    return c.json({ success: true, data: res });
  });
