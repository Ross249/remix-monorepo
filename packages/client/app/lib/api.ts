import { hc } from "hono/client";
import { type ApiRoutes } from "../../../server/src/index";
export const client = hc<ApiRoutes>("/");
