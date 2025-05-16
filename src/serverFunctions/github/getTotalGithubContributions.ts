import axios from "axios";
import { env } from "process";
import {
   GithubApiResponse,
   GithubContributions,
} from "typesAndSchemas/GithubContributions";
import { z } from "zod";
import { GetSchemaKeys } from "typesAndSchemas/utility/GetSchemaKeys";
import { createServerFn } from "@tanstack/react-start";

const githubUsername = "nico188f";
const startYear = 2022;
const endYear = new Date().getFullYear() + 1;

const queryParameters = GetSchemaKeys(GithubContributions);

async function _getTotalGithubContributions(): Promise<
   z.infer<typeof GithubContributions>
> {
   const totalGithubContributions: z.infer<typeof GithubContributions> = {
      totalCommitContributions: 0,
      totalIssueContributions: 0,
      totalPullRequestContributions: 0,
      totalPullRequestReviewContributions: 0,
   };

   const apiCalls: Promise<void>[] = [];

   // makes api calls for each year
   // and stores the response in a map
   for (let year = startYear; year < endYear; year++) {
      const apiCall = makeGraphQlRequest(year).then(res => {
         const githubApiResponse = GithubApiResponse.parse(res);
         const yearlyContribution: z.infer<typeof GithubContributions> =
            githubApiResponse.data.data.user.contributionsCollection;

         totalGithubContributions.totalCommitContributions +=
            yearlyContribution.totalCommitContributions;

         totalGithubContributions.totalIssueContributions +=
            yearlyContribution.totalIssueContributions;

         totalGithubContributions.totalPullRequestContributions +=
            yearlyContribution.totalPullRequestContributions;

         totalGithubContributions.totalPullRequestReviewContributions +=
            yearlyContribution.totalPullRequestReviewContributions;
      });

      apiCalls.push(apiCall);
   }

   await Promise.all(apiCalls);

   return totalGithubContributions;
}

function makeGraphQlRequest(year: number): Promise<unknown> {
   return axios.post(
      "https://api.github.com/graphql",
      {
         query: generateGraphQLQuery(year),
      },
      {
         headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            "User-Agent":
               "personal-site (https://github.com/nico188f/personal-site)",
         },
      }
   );
}

function generateGraphQLQuery(year: number): string {
   return `
            query {
               user(login: "${githubUsername}") {
                  contributionsCollection(from: "${year}-01-01T00:00:00+0000", to: "${year + 1}-01-01T00:00:00+0000") {
                     ${queryParameters.join("\n")}
                  }
               }
            }
      `;
}

export const getTotalGithubContributions = createServerFn({ method: "GET" })
   .validator((d: undefined) => d)
   .handler(_getTotalGithubContributions);
