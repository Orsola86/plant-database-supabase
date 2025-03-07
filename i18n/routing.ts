import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ["it"];
export const localePrefix = "as-needed";

export const routing = defineRouting({
  locales,
  defaultLocale: "it",
  localePrefix,
  pathnames: {},
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
