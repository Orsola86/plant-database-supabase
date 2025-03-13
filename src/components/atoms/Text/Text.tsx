import type React from "react";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Tipi semplificati per le varianti di testo
export type TextSize = "lg" | "md" | "sm" | "xs";
export type TextWeight = "regular" | "medium" | "bold";
export type TextStyle = "body" | "overline" | "caption";

// Tipo per le varianti di testo
export type TextVariant = `${TextStyle}-${TextSize}-${TextWeight}`;

export type TextOwnProps<E extends ElementType> = {
  children?: ReactNode;
  as?: E;
  styledAs?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  style?: TextStyle;
};

export type TextProps<E extends ElementType> = TextOwnProps<E> &
  Omit<ComponentProps<E>, keyof TextOwnProps<E>>;

// Mappa delle classi per ogni dimensione
const sizeClasses: Record<TextSize, string> = {
  lg: "text-[1.375rem] md:text-[1.5rem] lg:text-[1.625rem]",
  md: "text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem]",
  sm: "text-[1rem] md:text-[1.0625rem] lg:text-[1.125rem]",
  xs: "text-[0.875rem] md:text-[0.9375rem] lg:text-[1rem]",
};

// Mappa delle classi per ogni peso
const weightClasses: Record<TextWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

// Mappa delle classi per ogni stile
const styleClasses: Record<TextStyle, string> = {
  body: "font-body",
  overline: "font-body uppercase tracking-wider",
  caption: "font-body text-muted-foreground",
};

// Componente Text semplificato
const Text = <E extends React.ElementType = "p">({
  as,
  styledAs,
  size = "md",
  weight = "regular",
  style = "body",
  className,
  children,
  ...rest
}: TextProps<E>) => {
  // Se styledAs è fornito, estraiamo i valori da esso
  let finalSize = size;
  let finalWeight = weight;
  let finalStyle = style;

  if (styledAs) {
    const [styleValue, sizeValue, weightValue] = styledAs.split("-") as [
      TextStyle,
      TextSize,
      TextWeight,
    ];
    finalStyle = styleValue;
    finalSize = sizeValue;
    finalWeight = weightValue;
  }

  const Tag = as || "p";

  return (
    <Tag
      className={cn(
        sizeClasses[finalSize],
        weightClasses[finalWeight],
        styleClasses[finalStyle],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export { Text };
