import Link from "next/link";
import { redirect } from "next/navigation";
import { PAGES_PATH } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text/Text";
import { FormMessage, type Message } from "@/components/atoms/form-message";
import { FormInput } from "@/components/atoms/inputs/FormInput";
import { SubmitButton } from "@/components/atoms/submit-button";
import { signInAction } from "@/app/actions";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect(PAGES_PATH.PROTECTED);
  }

  return (
    <form className="flex flex-1 flex-col">
      <Heading as="h1">Sign in</Heading>
      <Text styledAs="body-md-regular">
        Don`t have an account?{" "}
        <Link className="font-medium text-foreground underline" href="/sign-up">
          Sign up
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
          type="password"
          placeholder="Your password"
          required
          label="Password"
          helpLink={{
            text: "Forgot Password?",
            href: "/forgot-password",
          }}
        />

        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
