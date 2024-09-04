import trpc from "./trpc/vite-plugin";
import react from "@vitejs/plugin-react";
import devServer from "@hono/vite-dev-server";
import { pages } from "vike-cloudflare";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import path from "path";

export default defineConfig({
   plugins: [
      vike({}),
      pages({
         server: {
            kind: "hono",
            entry: "hono-entry.ts",
         },
      }),
      devServer({
         entry: "hono-entry.ts",

         exclude: [
            /^\/@.+$/,
            /.*\.(ts|tsx|vue)($|\?)/,
            /.*\.(s?css|less)($|\?)/,
            /^\/favicon\.ico$/,
            /.*\.(svg|png)($|\?)/,
            /^\/(public|assets|static)\/.+/,
            /^\/node_modules\/.*/,
         ],

         injectClientScript: false,
      }),
      react({}),
      trpc(),
   ],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./"),
      },
   },
});
