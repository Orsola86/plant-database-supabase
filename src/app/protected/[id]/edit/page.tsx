import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PAGES_PATH } from "@/utils/constants";
import { Heading } from "@/components/atoms/Heading/Heading";
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container py-16">
        <div className="default-grid">
          <div className="col-span-full mb-6 flex justify-between">
            <Link href={`${PAGES_PATH.PROTECTED}/${id}`}>
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
          <Heading
            as="h1"
            styledAs="h2"
            className="col-span-full mb-10 text-center font-serif text-green-800"
          >
            Modifica orchidea: {plant.species}
          </Heading>
          <div
            className="col-span-full overflow-hidden rounded-xl shadow-lg md:col-span-8 md:col-start-3
              lg:col-span-6 lg:col-start-4"
          >
            <EditOrchidForm orchid={plant} />
          </div>
        </div>
      </div>
    </div>
  );
}
