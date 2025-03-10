import type { JSX } from "react";
import React from "react";
import { cn } from "@/lib/utils";
import type {
  HeadingProps,
  HeadingType,
  HeadingVariant,
} from "./Heading.props";

// Styles for each variant
const variantStyles: Record<HeadingVariant, string> = {
  h1: "heading-h1",
  h2: "heading-h2",
  h3: "heading-h3",
  h4: "heading-h4",
  h5: "heading-h5",
  h6: "heading-h6",
};

// Heading component
const Heading = <T extends HeadingType>({
  as: Component,
  styledAs,
  className,
  children,
}: HeadingProps<T>) => {
  // Determine which style to apply
  const styleKey: HeadingVariant =
    // If styledAs is provided, use it
    styledAs ??
    // If `styledAs` is not provided, use `Component` only if it's not "p" or "span"
    (Component !== "p" && Component !== "span" ? Component : "h2");

  // React.ElementType allows handling dynamic components with their attributes
  const Tag = Component as keyof JSX.IntrinsicElements;

  return (
    <Tag className={cn("", variantStyles[styleKey], className)}>{children}</Tag>
  );
};

export { Heading, variantStyles };
