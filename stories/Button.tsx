"use client";

import React, { useEffect, useState } from "react";
import "./button.css";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const [text, setText] = useState<string>("안녕하세요");

  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";

  useEffect(() => {
    const fetchEffect = async () => {
      const response = await fetch("http://localhost:3000/hello");
      const data = await response.json();
      setText(data.firstName);
    };

    fetchEffect();
  }, []);

  return <button {...props}>{text}</button>;
};
