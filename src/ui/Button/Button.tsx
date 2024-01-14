import type { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ className, children, ...buttonProps }: Props) => {
  return (
    <button className={cn(styles.button, className)} {...buttonProps}>
      {children}
    </button>
  );
};
