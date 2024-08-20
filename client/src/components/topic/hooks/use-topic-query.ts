import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";
import { Topic, TopicSchema } from "../topic-types";

const fetchTopic = async (id: string): Promise<Topic> => {
  const response = await axiosInstance.get(`/topic/${id}`);
  return TopicSchema.parse(response.data);
};

export const useTopicQuery = (id: string) =>
  useQuery({
    queryKey: ["topics", id],
    queryFn: () => fetchTopic(id),
  });
