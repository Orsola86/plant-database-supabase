import { redirect } from "next/navigation";
import { PAGES_PATH } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { Text } from "@/components/atoms/Text/Text";
import { Heading } from "../components/atoms/Heading/Heading";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect(PAGES_PATH.PROTECTED);
  }

  return (
    <>
      <main
        className="container relative flex h-full flex-1 flex-col items-center justify-center gap-6
          px-4"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sky-100/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-100/30 blur-3xl" />
        </div>

        <div className="default-grid">
          <div className="col-span-full flex flex-col justify-center lg:col-span-6 lg:col-start-4">
            <div
              className="flex flex-col items-center gap-6 rounded-2xl border border-input bg-white/90
                p-10 shadow-xl backdrop-blur-sm transition"
            >
              <Heading
                as="h1"
                styledAs="h2"
                className="text-center text-2xl font-bold text-gray-800"
              >
                Benvenuto!
              </Heading>

              <Text
                styledAs="body-md-regular"
                className="text-center text-gray-700"
              >
                Accedi all&apos;area riservata cliccando su{" "}
                <strong className="text-emerald-600">
                  &quot;Sign in&quot;
                </strong>{" "}
                in alto a destra.
              </Text>

              <Text
                styledAs="body-md-regular"
                className="text-center text-gray-700"
              >
                Non hai un account? Crea uno nuovo con{" "}
                <strong className="text-emerald-600">
                  &quot;Sign up&quot;
                </strong>
                .
              </Text>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
