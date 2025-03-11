import { FormMessage, Message } from "@/components/atoms/form-message";
import { Input } from "@/components/atoms/inputs/input";
import { Label } from "@/components/atoms/label";
import { SubmitButton } from "@/components/atoms/submit-button";
import { resetPasswordAction } from "@/app/actions";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        Reset password
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
