import { FC, useState } from "react";

import { Button } from "@ui/button/Button";
import { useCommentsRepliesQuery } from "./hooks/use-comments-replies-query";
import { Comment } from "./Comment";

import styles from "./CommentReplies.module.css";

type CommentRepliesProps = {
  parentCommentId: number;
  onHideReplies: () => void;
};

export const CommentReplies: FC<CommentRepliesProps> = ({ parentCommentId, onHideReplies }) => {
  const [showReplies, setShowReplies] = useState(false);
  const { data } = useCommentsRepliesQuery(parentCommentId, showReplies);

  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };


  const handleHideReplies = () => {
    setShowReplies(false);
    onHideReplies();
  };

  return (
    <div className={styles.commentRepliesContainer}>
      {data && (
        <div className={styles.commentReplies}>
          {showReplies &&
            data.map(({ id, author, createdAt, rating, content }) => (
              <div
                key={id}
                style={{
                  paddingLeft: "10px",
                }}
              >
                <Comment
                  id={id}
                  author={author}
                  createdAt={createdAt}
                  rating={
                    <Comment.Rating
                      context="reply"
                      parentCommentId={parentCommentId}
                      commentId={String(id)}
                      rating={rating}
                    />
                  }
                >
                  <Comment.Content>{content}</Comment.Content>
                </Comment>
              </div>
            ))}
        </div>
      )}
      <Button
        className={styles.toggleRepliesBtn}
        onClick={showReplies ? handleHideReplies : handleShowReplies}
      >
        {showReplies ? "Hide" : "Show"} replies
      </Button>
    </div>
  );
};
