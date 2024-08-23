import { getFromLocalStorage, setInLocalStorage } from "@/shared/local-storage-utils";
import { vi, Mock } from "vitest";
import { getVoteValue, setVoteInLocalStorage } from "./vote-local-storage";

vi.mock("@/shared/local-storage-utils", () => ({
  getFromLocalStorage: vi.fn(),
  setInLocalStorage: vi.fn(),
}));

describe("vote-local-storage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getVoteValue", () => {
    it("should return vote value for existing commentId", () => {
      const commentId = "comment1";
      const vote: boolean | undefined = true;
      const votes = { [commentId]: vote };
      (getFromLocalStorage as Mock).mockImplementation(() => votes);

      const result = getVoteValue(commentId);
      expect(result).toEqual(vote);
      expect(getFromLocalStorage).toHaveBeenCalledWith("userUpvotes");
    });

    it("should return undefined for non-existing commentId", () => {
      const commentId = "comment1";
      const votes = {};
      (getFromLocalStorage as Mock).mockImplementation(() => votes);

      const result = getVoteValue(commentId);
      expect(result).toBeUndefined();
      expect(getFromLocalStorage).toHaveBeenCalledWith("userUpvotes");
    });
  });

  describe("setVoteInLocalStorage", () => {
    it("should set the vote value for a commentId", () => {
      const commentId = "comment1";
      const vote: boolean | undefined = true;
      const votes: Record<string, string> = {};
      (getFromLocalStorage as Mock).mockImplementation(() => votes);
      (setInLocalStorage as Mock).mockImplementation((_, value) => {
        votes[commentId] = value[commentId];
      });

      setVoteInLocalStorage(commentId, vote);

      expect(votes[commentId]).toEqual(vote);
      expect(setInLocalStorage).toHaveBeenCalledWith("userUpvotes", votes);
    });

    it("should remove the vote value for a commentId if vote is undefined", () => {
      const commentId = "comment1";
      const votes: Record<string, string> = { [commentId]: "upvote" };
      (getFromLocalStorage as Mock).mockImplementation(() => votes);
      (setInLocalStorage as Mock).mockImplementation(() => {
        delete votes[commentId];
      });

      setVoteInLocalStorage(commentId);

      expect(votes[commentId]).toBeUndefined();
      expect(setInLocalStorage).toHaveBeenCalledWith("userUpvotes", votes);
    });
  });
});
