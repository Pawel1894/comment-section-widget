import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";
import { Comment } from "../comment-types";
import type { VoteAction } from "../vote-types";

type voteParams = {
  commentId: string;
  action: VoteAction;
};

const vote = async ({ commentId, action }: voteParams): Promise<number> => {
  const response = await axiosInstance.post(`/comment/vote/${commentId}?action=${action}`);
  return response.data;
};

export const useVote = (
  commentId: string,
  setLocalVoted: (state: boolean | undefined) => void,
  contextKey: QueryKey
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (action: VoteAction) => vote({ commentId, action }),
    onMutate: async (action: VoteAction) => {
      await queryClient.cancelQueries({
        queryKey: contextKey,
      });

      setLocalVoted(action === "upvote");
      const previousComments = queryClient.getQueryData(contextKey);

      queryClient.setQueryData(contextKey, (old: Comment[]) => {
        return old.map((comment: Comment) => {
          if (String(comment.id) === commentId) {
            return {
              ...comment,
              rating: action === "upvote" ? comment.rating + 1 : comment.rating - 1,
            };
          }
          return comment;
        });
      });

      return { previousComments, action };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(contextKey, context?.previousComments);
      setLocalVoted(context?.action === "upvote" ? false : true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: contextKey,
      });
    },
  });
};
