// app.config.ts
import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import { cloudflareWorkersDevEnvironmentShim } from "alchemy/cloudflare";

const external = ["node:async_hooks", "cloudflare:workers"];

export default defineConfig({
   tsr: {
      appDirectory: "src",
   },
   server: {
      preset: "cloudflare-module",
      experimental: {
         asyncContext: true,
      },
      unenv: {
         external,
      },
   },
   vite: {
      plugins: [
         // Provides a polyfill for Cloudflare Workers env during development
         cloudflareWorkersDevEnvironmentShim(),
         // Resolves paths based on tsconfig
         tsConfigPaths({
            projects: ["./tsconfig.json"],
         }),
      ],
      build: {
         rollupOptions: {
            external,
         },
      },
   },
});
