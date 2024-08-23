import { FC } from "react";
import { Button } from "@ui/button/Button";
import { useVote } from "./hooks/use-vote";
import { useVoteState } from "./hooks/use-vote-state";

import styles from "./CommentRating.module.css";

type CommentRatingProps = {
  rating: number;
  commentId: string;
  topicId: string;
};

export const CommentRating: FC<CommentRatingProps> = ({ rating, commentId, topicId }) => {
  const [voted, setVoted] = useVoteState(commentId);
  
  const { mutate, isPending } = useVote(commentId, topicId);

  const handleVote = (action: "upvote" | "downvote") => {
    if (voted === action) {
      setVoted(undefined);
      mutate(action === "upvote" ? "downvote" : "upvote");
      return;
    }

    setVoted(action);
    mutate(action);
  };

  const handleUpvote = () => handleVote("upvote");
  const handleDownvote = () => handleVote("downvote");

  return (
    <div className={styles.commentRating}>
      <Button
        disabled={isPending}
        variant={voted === "upvote" ? "contained" : "text"}
        size="xs"
        onClick={handleUpvote}
      >
        ↑
      </Button>
      {rating}
      <Button
        disabled={isPending}
        variant={voted === "downvote" ? "contained" : "text"}
        size="xs"
        onClick={handleDownvote}
      >
        ↓
      </Button>
    </div>
  );
};
