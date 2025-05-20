import "alchemy/cloudflare";
import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";
import { env } from "process";

let stage = "prod";
let workerSuffix = "";

if (process.argv.includes("--preview")) {
   stage = "dev";
   workerSuffix = "-preview";
}

const app = await alchemy("personal-site", {
   stage: process.env.USER ?? stage,
   phase: process.argv.includes("--destroy") ? "destroy" : "up",
   quiet: process.argv.includes("--verbose") ? false : true,
   password: process.env.SECRET_PASSPHRASE,
});

const website = await TanStackStart("personal-site" + workerSuffix, {
   command: "bun run build",
   bindings: {
      GITHUB_TOKEN: alchemy.secret(env.GITHUB_TOKEN),
   },
});

console.log(website.url);
await app.finalize();
