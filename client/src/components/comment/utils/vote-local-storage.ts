import { getFromLocalStorage, setInLocalStorage } from "@/shared/local-storage-utils";
import { VoteActionSchema, type VoteAction } from "../vote-types";

const getVotesFromLocalStorage = () => {
  return getFromLocalStorage("userVotes") || {};
};

export const getVoteValue = (commentId: string) => {
  const value = getVotesFromLocalStorage()[commentId];
  return value ? VoteActionSchema.parse(value) : undefined;
};

export const setVoteInLocalStorage = (commentId: string, vote?: VoteAction) => {
  const votes = getVotesFromLocalStorage();
  if (vote) {
    votes[commentId] = vote;
  } else {
    delete votes[commentId];
  }
  setInLocalStorage("userVotes", votes);
};
