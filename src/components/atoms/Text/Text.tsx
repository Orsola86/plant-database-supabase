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
  lg: "text-lg leading-7",
  md: "text-base leading-6",
  sm: "text-sm leading-5",
  xs: "text-xs leading-4",
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
