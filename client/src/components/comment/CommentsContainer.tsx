import { FC } from "react";
import { CreateComment } from "./CreateComment";
import { useCommentsQuery } from "./hooks/use-comments-query";
import { CommentsList } from "./CommentsList";

import styles from './CommentsContainer.module.css'

type CommentsContainerProps = {
  topicId: string;
};

export const CommentsContainer: FC<CommentsContainerProps> = ({ topicId }) => {
  const { data } = useCommentsQuery(topicId);

  return (
    <div className={styles.commentsContainer}>
      <CreateComment topicId={topicId} />
      {data && <CommentsList comments={data}  />}
    </div>
  );
};
