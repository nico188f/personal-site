// ./alchemy.run.ts
import "alchemy/cloudflare";
import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";

const app = await alchemy("personal-site", {
   stage: process.env.USER ?? "dev",
   phase: process.argv.includes("--destroy") ? "destroy" : "up",
   quiet: process.argv.includes("--verbose") ? false : true,
   password: process.env.SECRET_PASSPHRASE,
});

const website = await TanStackStart("personal-site", {
   command: "bun run build",
   bindings: {
      GITHUB_TOKEN: alchemy.secret(process.env.GITHUB_TOKEN),
   },
});

console.log({
   url: website.url,
});

await app.finalize();
