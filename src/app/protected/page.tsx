import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PlusCircle } from "lucide-react";
import { PAGES_PATH } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Button } from "@/components/atoms/button";
import Search from "@/components/atoms/inputs/search";
import Filters from "@/components/molecules/filters";
import Hero from "@/components/organisms/Hero";
import PlantCollection from "@/components/organisms/PlantCollection/PlantCollection";
import PlantCollectionSkeleton from "@/components/organisms/PlantCollection/PlantCollectionSkeleton";

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    family?: string;
    genus?: string;
  }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const {
    query = "",
    family = "",
    genus = "",
    page = "1",
  } = (await searchParams) || {};
  const currentPage = Number(page) || 1;

  // Fetch unique families and genera for filters
  const { data: familiesData } = await supabase
    .from("plant-taxonomy")
    .select("family")
    .eq("user_id", user.id)
    .not("family", "is", null);

  const { data: generaData } = await supabase
    .from("plant-taxonomy")
    .select("genus")
    .eq("user_id", user.id)
    .not("genus", "is", null);

  const families = [...new Set(familiesData?.map((item) => item.family))];
  const genera = [...new Set(generaData?.map((item) => item.genus))];

  return (
    <>
      <Hero />
      <div className="container py-16">
        <div className="mb-24">
          <Search placeholder="Cerca nella collezione..." />
          <div className="mt-4">
            <Filters families={families} genera={genera} />
          </div>
        </div>
        <div className="mb-16 flex flex-col-reverse gap-4 md:flex-row">
          <Heading as="h2">La tua collezione</Heading>
          <Link href={PAGES_PATH.PROTECTED_ADD_ORCHID} className="ml-auto">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Aggiungi alla collezione
            </Button>
          </Link>
        </div>

        <Suspense fallback={<PlantCollectionSkeleton />}>
          <PlantCollection
            query={query}
            family={family}
            genus={genus}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </>
  );
}
