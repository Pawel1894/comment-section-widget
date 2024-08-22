import { FC } from "react";

import styles from "./TopicList.module.css";

type TopicListProps = {
  children: React.ReactNode;
};

export const TopicList: FC<TopicListProps> = ({ children }) => {
  return <div className={styles.topicList}>{children}</div>;
};
