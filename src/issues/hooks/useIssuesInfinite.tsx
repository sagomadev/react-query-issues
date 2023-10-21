import { useInfiniteQuery } from "@tanstack/react-query";
import { Issue, State } from "../interfaces";
import { githubApi } from "../../api/githubApi";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  const { state, labels } = queryKey[2] as Props;

  const params = new URLSearchParams();
  if (state) params.append("state", state);

  if (labels.length > 0) {
    params.append("labels", labels.join(","));
  }
  params.append("page", pageParam.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery(
    ["issues", "infinite", { state, labels, page: 1 }],
    (data) => getIssues(data)
  );
  return {
    issuesQuery,
  };
};
