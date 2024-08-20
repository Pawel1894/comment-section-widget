import { ValidationResult } from "@/shared/validation";

export const authorMinLength = 3;
export const contentMinLength = 3;

export const validateCommentInput = (
  author?: string,
  content?: string
): ValidationResult<{
  author: string;
  content: string;
}> => {
  if (!author || author.length < authorMinLength) {
    return { valid: false, error: "Author must be at least 3 characters long" };
  }

  if (!content || content.length < contentMinLength) {
    return { valid: false, error: "Comment must be at least 3 characters long" };
  }

  return { valid: true, validatedValue: { author, content } };
};
