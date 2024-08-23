import { z } from "zod";

export const VoteActionSchema = z.enum(["upvote", "downvote"]);
export type VoteAction = z.infer<typeof VoteActionSchema>;
