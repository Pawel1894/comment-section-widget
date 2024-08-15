import { validateTopicInput } from "./topic-validation";

describe("validateTopicInput", () => {
  describe("Invalid topics", () => {
    it.each([
      { topic: null, expected: { valid: false, error: "Topic must not be empty" } },
      { topic: undefined, expected: { valid: false, error: "Topic must not be empty" } },
      { topic: "   ", expected: { valid: false, error: "Topic must be at least 3 characters long" } },
      { topic: "ab", expected: { valid: false, error: "Topic must be at least 3 characters long" } },
      {
        topic: "a".repeat(201),
        expected: { valid: false, error: "Topic must be at most 200 characters long" },
      },
    ])("should invalidate topic: $topic", ({ topic, expected }) => {
      const result = validateTopicInput(topic);
      expect(result).toEqual(expected);
    });
  });

  describe("Valid topics", () => {
    it.each([{ topic: "Valid Topic", expected: { valid: true, validatedValue: "Valid Topic" } }])(
      "should validate topic: $topic",
      ({ topic, expected }) => {
        const result = validateTopicInput(topic);
        expect(result).toEqual(expected);
      }
    );
  });
});
