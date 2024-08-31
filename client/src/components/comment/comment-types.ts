import { z } from "zod";

export const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  author: z.string(),
  rating: z.number(),
  parentId: z.number().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  hasReplies: z.boolean().optional(),
});

export type Comment = z.infer<typeof CommentSchema>;

export type CommentWithSubComments = Comment & { subComments: ReadonlyArray<Comment> };
