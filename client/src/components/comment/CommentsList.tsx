import { FC } from "react";
import type { Comment as CommentType } from "./comment-types";

import styles from "./CommentsList.module.css";
import { CommentListItem } from "./CommentListItem";

type CommentsListProps = {
  comments: ReadonlyArray<CommentType>;
  topicId: string;
};

export const CommentsList: FC<CommentsListProps> = ({ comments, topicId }) => {
  return (
    <div className={styles.commentList}>
      {comments.map((comment) => (
        <CommentListItem key={comment.id} topicId={topicId} {...comment} />
      ))}
    </div>
  );
};