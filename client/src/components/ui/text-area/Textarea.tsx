import type { FC } from "react";

import styles from './Textarea.module.css'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: FC<TextareaProps> = ({className, ...props}) => {
  return (
    <textarea className={`${styles.textarea} ${className}`} {...props} />
  );
};
