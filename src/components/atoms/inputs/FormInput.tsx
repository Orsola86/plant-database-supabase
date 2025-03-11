import { FormMessage } from "@/components/atoms/inputs/FormMessage";
import { Input, InputProps } from "@/components/atoms/inputs/input";
import { Label } from "@/components/atoms/label";

interface FormInputProps extends InputProps {
  type?: InputProps["type"];
  label: string;
  name: string;
  errorMessage: string[];
}

export const FormInput = ({
  label,
  name,
  errorMessage,
  ...rest
}: FormInputProps) => {
  return (
    <div>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        {...rest}
        id={name}
        name={name}
        className="mt-1"
        aria-describedby={`${name}-error`}
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
