import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Button } from "@/components/atoms/button";
import AddOrchidForm from "@/components/organisms/AddOrchidForm";

export default async function AddOrchidPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="container py-16">
      <div className="default-grid">
        <div className="col-span-full flex justify-between">
          <Link href="/">
            <Button
              variant="outline"
              type="button"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna alla collezione
            </Button>
          </Link>
        </div>
        <Heading as="h1" styledAs="h2" className="col-span-full mb-8">
          Aggiungi un`orchidea alla tua collezione
        </Heading>
        <div className="col-span-full md:col-span-6 md:col-start-4">
          <AddOrchidForm />
        </div>
      </div>
    </div>
  );
}
