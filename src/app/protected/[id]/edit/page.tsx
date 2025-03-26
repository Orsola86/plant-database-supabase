import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PAGES_PATH } from "@/utils/constants";
import { Button } from "@/components/atoms/button";
import EditOrchidForm from "@/components/organisms/EditOrchidForm";
import { getPlantByIdWithCache } from "@/app/orchid-action/orchidActions";

interface EditOrchidPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOrchidPage({ params }: EditOrchidPageProps) {
  const { id } = await params;

  const plant = await getPlantByIdWithCache(id);

  if (!plant) {
    return redirect(PAGES_PATH.PROTECTED);
  }

  return (
    <div className="container py-16">
      <div className="default-grid">
        <div className="mb-8 flex flex-col-reverse items-center gap-4 md:flex-row">
          <Link href={`${PAGES_PATH.PROTECTED}/${id}`} className="ml-auto">
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
          <EditOrchidForm orchid={plant} />
        </div>
      </div>
    </div>
  );
}
