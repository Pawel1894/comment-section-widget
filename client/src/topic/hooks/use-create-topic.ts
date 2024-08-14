import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";

const createTopic = async (topic: string): Promise<void> => {
  await axiosInstance.put("/topic", { content: topic });
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
