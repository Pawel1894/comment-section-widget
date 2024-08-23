import { FC, useState } from "react";
import { Button } from "@ui/button/Button";
import { useVote } from "./hooks/use-vote";

import styles from "./CommentRating.module.css";

type CommentRatingProps = {
  rating: number;
  commentId: string;
};

// TODO: Keep track of the user's vote using Local Storage not just the UI
export const CommentRating: FC<CommentRatingProps> = ({ rating, commentId }) => {
  const [voted, setVoted] = useState<"upvote" | "downvote">();
  const { mutate } = useVote(commentId);

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
      <Button variant={voted === "upvote" ? "contained" : "text"} size="xs" onClick={handleUpvote}>
        ↑
      </Button>
      {rating}
      <Button variant={voted === "downvote" ? "contained" : "text"} size="xs" onClick={handleDownvote}>
        ↓
      </Button>
    </div>
  );
};
