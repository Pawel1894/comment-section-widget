import { FC } from "react";
import styles from "./CommentBox.module.css";

type CommentBoxProps = {
  children: React.ReactNode;
  className?: string;
};

export const CommentBox: FC<CommentBoxProps> = ({ children, className }) => {
  return <div className={`${styles.commentBox} ${className}`}>{children}</div>;
};
