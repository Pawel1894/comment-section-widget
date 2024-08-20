import { FC } from "react";

import styles from './Label.module.css'

type LabelProps = {
  children: React.ReactNode;
};

export const Label: FC<LabelProps> = ({ children }) => {
  return <label className={styles.label}>{children}</label>;
};
