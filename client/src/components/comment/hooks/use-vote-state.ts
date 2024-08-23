import { useSyncExternalStore } from "react";
import { getVoteValue, setVoteInLocalStorage } from "../utils/vote-local-storage";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export const useVoteState = (
  commentId: string
): [boolean | undefined, (vote: boolean | undefined) => void] => {
  const getSnapshot = (): boolean | undefined => getVoteValue(commentId);

  const upvoted = useSyncExternalStore(subscribe, getSnapshot);

  const setUpvotedState = (newVote: boolean | undefined) => {
    setVoteInLocalStorage(commentId, newVote);
  };

  return [upvoted, setUpvotedState];
};
