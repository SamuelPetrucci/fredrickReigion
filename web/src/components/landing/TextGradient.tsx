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
    <Tag
      className={`bg-[linear-gradient(120deg,#22d3ee,#2563eb,#1d4ed8)] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </Tag>
  );
}
