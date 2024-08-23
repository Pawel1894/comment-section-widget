import { getFromLocalStorage, setInLocalStorage } from "@/shared/local-storage-utils";
import { VoteActionSchema, type VoteAction } from "../vote-types";
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
    it("should return parsed vote value for existing commentId", () => {
      const commentId = "comment1";
      const vote = "upvote";
      const votes = { [commentId]: vote };
      (getFromLocalStorage as Mock).mockImplementation(() => votes);

      const result = getVoteValue(commentId);
      expect(result).toEqual(VoteActionSchema.parse(vote));
      expect(getFromLocalStorage).toHaveBeenCalledWith("userVotes");
    });

    it("should return undefined for non-existing commentId", () => {
      const commentId = "comment1";
      const votes = {};
      (getFromLocalStorage as Mock).mockImplementation(() => votes);

      const result = getVoteValue(commentId);
      expect(result).toBeUndefined();
      expect(getFromLocalStorage).toHaveBeenCalledWith("userVotes");
    });
  });

  describe("setVoteInLocalStorage", () => {
    it("should set the vote value for a commentId", () => {
      const commentId = "comment1";
      const vote: VoteAction = "upvote";
      const votes: Record<string, string> = {};
      (getFromLocalStorage as Mock).mockImplementation(() => votes);
      (setInLocalStorage as Mock).mockImplementation((_, value) => {
        votes[commentId] = value[commentId];
      });

      setVoteInLocalStorage(commentId, vote);

      expect(votes[commentId]).toEqual(vote);
      expect(setInLocalStorage).toHaveBeenCalledWith("userVotes", votes);
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
      expect(setInLocalStorage).toHaveBeenCalledWith("userVotes", votes);
    });
  });
});
