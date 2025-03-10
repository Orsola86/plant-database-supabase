// Types of headings that can be used for the "as" element
export type HeadingType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

// Applicable style variants
export type HeadingVariant = Exclude<HeadingType, "p" | "span">;

// Typing for the Heading component
// If `as` is "p" or "span", `styledAs` is required
export type HeadingProps<T extends HeadingType> = {
  as: T;
  className?: string;
  children?: React.ReactNode;
} & (T extends "p" | "span"
  ? { styledAs: HeadingVariant } // Required if "p" or "span"
  : { styledAs?: HeadingVariant }); // Optional for other tags
