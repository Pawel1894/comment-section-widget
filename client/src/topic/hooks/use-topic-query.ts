import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";
import { Topic, TopicSchema } from "../topic-types";

const fetchTopics = async (search: string): Promise<ReadonlyArray<Topic>> => {
  const response = await axiosInstance.get(`/topic?search=${search}`);
  return TopicSchema.array().parse(response.data);
};

export const useTopicsQuery = (search: string) =>
  useQuery({
    queryKey: ["topics", search],
    queryFn: () => fetchTopics(search),
  });
