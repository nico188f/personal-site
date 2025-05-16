import { number, z } from "zod";

export const GithubContributions = z.object({
   totalCommitContributions: number().int().nonnegative().finite(),
   totalIssueContributions: number().int().nonnegative().finite(),
   totalPullRequestContributions: number().int().nonnegative().finite(),
   totalPullRequestReviewContributions: number().int().nonnegative().finite(),
});
