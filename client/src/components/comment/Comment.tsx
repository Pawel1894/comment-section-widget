import { FC, useState } from "react";
import type { Comment as CommentType } from "./comment-types";
import { CommentBox } from "./CommentBox";
import { Button } from "@ui/button/Button";
import { timeAgo } from "@/shared/time-ago";
import { CommentRating } from "./CommentRating";
import { CreateComment } from "./CreateComment";

import styles from "./Comment.module.css";

type CommentProps = Pick<CommentType, "author" | "createdAt"> & {
  rating: React.ReactNode;
  children: React.ReactNode;
  topicId: string;
  id: number;
};

const CommentRaw: FC<CommentProps> = ({ author, rating, createdAt, topicId, children, id }) => {
  const [replyActive, setReplyActive] = useState(false);

  const toggleReply = () => {
    setReplyActive((replyActive) => !replyActive);
  };

  const closeReply = () => {
    setReplyActive(false);
  }

  return (
    <div className={styles.commentContainer}>
      <CommentBox id={`comment-${id}`}>
        <div className={styles.heading}>
          {rating}
          <Button size="xs" onClick={toggleReply}>
            Reply
          </Button>
        </div>
        <div className={styles.about}>
          <span title={author} className={styles.author}>
            {author}
          </span>
          <span className={styles.date}>{timeAgo(createdAt)}</span>
        </div>
        {children}
      </CommentBox>
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
};

const ReplyTitle = ({ author, commentId }: { author: string; commentId: number }) => {
  return (
    <a title={author} className={styles.replyTitle} href={`#comment-${commentId}`}>
      Replying to {author}
    </a>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <blockquote className={styles.content}>{children}</blockquote>;
};

export const Comment = Object.assign(CommentRaw, { Content, Rating: CommentRating });
