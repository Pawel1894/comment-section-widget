import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/axiosInstance";
import { CommentSchema, Comment } from "../comment-types";

const fetchComments = async (topicId: number): Promise<ReadonlyArray<Comment>> => {
  const response = await axiosInstance.get(`/topic/${topicId}/comment`);
  return CommentSchema.array().parse(response.data);
};

export const useCommentsQuery = (topicId: number) =>
  useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(topicId),
    placeholderData: keepPreviousData,
  });
