import type { Metadata } from "next";
import { Montserrat as montserratGoogleFonts } from "next/font/google";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/molecules/env-var-warning";
import HeaderAuth from "@/components/molecules/header-auth";
import "@/assets/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Plant Database",
    template: "",
  },
  description: "",
  icons: {
    icon: "/favicon.ico",
  },

  //  "TODO: remove before deploying to production"
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const montserrat = montserratGoogleFonts({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <div className="flex w-full flex-1 flex-col items-center gap-20">
          <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
            <div className="flex w-full max-w-5xl items-center justify-end p-3 px-5 text-sm">
              {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
            </div>
          </nav>
          <div className="flex max-w-5xl flex-col gap-20 p-5">{children}</div>
        </div>
      </body>
    </html>
  );
}
