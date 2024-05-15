import { z } from "zod";
import { createToDo } from "../db/schema";

export const createToDoSchema = createToDo.omit({
  id: true,
  created_at: true,
});

export type CreateToDo = z.infer<typeof createToDoSchema>;
