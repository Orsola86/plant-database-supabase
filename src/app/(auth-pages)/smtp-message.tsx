import Link from "next/link";
import { ArrowUpRight, InfoIcon } from "lucide-react";
import { Text } from "@/components/atoms/Text/Text";

export function SmtpMessage() {
  return (
    <div className="flex gap-4 rounded-md border bg-muted/50 px-5 py-3">
      <InfoIcon size={16} className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <Text as="small" styledAs="body-xs-regular">
          <strong> Note:</strong> Emails are rate limited. Enable Custom SMTP to
          increase the rate limit.
        </Text>
        <div>
          <Link
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            className="flex items-center gap-1 text-[1.2rem] text-primary/50 hover:text-primary"
          >
            Learn more <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
