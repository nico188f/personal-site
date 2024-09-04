import { vikeHandler } from "./server/vike-handler";
import { appRouter } from "./trpc/server";
import {
  type FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { createHandler } from "@universal-middleware/hono";

const app = new Hono();

app.use("/api/trpc/*", (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext({ req, resHeaders }): FetchCreateContextFnOptions {
      return { req, resHeaders };
    },
  });
});

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler));

export default app;
