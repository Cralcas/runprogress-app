import React from "react";
import styles from "./Button.module.scss";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "icon";
  size?: "default" | "large" | "icon";
}

export const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "default",
}: IButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
