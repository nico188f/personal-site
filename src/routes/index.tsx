import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getTotalGithubContributions } from "~/serverFunctions/github/getTotalGithubContributions";

export const Route = createFileRoute("/")({
   component: Home,
   loader: async () => await getTotalGithubContributions(),
});

function Home() {
   const router = useRouter();
   const {
      totalCommitContributions,
      totalIssueContributions,
      totalPullRequestContributions,
      totalPullRequestReviewContributions,
   } = Route.useLoaderData();

   return (
      <div className="p-2">
         <h1>Welcome to Nicolaj Blach Jensens Personal Site (WIP)</h1>
         <h2>Nicolajs Stats</h2>
         <ul>
            <li>Total Number of Commits: {totalCommitContributions}</li>
            <li>Total Number of Issues: {totalIssueContributions}</li>
            <li>
               Total Number of Pull Requests: {totalPullRequestContributions}
            </li>
            <li>
               Total Number of Pull Request Reviews:{" "}
               {totalPullRequestReviewContributions}
            </li>
         </ul>
      </div>
   );
}
