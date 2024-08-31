import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";
import { CommentSchema, Comment } from "../comment-types";

const fetchCommentReplies = async (commentId: number): Promise<ReadonlyArray<Comment>> => {
  const response = await axiosInstance.get(`/comment/${commentId}/replies`);
  return CommentSchema.array().parse(response.data);
};

export const useCommentsRepliesQuery = (commentId: number, enabled: boolean) =>
  useQuery({
    queryKey: ["comments-reply", commentId],
    queryFn: () => fetchCommentReplies(commentId),
    enabled,
  });
