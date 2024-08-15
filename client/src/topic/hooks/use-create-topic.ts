import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";
import { Topic, TopicSchema } from "../topic-types";

const createTopic = async (topic: string): Promise<Topic> => {
  const response = await axiosInstance.put("/topic", { content: topic });
  console.log(response.data);
  return TopicSchema.parse(response.data);
};

type UseCreateTopic = {
  onSuccess: () => void;
  onError: () => void;
};

export const useCreateTopic = ({ onSuccess, onError }: UseCreateTopic) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: onError,
  });
};
