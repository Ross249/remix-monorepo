import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { todoRoute } from "./routes/todos";

const app = new Hono();
app.use(logger());

const apiRoutes = app.basePath("/api").route("/todos", todoRoute);

serve({
  fetch: app.fetch,
  port: Number.parseInt(process.env.SERVER_PORT as string) || 4000,
});
export type ApiRoutes = typeof apiRoutes;
