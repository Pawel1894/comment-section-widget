import { FC } from "react";
import { Comment } from "./Comment";
import type { Comment as CommentType } from "./comment-types";

import styles from "./CommentsList.module.css";

type CommentsListProps = {
  comments: ReadonlyArray<CommentType>;
  topicId: string;
};

export const CommentsList: FC<CommentsListProps> = ({ comments, topicId }) => {
  return (
    <div className={styles.commentList}>
      {comments.map(({ id, author, createdAt, rating, content }) => (
        <Comment
          key={id}
          author={author}
          createdAt={createdAt}
          rating={<Comment.Rating topicId={topicId} commentId={String(id)} rating={rating} />}
        >
          <Comment.Content>{content}</Comment.Content>
        </Comment>
      ))}
    </div>
  );
};
