import Image from "next/image";
import Link from "next/link";
import { PAGES_PATH } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/molecules/card";
import { Tables } from "@/types/database.types";
import plantPlaceholderImg from "../../../public/plant-7396967_1920.jpg";
import { Heading } from "../atoms/Heading/Heading";
import { Text } from "../atoms/Text/Text";

export type PlantCardProps = Tables<"plant-taxonomy">;

export function PlantCard({
  plant,
  className,
}: {
  plant: PlantCardProps;
  className?: string;
}) {
  return (
    <Link
      href={`${PAGES_PATH.PROTECTED}/${plant?.id}`}
      className={cn(
        "block transition-all duration-300 hover:scale-[1.02]",
        className
      )}
    >
      <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-xl">
        <div className="relative aspect-square w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 to-transparent" />
          <Image
            src={plant.image_url || plantPlaceholderImg.src}
            alt={plant?.species || ""}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Text
            as="span"
            styledAs="body-sm-regular"
            className="absolute left-3 top-3 z-20 rounded-full bg-white/80 px-4 py-1 backdrop-blur-sm"
          >
            {plant?.genus}
          </Text>
        </div>
        <CardContent className="bg-white p-5">
          <Heading as="h3" styledAs="h5">
            {plant?.species}
          </Heading>
          <Text
            as="span"
            styledAs="body-md-regular"
            className="mt-1 italic text-muted-foreground"
          >
            {plant?.family}
          </Text>
        </CardContent>
      </Card>
    </Link>
  );
}
