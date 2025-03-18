import { D1Database } from "@cloudflare/workers-types";
import { dbD1 } from "./database/drizzle/db";
import { Session } from "@auth/core/types";

declare global {
  namespace Vike {
    interface PageContext {
      session?: Session | null;
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof dbD1>;
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      env: Env;
    }
  }
}

// Cloudflare typings
interface Env {
  DB: D1Database;
}

export {};
