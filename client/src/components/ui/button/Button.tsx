import type { FC, ReactNode } from "react";

import styles from './Button.module.css'

export type ButtonProps = {
  variant?: "text" | "contained";
  size?: 'xs' | "md";
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ variant = "text", size = "md", children, className, ...props }) => {
  return (
    <button className={`${styles.button} ${className}`} data-size={size} data-variant={variant} {...props}>
      {children}
    </button>
  );
};
