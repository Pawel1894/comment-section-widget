import { FC } from "react";
import type { Comment as CommentType } from "./comment-types";
import { CommentBox } from "./CommentBox";
import { Button } from "@ui/button/Button";
import { timeAgo } from "@/shared/time-ago";
import { CommentRating } from "./CommentRating";

import styles from './Comment.module.css';

type CommentProps = Pick<CommentType, "author" | "createdAt"> & {
  rating: React.ReactNode;
  children: React.ReactNode;
};

const CommentRaw: FC<CommentProps> = ({ author, rating, createdAt, children }) => {
  return (
    <CommentBox>
      <div className={styles.heading}>
        {rating}
        <Button size="xs">Reply</Button>
      </div>
      <div className={styles.about}>
        <span className={styles.author}>{author}</span>
        <span className={styles.date}>{timeAgo(createdAt)}</span>
      </div>
      {children}
    </CommentBox>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <blockquote className={styles.content}>{children}</blockquote>;
};

export const Comment = Object.assign(CommentRaw, { Content, Rating: CommentRating });
