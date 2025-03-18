import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import type { D1Database } from "@cloudflare/workers-types";

export function dbD1(d1: D1Database) {
  return drizzleD1(d1);
}
