import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { FormMessage } from "@/components/atoms/inputs/FormMessage";
import { Input, type InputProps } from "@/components/atoms/inputs/input";
import { Label } from "@/components/atoms/label";

interface FormInputProps extends Omit<InputProps, "icon"> {
  type?: InputProps["type"];
  label: string;
  name: string;
  errorMessage?: string[];
  helpText?: string;
  helpLink?: {
    text: string;
    href: string;
  };
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

export const FormInput = ({
  label,
  name,
  errorMessage,
  helpText,
  helpLink,
  icon,
  iconPosition = "left",
  ...rest
}: FormInputProps) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={name}>{label}</Label>
        {helpLink && (
          <Link className="text-[1.2rem] hover:underline" href={helpLink.href}>
            {helpLink.text}
          </Link>
        )}
      </div>
      {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
      <Input
        {...rest}
        id={name}
        name={name}
        aria-describedby={`${name}-error`}
        icon={icon}
        iconPosition={iconPosition}
      />
      <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
        {!!errorMessage?.length &&
          errorMessage.map((error: string) => (
            <FormMessage key={error} error={error} />
          ))}
      </div>
    </div>
  );
};
