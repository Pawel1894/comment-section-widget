import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";
import { Topic, TopicSchema } from "../topic-types";

const createTopic = async (topic: string): Promise<ReadonlyArray<Topic>> => {
  const response = await axiosInstance.put("/topic", { content: topic });
  return TopicSchema.array().parse(response.data);
};

type UseCreateTopic = {
  onSuccess: () => void;
  onError: () => void;
};

export const useCreateTopic = ({ onSuccess, onError }: UseCreateTopic) => {
  return useMutation({
    mutationFn: createTopic,
    onSuccess: onSuccess,
    onError: onError,
  });
};
