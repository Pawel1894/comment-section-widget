import { z } from "zod";

export const TopicSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Topic = z.infer<typeof TopicSchema>;
