import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon: Icon,
      iconPosition = "left",

      ...props
    },
    ref
  ) => {
    return (
      <div className="group relative w-full">
        <input
          type={type}
          className={cn(
            `flex h-16 w-full rounded-md border border-input bg-background px-5 py-3
            text-[1.4rem] ring-offset-background file:border-0 file:bg-transparent
            file:text-[1.4rem] file:font-medium placeholder:text-muted-foreground
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
            {
              "pl-12": Icon && iconPosition === "left",
              "pr-12": Icon && iconPosition === "right",
            },
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Icon */}
        {Icon && (
          <div
            className={cn(
              `pointer-events-none absolute inset-y-0 flex items-center justify-center
              text-muted-foreground`,
              {
                "left-0 ml-4": iconPosition === "left",
                "right-0 mr-4": iconPosition === "right",
              }
            )}
          >
            <Icon
              className="h-5 w-5 transition-colors duration-200 group-focus-within:text-foreground
                group-hover:text-foreground"
            />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
