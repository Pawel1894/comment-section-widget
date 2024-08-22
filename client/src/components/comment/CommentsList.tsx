import { FC } from "react";
import { Comment } from "./Comment";
import type { Comment as CommentType } from "./comment-types";

import styles from './CommentsList.module.css';

type CommentsListProps = {
  comments: ReadonlyArray<CommentType>;
};

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className={styles.commentList}>
      {comments.map(({ id, author, createdAt, rating, content }) => (
        <Comment key={id} author={author} createdAt={createdAt} rating={<Comment.Rating rating={rating} />}>
          <Comment.Content>{content}</Comment.Content>
        </Comment>
      ))}
    </div>
  );
};
