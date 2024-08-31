import { CommentsContainer } from "@/components/comment/CommentsContainer";
import { Topic } from "@topic/Topic";
import { Link, useParams } from "react-router-dom";

import styles from "./TopicPage.module.css";
import { Button } from "@/components/ui/button/Button";

export const TopicPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid Id</div>;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.heading}>
        <Link to={"/"}>
          <Button>Go to homepage</Button>
        </Link>

        <Topic id={id} />
      </div>
      <CommentsContainer topicId={id} />
    </div>
  );
};
