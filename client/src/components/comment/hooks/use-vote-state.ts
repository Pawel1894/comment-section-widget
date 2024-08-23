import { useSyncExternalStore } from "react";
import { getVoteValue, setVoteInLocalStorage } from "../utils/vote-local-storage";
import type { VoteAction } from "../vote-types";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export const useVoteState = (
  commentId: string
): [VoteAction | undefined, (vote: VoteAction | undefined) => void] => {
  const getSnapshot = (): VoteAction | undefined => getVoteValue(commentId);

  const vote = useSyncExternalStore(subscribe, getSnapshot);

  const setVoteState = (newVote: VoteAction | undefined) => {
    setVoteInLocalStorage(commentId, newVote);
  };

  return [vote, setVoteState];
};
