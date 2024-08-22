import { Button } from "@ui/button/Button";

import styles from './CommentRating.module.css';

export const CommentRating = ({ rating }: { rating: number }) => {
  return (
    <div className={styles.commentRating}>
      <Button size="xs">↑</Button>
      {rating}
      <Button size="xs">↓</Button>
    </div>
  );
};
