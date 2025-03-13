import Link from "next/link";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text/Text";
import { FormMessage, Message } from "@/components/atoms/form-message";
import { FormInput } from "@/components/atoms/inputs/FormInput";
import { SubmitButton } from "@/components/atoms/submit-button";
import { signUpAction } from "@/app/actions";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col">
        <Heading as="h1">Sign up</Heading>

        <Text styledAs="body-md-regular">
          Already have an account?{" "}
          <Link className="underline" href="/sign-in">
            Sign in
          </Link>
        </Text>
        <div className="mt-12 flex flex-col gap-3 [&>input]:mb-5">
          <FormInput
            name="email"
            placeholder="you@example.com"
            required
            label="Email"
          />
          <FormInput
            name="password"
            placeholder="Your password"
            required
            label="Password"
            type="password"
          />

          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
