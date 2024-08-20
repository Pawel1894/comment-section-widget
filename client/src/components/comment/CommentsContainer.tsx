import { FC } from "react";
import { CreateComment } from "./CreateComment";

type CommentsContainerProps = {
  topicId: string;
};

export const CommentsContainer: FC<CommentsContainerProps> = ({ topicId }) => {
  return (
    <div>
      <CreateComment topicId={topicId} />
    </div>
  );
};
