import type { ReactNode } from "react";

type TextGradientProps = {
  children: ReactNode;
  className?: string;
  as?: "span" | "strong";
};

export function TextGradient({
  children,
  className = "",
  as: Tag = "span",
}: TextGradientProps) {
  return (
    <Tag className={`text-gradient-gold ${className}`}>{children}</Tag>
  );
}
