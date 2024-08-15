import { FC } from "react";
import { Link } from "react-router-dom";

type TopicItemProps = {
  id: number;
  content: string;
};

import styles from './TopicItem.module.css'

export const TopicItem: FC<TopicItemProps> = ({ content, id }) => {
  return (
    <Link title={content} className={styles.topicItemLink} to={`/${id}`}>{content}</Link>
  );
};
