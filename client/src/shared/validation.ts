export type ValidationResult<T> =
  | {
      valid: true;
      validatedValue: T;
    }
  | {
      valid: false;
      error: string;
    };

export const isWhitespaceOnly = (input: string): boolean => {
  return input.trim().length === 0;
};
