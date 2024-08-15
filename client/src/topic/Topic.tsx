import { FC } from "react";
import { useTopicQuery } from "./hooks/use-topic-query";
import { TopicTitle } from "./TopicTitle";

import styles from './Topic.module.css';

type TopicProps = {
  id: string;
}

export const Topic: FC<TopicProps> = ({ id }) => {
  const { data } = useTopicQuery(id);

  return (
    <div className={styles.topic}>
      <TopicTitle>
        {data?.content}
      </TopicTitle>
    </div>
  );
}