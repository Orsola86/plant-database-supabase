import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Heading } from "../components/atoms/Heading/Heading";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/protected");
  }

  return (
    <>
      <main className="flex flex-1 flex-col gap-6 px-4">
        <Heading as="h1">
          Plant Database. Effettua il login per accedere all`area riservata
        </Heading>
      </main>
    </>
  );
}
