import { FC } from "react";
import { Button } from "@ui/button/Button";
import { useVote } from "./hooks/use-vote";
import { useVoteState } from "./hooks/use-vote-state";

import styles from "./CommentRating.module.css";

type CommentRatingProps =
  | {
      context: "parent";
      rating: number;
      commentId: string;
      topicId: string;
    }
  | {
      context: "reply";
      rating: number;
      commentId: string;
      parentCommentId: number;
    };

export const CommentRating: FC<CommentRatingProps> = (props) => {
  const [upvoted, setUpvoted] = useVoteState(props.commentId);

  const contextKey =
    props.context === "parent" ? ["comments", props.topicId] : ["comments-reply", props.parentCommentId];

  const { mutate, isPending } = useVote(props.commentId, setUpvoted, contextKey);

  const handleVote = () => {
    if (upvoted) {
      mutate("downvote");
      return;
    }

    mutate("upvote");
  };

  return (
    <div className={styles.commentRating}>
      <Button disabled={isPending} variant={upvoted ? "contained" : "text"} size="xs" onClick={handleVote}>
        ↑
      </Button>
      {props.rating}
    </div>
  );
};
