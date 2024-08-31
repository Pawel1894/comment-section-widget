import { forwardRef, useState } from "react";
import { Button } from "@ui/button/Button";
import { CreateComment } from "./CreateComment";
import { Comment, CommentProps } from "./Comment";

import styles from "./Comment.module.css";

type CommentWithReplyProps = Pick<CommentProps, "author" | "children" | "createdAt" | "id" | "rating"> & {
  topicId: string;
  replies?: React.ReactNode;
};

export const CommentWithReply = forwardRef<HTMLDivElement, CommentWithReplyProps>(
  ({ author, rating, createdAt, topicId, children, id }, ref) => {
    const [replyActive, setReplyActive] = useState(false);

    const toggleReply = () => {
      setReplyActive((replyActive) => !replyActive);
    };

    const closeReply = () => {
      setReplyActive(false);
    };

    return (
      <div ref={ref} className={styles.commentContainer}>
        <Comment
          id={id}
          author={author}
          rating={rating}
          reply={
            <Button size="xs" onClick={toggleReply}>
              Reply
            </Button>
          }
          createdAt={createdAt}
        >
          {children}
        </Comment>
        {replyActive && (
          <CreateComment
            title={<ReplyTitle author={author} commentId={id} />}
            closeReply={closeReply}
            replyToId={id}
            topicId={topicId}
          />
        )}
      </div>
    );
  }
);

CommentWithReply.displayName = "CommentWithReply";

const ReplyTitle = ({ author, commentId }: { author: string; commentId: number }) => {
  return (
    <a title={author} className={styles.replyTitle} href={`#comment-${commentId}`}>
      Replying to {author}
    </a>
  );
};
