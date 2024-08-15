import type { FC } from "react";

import styles from './Input.module.css'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({className, ...props}) => {
  return (
    <input className={`${styles.input} ${className}`} {...props} />
  );
};
