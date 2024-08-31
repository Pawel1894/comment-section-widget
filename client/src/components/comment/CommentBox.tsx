import { FC } from "react";
import styles from "./CommentBox.module.css";

type CommentBoxProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export const CommentBox: FC<CommentBoxProps> = ({ children, id, className }) => {
  return <div id={id} className={`${styles.commentBox} ${className}`}>{children}</div>;
};
