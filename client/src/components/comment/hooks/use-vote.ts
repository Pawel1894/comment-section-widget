import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";

type action = "upvote" | "downvote";

type voteParams = {
  commentId: string;
  action: action;
};

const vote = async ({ commentId, action }: voteParams): Promise<number> => {
  const response = await axiosInstance.post(`/comment/vote/${commentId}?action=${action}`);
  return response.data;
};

export const useVote = (commentId: string) => {
  return useMutation({
    mutationFn: (action: action) => vote({ commentId, action }),
  });
};
