import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Button } from "@/components/atoms/button";
import { PlantCard } from "@/components/molecules/plant-card";
import Hero from "@/components/organisms/hero";
import { getCollections } from "@/app/orchid-action/orchidActions";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const orchids = await getCollections();

  return (
    <>
      <Hero />
      <div className="container py-16">
        <div className="mb-8 flex flex-col-reverse gap-4 md:flex-row">
          <Heading as="h2">La tua collezione</Heading>
          <Link href="/protected/add-orchid" className="ml-auto">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Aggiungi alla collezione
            </Button>
          </Link>
        </div>
        <div className="default-grid">
          {orchids?.map((orchid) => (
            <PlantCard
              className="col-span-full md:col-span-6 lg:col-span-4"
              plant={orchid}
              key={orchid.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
