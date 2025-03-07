import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { forgotPasswordAction } from "@/src/app/actions";
import { FormMessage, Message } from "@/src/components/form-message";
import { SubmitButton } from "@/src/components/submit-button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form
        className="mx-auto flex w-full min-w-64 max-w-64 flex-1 flex-col gap-2 text-foreground
          [&>input]:mb-6"
      >
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
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
