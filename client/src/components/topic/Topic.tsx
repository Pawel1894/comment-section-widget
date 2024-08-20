import { FC } from "react";
import { useTopicQuery } from "./hooks/use-topic-query";
import { TopicTitle } from "./TopicTitle";
import { NavigateBackButton } from "@ui/navigate-back-button/NavigateBackButton";

import styles from './Topic.module.css';

type TopicProps = {
  id: string;
}

export const Topic: FC<TopicProps> = ({ id }) => {
  const { data } = useTopicQuery(id);

  return (
    <div className={styles.topic}>
      <div className={styles.contentWrapper}>
        <NavigateBackButton />
        <TopicTitle>
          {data?.content}
        </TopicTitle>
      </div>
    </div>
  );
}