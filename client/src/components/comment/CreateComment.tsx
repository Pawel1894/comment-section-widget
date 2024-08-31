import { FC, ReactNode, useRef } from "react";
import { Input } from "@ui/input/Input";
import { Button } from "@ui/button/Button";
import { Textarea } from "@ui/text-area/Textarea";
import { Label } from "@ui/label/Label";
import { CommentBox } from "./CommentBox";
import { toast } from "@/toast";
import { useCreateComment } from "./hooks/use-create-comment";
import { authorMinLength, contentMinLength, validateCommentInput } from "./comment-validation";

import styles from "./CreateComment.module.css";

type CreateCommentProps = {
  topicId: string;
  replyToId?: number;
  title?: ReactNode;
  closeReply?: () => void;
};

export const CreateComment: FC<CreateCommentProps> = ({ topicId, replyToId, title, closeReply }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate, isPending } = useCreateComment({
    topicId,
    onSuccess: () => {
      formRef.current?.reset();
      closeReply?.();
      toast.success("Comment created!");
    },
    onError: () => toast.error("Failed to create comment"),
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const author = formData.get("author")?.toString().trim();
    const content = formData.get("content")?.toString().trim();

    const validationResult = validateCommentInput(author, content);

    if (!validationResult.valid) {
      toast.warn(validationResult.error);
      return;
    }

    const { validatedValue } = validationResult;

    mutate({
      author: validatedValue.author,
      content: validatedValue.content,
      parentId: replyToId,
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <CommentBox className={styles.createComment}>
        <span className={styles.title}>{title ?? "Share your opinion on this topic 😊"}</span>
        <Label>
          Author
          <Input name="author" required minLength={authorMinLength} maxLength={30} autoFocus />
        </Label>
        <Label>
          Comment
          <Textarea name="content" required minLength={contentMinLength} maxLength={200} />
        </Label>
        <Button variant="contained" disabled={isPending} className={styles.button}>
          Send
        </Button>
        {replyToId && (
          <Button onClick={closeReply} disabled={isPending} className={styles.button}>
            Cancel
          </Button>
        )}
      </CommentBox>
    </form>
  );
};
