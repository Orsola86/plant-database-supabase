import Hero from "@/src/components/hero";
import ConnectSupabaseSteps from "@/src/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/src/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/src/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex flex-1 flex-col gap-6 px-4">
        <h2 className="mb-4 text-xl font-medium">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
      </main>
    </>
  );
}
