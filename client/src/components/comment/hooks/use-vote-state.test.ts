import { useVoteState } from "./use-vote-state";
import { getVoteValue, setVoteInLocalStorage } from "../utils/vote-local-storage";
import { vi, Mock } from "vitest";
import { act, renderHook } from "@tests/test-utils";

vi.mock("../utils/vote-local-storage");

describe("useVoteState", () => {
  const commentId = "comment1";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the initial vote value from local storage", () => {
    const vote = "upvote";
    (getVoteValue as Mock).mockReturnValue(vote);

    const { result } = renderHook(() => useVoteState(commentId));

    expect(result.current[0]).toBe(vote);
    expect(getVoteValue).toHaveBeenCalledWith(commentId);
  });

  it("should update the vote value in local storage", () => {
    const { result } = renderHook(() => useVoteState(commentId));

    act(() => {
      result.current[1](false);
    });

    expect(setVoteInLocalStorage).toHaveBeenCalledWith(commentId, false);
  });

  it("should remove the vote value from local storage when set to undefined", () => {
    const { result } = renderHook(() => useVoteState(commentId));

    act(() => {
      result.current[1](undefined);
    });

    expect(setVoteInLocalStorage).toHaveBeenCalledWith(commentId, undefined);
  });

  it("should update the vote value when local storage changes", () => {
    const initialVote = "upvote";
    const updatedVote = "downvote";

    (getVoteValue as Mock).mockReturnValue(initialVote);

    const { result } = renderHook(() => useVoteState(commentId));

    (getVoteValue as Mock).mockClear();
    (getVoteValue as Mock).mockReturnValue(updatedVote);

    // Initial state is still set to initialVote
    // because the state is only updated when the storage event is triggered
    // so change of mock value doesn't trigger a state update
    expect(result.current[0]).toBe(initialVote);

    // Simulate local storage change
    act(() => {
      window.dispatchEvent(new Event("storage"));
    });

    // State should be updated to the new vote value
    expect(result.current[0]).toBe(updatedVote);
  });
});
