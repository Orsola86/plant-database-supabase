import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/atoms/button";
import EditOrchidForm from "@/components/organisms/EditOrchidForm";
import { getPlantById } from "@/app/orchid-action/orchidActions";

interface EditOrchidPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOrchidPage({ params }: EditOrchidPageProps) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const plant = await getPlantById(id);

  if (!plant) {
    return redirect("/protected");
  }

  return (
    <div className="container py-16">
      <div className="default-grid">
        <div className="mb-8 flex flex-col-reverse items-center gap-4 md:flex-row">
          <Link href={`/protected/${id}`} className="ml-auto">
            <Button
              variant="outline"
              type="button"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna ai dettagli
            </Button>
          </Link>
        </div>
        <h1 className="col-span-full mb-8 text-2xl font-bold">
          Modifica orchidea: {plant.species}
        </h1>
        <div className="col-span-full md:col-span-6 md:col-start-4">
          <EditOrchidForm {...plant} />
        </div>
      </div>
    </div>
  );
}
