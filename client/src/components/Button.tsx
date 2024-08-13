import type { FC, ReactNode } from "react";

import styles from './Button.module.css'

type Button = {
  variant?: "text" | "contained";
  size?: "md";
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Button> = ({ variant = "text", size = "md", children, ...props }) => {
  return (
    <button className={styles.button} data-size={size} data-variant={variant} {...props}>
      {children}
    </button>
  );
};
