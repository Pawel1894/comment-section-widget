import { FC, Fragment } from "react";
import { Comment } from "./Comment";
import type { Comment as CommentType } from "./comment-types";

import styles from "./CommentsList.module.css";
import { CommentWithReply } from "./CommentWithReply";

type CommentsListProps = {
  comments: ReadonlyArray<CommentType>;
  topicId: string;
};

export const CommentsList: FC<CommentsListProps> = ({ comments, topicId }) => {


  return (
    <div className={styles.commentList}>
      {comments.map(({ id, author, createdAt, rating, content, hasReplies }) => (
        <Fragment key={id}>
          <CommentWithReply
            key={id}
            id={id}
            author={author}
            createdAt={createdAt}
            topicId={topicId}
            rating={
              <Comment.Rating key={`rating-${id}`} topicId={topicId} commentId={String(id)} rating={rating} />
            }
          >
            <Comment.Content>{content}</Comment.Content>
          </CommentWithReply>
          {hasReplies && <Comment.Replies topicId={topicId} key={`replies-${id}`} commentId={id} />}
        </Fragment>
      ))}
    </div>
  );
};
