import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";
import { Comment, CommentSchema } from "../comment-types";

type Body = Pick<Comment, "author" | "content" | "parentId">;

type CreateCommentParams = {
  topicId: string;
  body: Body;
};

const createComment = async ({ topicId, body }: CreateCommentParams): Promise<Comment> => {
  const response = await axiosInstance.put(`/topic/${topicId}/comment`, body);
  return CommentSchema.parse(response.data);
};

type UseCreateComment = {
  topicId: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export const useCreateComment = ({ topicId, onSuccess, onError }: UseCreateComment) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Body) => createComment({ topicId, body }),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: onError,
  });
};
