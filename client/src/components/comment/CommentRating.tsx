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
  const [upvoted, setUpvoted] = useVoteState(commentId);
  
  const { mutate, isPending } = useVote(commentId, topicId, setUpvoted);

  const handleVote = () => {
    if (upvoted) {
      mutate("downvote");
      return;
    }

    mutate('upvote');
  };

  return (
    <div className={styles.commentRating}>
      <Button
        disabled={isPending}
        variant={upvoted ? "contained" : "text"}
        size="xs"
        onClick={handleVote}
      >
        ↑
      </Button>
      {rating}
    </div>
  );
};
