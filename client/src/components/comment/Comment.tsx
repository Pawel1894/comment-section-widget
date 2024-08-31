import { FC } from "react";
import type { Comment as CommentType } from "./comment-types";
import { CommentBox } from "./CommentBox";
import { timeAgo } from "@/shared/time-ago";
import { CommentRating } from "./CommentRating";
import { CommentReplies } from "./CommentReplies";

import styles from "./Comment.module.css";

export type CommentProps = Pick<CommentType, "author" | "createdAt"> & {
  rating?: React.ReactNode;
  children: React.ReactNode;
  reply?: React.ReactNode;
  id: number;
};

const CommentRaw: FC<CommentProps> = ({ author, rating, createdAt, children, id, reply }) => {
  return (
    <CommentBox id={`comment-${id}`}>
      <div className={styles.heading}>
        {rating}
        {reply}
      </div>
      <div className={styles.about}>
        <span title={author} className={styles.author}>
          {author}
        </span>
        <span className={styles.date}>{timeAgo(createdAt)}</span>
      </div>
      {children}
    </CommentBox>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <blockquote className={styles.content}>{children}</blockquote>;
};

export const Comment = Object.assign(CommentRaw, { Content, Rating: CommentRating, Replies: CommentReplies });
