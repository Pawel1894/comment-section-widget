import { getFromLocalStorage, setInLocalStorage } from "@/shared/local-storage-utils";

const getVotesFromLocalStorage = () => {
  return getFromLocalStorage("userUpvotes") || {};
};

export const getVoteValue = (commentId: string) => {
  const value = getVotesFromLocalStorage()[commentId];
  return value ?? undefined;
};

export const setVoteInLocalStorage = (commentId: string, upvoted?: boolean) => {
  const votes = getVotesFromLocalStorage();
  if (upvoted) {
    votes[commentId] = upvoted;
  } else {
    delete votes[commentId];
  }
  setInLocalStorage("userUpvotes", votes);
};
