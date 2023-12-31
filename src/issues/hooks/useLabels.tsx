import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>("/labels?per_page=100");
  return data;
};

export const useLabels = () => {
  // const labelsQuery = useQuery(["labels"], getLabels, {
  //   staleTime: 1000 * 60 * 60,
  // });

  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60,
  });

  return labelsQuery;
};
