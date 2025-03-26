import { Text } from "@/components/atoms/Text/Text";
import { PlantCard } from "@/components/molecules/PlantCard";
import Pagination from "@/components/molecules/pagination";
import { getUserPlantsWithCache } from "@/app/orchid-action/orchidActions";

export default async function PlantCollection({
  query,
  family,
  genus,
  currentPage,
}: {
  query: string;
  family: string;
  genus: string;
  currentPage: number;
}) {
  const { plants, totalPages } =
    (await getUserPlantsWithCache(query, family, genus, currentPage)) || {};

  if (plants?.length === 0) {
    return (
      <div className="py-8 text-center">
        <Text styledAs="body-md-bold" className="text-gray-600">
          Nessuna pianta trovata. Prova a modificare i filtri o aggiungine di
          nuove.
        </Text>
      </div>
    );
  }

  return (
    <>
      <div className="default-grid">
        {plants?.map((plant) => (
          <PlantCard
            className="col-span-full md:col-span-4 lg:col-span-3"
            plant={plant}
            key={plant.id}
          />
        ))}
      </div>

      <div className="mt-24 flex justify-center">
        <Pagination totalPages={totalPages || 0} />
      </div>
    </>
  );
}
