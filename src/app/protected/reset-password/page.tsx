import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text/Text";
import { FormMessage, Message } from "@/components/atoms/form-message";
import { FormInput } from "@/components/atoms/inputs/FormInput";
import { SubmitButton } from "@/components/atoms/submit-button";
import { resetPasswordAction } from "@/app/actions";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-1 flex-col gap-3 text-foreground [&>input]:mb-5">
      <Heading as="h1">Reset Password</Heading>
      <Text styledAs="body-md-regular">
        Please enter your new password below.
      </Text>
      <div className="mt-12 flex flex-col gap-3 [&>input]:mb-5">
        <FormInput
          name="password"
          type="password"
          placeholder="New password"
          required
          label="Password"
        />
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          required
          label="Confirm password"
        />
      </div>

      <SubmitButton formAction={resetPasswordAction}>
        Reset password
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
