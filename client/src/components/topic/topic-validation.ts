import { isWhitespaceOnly, ValidationResult } from "@shared/validation";

export const validateTopicInput = (topic?: string | null): ValidationResult<string> => {
  if (!topic) {
    return { valid: false, error: "Topic must not be empty" };
  }

  if (isWhitespaceOnly(topic) || topic.length < 3) {
    return { valid: false, error: "Topic must be at least 3 characters long" };
  }

  if (topic.length > 200) {
    return { valid: false, error: "Topic must be at most 200 characters long" };
  }

  return { valid: true, validatedValue: topic };
};
