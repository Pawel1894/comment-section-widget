import { FC } from "react";
import { Link } from "react-router-dom";

type TopicItemProps = {
  id: number;
  content: string;
  index: number;
};

import styles from './TopicItem.module.css'

export const TopicItem: FC<TopicItemProps> = ({ content, id, index }) => {
  return (
    <Link title={content} className={styles.topicItemLink} to={`/${id}`}>{index}. {content}</Link>
  );
};
