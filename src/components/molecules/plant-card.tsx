import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/molecules/card";
import { Tables } from "@/types/database.types";
import plantPlaceholderImg from "../../../public/plant-7396967_1920.jpg";

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
      href={`/protected/${plant?.id}`}
      className={cn(
        "block transition-all duration-300 hover:scale-105",
        className
      )}
    >
      <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-xl">
        <div className="relative aspect-square w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 to-transparent" />
          <Image
            src={plantPlaceholderImg.src}
            alt={plant?.species || ""}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className="absolute left-3 top-3 z-20 rounded-full bg-white/80 px-2 py-1 text-xs
              backdrop-blur-sm"
          >
            {plant?.genus}
          </div>
        </div>
        <CardContent className="bg-white p-5">
          <h3 className="text-lg font-medium">{plant?.species}</h3>
          <p className="mt-1 font-serif text-sm italic text-muted-foreground">
            {plant?.family}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
