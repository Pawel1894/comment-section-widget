import { FC, useRef } from "react";
import { Input } from "@ui/input/Input";
import { Button } from "@ui/button/Button";
import { Textarea } from "@ui/text-area/Textarea";
import { Label } from "@ui/label/Label";
import { CommentBox } from "./CommentBox";
import { toast } from '@/toast'
import { useCreateComment } from "./hooks/use-create-comment";
import { authorMinLength, contentMinLength, validateCommentInput } from "./comment-validation";

import styles from './CreateComment.module.css';

type CreateCommentProps = {
  topicId: string;
}

export const CreateComment: FC<CreateCommentProps> = ({ topicId }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { mutate, isPending } = useCreateComment({
      topicId,
      onSuccess: () => {
        formRef.current?.reset();
        toast.success("Comment created!");
      },
      onError: () => toast.error("Failed to create comment"),
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      const author = formData.get('author')?.toString().trim();
      const content = formData.get('content')?.toString().trim();

      const validationResult = validateCommentInput(author, content);
  
      if (!validationResult.valid) {
        toast.warn(validationResult.error);
        return;
      }

      const { validatedValue } = validationResult;
  
      mutate({
        author: validatedValue.author,
        content: validatedValue.content,
      });
    }

    return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <CommentBox className={styles.createComment}>
        <Label>
          Author
          <Input name="author" required minLength={authorMinLength} maxLength={30} />
        </Label>
        <Label>
          Comment
          <Textarea name="content" required minLength={contentMinLength} maxLength={200} />
        </Label>
        <Button variant="contained" disabled={isPending} className={styles.button}>
          Send
        </Button>
      </CommentBox>
    </form>
  );
};
