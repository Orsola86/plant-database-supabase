import Link from "next/link";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text/Text";
import { FormMessage, type Message } from "@/components/atoms/form-message";
import { FormInput } from "@/components/atoms/inputs/FormInput";
import { SubmitButton } from "@/components/atoms/submit-button";
import { forgotPasswordAction } from "@/app/actions";
import { SmtpMessage } from "../smtp-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex flex-1 flex-col gap-3 text-foreground [&>input]:mb-5">
        <div>
          <Heading as="h1">Reset Password</Heading>
          <Text styledAs="body-md-regular">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </Text>
        </div>
        <div className="mt-12 flex flex-col gap-3 [&>input]:mb-5">
          <FormInput
            name="email"
            placeholder="you@example.com"
            required
            label="Email"
          />

          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
