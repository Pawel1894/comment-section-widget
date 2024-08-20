import { validateCommentInput, authorMinLength, contentMinLength } from "./comment-validation";

const validAuthor = "A".repeat(authorMinLength);
const invalidAuthor = "A".repeat(authorMinLength - 1);
const validContent = "C".repeat(contentMinLength);
const invalidContent = "C".repeat(contentMinLength - 1);

describe("validateCommentInput", () => {
  it("returns valid result for valid input", () => {
    const result = validateCommentInput(validAuthor, validContent);
    expect(result).toEqual({
      valid: true,
      validatedValue: {
        author: validAuthor,
        content: validContent,
      },
    });
  });

  it("returns error for missing author", () => {
    const result = validateCommentInput(undefined, validContent);
    expect(result).toEqual({
      valid: false,
      error: `Author must be at least ${authorMinLength} characters long`,
    });
  });

  it("returns error for short author", () => {
    const result = validateCommentInput(invalidAuthor, validContent);
    expect(result).toEqual({
      valid: false,
      error: `Author must be at least ${authorMinLength} characters long`,
    });
  });

  it("returns error for missing content", () => {
    const result = validateCommentInput(validAuthor, undefined);
    expect(result).toEqual({
      valid: false,
      error: `Comment must be at least ${contentMinLength} characters long`,
    });
  });

  it("returns error for short content", () => {
    const result = validateCommentInput(validAuthor, invalidContent);
    expect(result).toEqual({
      valid: false,
      error: `Comment must be at least ${contentMinLength} characters long`,
    });
  });
});
