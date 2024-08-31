import { FC, useState } from "react";

import { Button } from "../ui/button/Button";
import { useCommentsRepliesQuery } from "./hooks/use-comments-replies-query";
import { Comment } from "./Comment";

type CommentRepliesProps = {
  commentId: number;
  topicId: string;
};

export const CommentReplies: FC<CommentRepliesProps> = ({ commentId, topicId }) => {
  const [showReplies, setShowReplies] = useState(false);
  const { data } = useCommentsRepliesQuery(commentId, showReplies);

  return (
    <div>
      {data &&
        showReplies &&
        data.map(({ id, author, createdAt, rating, content }) => (
          <Comment
            key={id}
            id={id}
            author={author}
            createdAt={createdAt}
            rating={
              <Comment.Rating key={`rating-${id}`} topicId={topicId} commentId={String(id)} rating={rating} />
            }
          >
            <Comment.Content>{content}</Comment.Content>
          </Comment>
        ))}
      <Button onClick={() => setShowReplies((prev) => !prev)}>{showReplies ? "Hide" : "Show"} replies</Button>
    </div>
  );
};
