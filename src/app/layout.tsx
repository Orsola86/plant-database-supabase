import type { Metadata } from "next";
import { Montserrat as montserratGoogleFonts } from "next/font/google";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/molecules/env-var-warning";
import HeaderAuth from "@/components/molecules/header-auth";
import "@/assets/styles/globals.css";

export const metadata: Metadata = {
  title: "Plant Database",
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
      <body className="h-screen bg-background text-foreground">
        <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
          <div className="flex w-full max-w-5xl items-center justify-end p-3 px-5 text-sm">
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
