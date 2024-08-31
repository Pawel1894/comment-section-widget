import { useCallback, useRef } from "react";
import { Comment } from "./Comment";
import type { Comment as CommentType } from "./comment-types";

import { CommentWithReply } from "./CommentWithReply";

import styles from './CommentListItem.module.css';

export const CommentListItem = ({
  id,
  author,
  createdAt,
  rating,
  content,
  hasReplies,
  topicId,
}: CommentType & { topicId: string }) => {
  const parentCommentRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToParent = useCallback(() => {
    if (parentCommentRef.current) {
      parentCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  
  return (
    <div className={styles.commentListItem}>
      <CommentWithReply
        ref={parentCommentRef}
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
      {hasReplies && (
        <Comment.Replies onHideReplies={handleScrollToParent} topicId={topicId} parentCommentId={id} />
      )}
    </div>
  );
};
