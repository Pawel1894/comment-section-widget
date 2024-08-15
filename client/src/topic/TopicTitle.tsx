import { FC } from 'react';
import styles from './TopicTitle.module.css';

type TopicTitleProps = {
  children: React.ReactNode;
};

export const TopicTitle: FC<TopicTitleProps> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
}