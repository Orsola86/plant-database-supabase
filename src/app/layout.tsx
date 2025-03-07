import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Montserrat as montserratGoogleFonts } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import DeployButton from "@/src/components/deploy-button";
import { EnvVarWarning } from "@/src/components/env-var-warning";
import HeaderAuth from "@/src/components/header-auth";
import { hasEnvVars } from "@/src/utils/supabase/check-env-vars";

export const metadata: Metadata = {
  title: {
    default: "OrchiTech",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center">
            <div className="flex w-full flex-1 flex-col items-center gap-20">
              <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
                <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
                  <div className="flex items-center gap-5 font-semibold">
                    <Link href={"/"}>Next.js Supabase Starter</Link>
                    <div className="flex items-center gap-2">
                      <DeployButton />
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex max-w-5xl flex-col gap-20 p-5">
                {children}
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
