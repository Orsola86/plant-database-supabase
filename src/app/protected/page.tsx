import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
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
        <div className="default-grid">
          {!!orchids?.length &&
            orchids?.map((orchid) => (
              <PlantCard
                className="col-span-full md:col-span-6 lg:col-span-4"
                plant={orchid}
                key={orchid?.id}
              />
            ))}
        </div>
      </div>
    </>
  );
}
