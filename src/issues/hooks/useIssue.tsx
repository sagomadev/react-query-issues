import { useQuery } from "@tanstack/react-query";
import { Issue } from "../interfaces";
import { githubApi } from "../../api/githubApi";

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIssueInfo(issueNumber)
  );
};