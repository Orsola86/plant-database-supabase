import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/atoms/button";
import { getPlantById } from "@/app/orchid-action/orchidActions";
import plantPlaceholderImg from "../../../../public/plant-7396967_1920.jpg";

// // Informazioni aggiuntive per ogni orchidea
// const plantDetails = {
//   "2ff41d41-0726-4ae0-95b7-d856b4a02e67": {
//     description:
//       "La Phalaenopsis gibbosa è una specie di orchidea originaria del Sud-est asiatico. È caratterizzata da fiori piccoli ma numerosi, con petali e sepali di colore bianco-verdastro e un labello viola-rosso. Il nome 'gibbosa' deriva dalla protuberanza presente sul labello.",
//     care: {
//       light: "Luce indiretta brillante, evitare il sole diretto",
//       water:
//         "Annaffiare quando il substrato è quasi asciutto, circa ogni 7-10 giorni",
//       temperature: "18-29°C, ideale 22°C",
//       humidity: "60-80%",
//     },
//     origin: "Sud-est asiatico (Vietnam, Thailandia)",
//     bloomingSeason: "Primavera-Estate",
//     difficulty: "Media",
//   },
//   "3ff41d41-0726-4ae0-95b7-d856b4a02e68": {
//     description:
//       "Il Dendrobium nobile è una delle orchidee più popolari del genere Dendrobium. Produce fiori profumati in vari colori, dal bianco al viola, spesso con un centro scuro. I fiori crescono lungo gli pseudobulbi e possono durare diverse settimane.",
//     care: {
//       light: "Luce brillante ma filtrata, alcune ore di sole mattutino",
//       water: "Abbondante durante la crescita, ridotta in inverno",
//       temperature: "12-24°C, periodo di riposo invernale a 10-13°C",
//       humidity: "50-70%",
//     },
//     origin: "Asia (Himalaya, Cina, India)",
//     bloomingSeason: "Fine inverno-Primavera",
//     difficulty: "Media-Alta",
//   },
//   "4ff41d41-0726-4ae0-95b7-d856b4a02e69": {
//     description:
//       "La Cattleya labiata è considerata la 'regina delle orchidee' per i suoi fiori grandi e vistosi, spesso profumati. I fiori possono raggiungere i 20 cm di diametro, con colori che variano dal rosa al viola intenso, con un labello spesso più scuro e striato.",
//     care: {
//       light: "Luce intensa ma non diretta, tollera alcune ore di sole filtrato",
//       water: "Lasciare asciugare tra un'annaffiatura e l'altra",
//       temperature: "16-27°C, con escursione termica giorno-notte",
//       humidity: "50-70%",
//     },
//     origin: "Brasile",
//     bloomingSeason: "Autunno",
//     difficulty: "Media-Alta",
//   },
//   "5ff41d41-0726-4ae0-95b7-d856b4a02e70": {
//     description:
//       "La Vanda coerulea, nota come 'Orchidea Blu', è famosa per il suo raro colore blu-violaceo. È un'orchidea epifita con radici aeree e fiori grandi e vistosi che possono durare fino a 6 settimane.",
//     care: {
//       light: "Molta luce, incluso alcune ore di sole diretto filtrato",
//       water: "Frequente, immersione delle radici o nebulizzazione quotidiana",
//       temperature: "18-32°C, minima notturna 15°C",
//       humidity: "70-80%",
//     },
//     origin: "India, Myanmar, Thailandia",
//     bloomingSeason: "Estate-Autunno",
//     difficulty: "Alta",
//   },
// };

interface PlantDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlantDetailPage({
  params,
}: PlantDetailPageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const id = (await params).id || "";

  const plant = await getPlantById(id || "");

  // const details = plantDetails[plant?.id as keyof typeof plantDetails];
  const formattedDate = new Date(plant?.created_at || "").toLocaleDateString(
    "it-IT",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  if (!plant) {
    return <div className="container py-10">Orchidea non trovata</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container py-12">
        <Link href="/" className="mb-8 inline-block">
          <Button variant="outline" size="sm" className="group">
            <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
            Torna alla collezione
          </Button>
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={plant?.image_url || plantPlaceholderImg.src}
              alt={plant?.species || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm text-muted-foreground">
                Aggiunta il {formattedDate}
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold">
                {plant?.species}
              </h1>
              <p className="mt-1 font-serif text-xl italic text-muted-foreground">
                {plant?.family}
              </p>
            </div>

            {/* <div className="prose prose-green max-w-none">
              <p>{details?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <CareCard
                icon={{ color: "green", name: "Sun" }}
                title="Luce"
                description={details.care?.light}
              />

              <CareCard
                icon={{ color: "blue", name: "Droplets" }}
                title="Acqua"
                description={details.care?.water}
              />
              <CareCard
                icon={{ color: "red", name: "Thermometer" }}
                title="Temperatura"
                description={details.care?.temperature}
              />
              <CareCard
                icon={{ color: "purple", name: "Wind" }}
                title="Umidità"
                description={details.care?.humidity}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <p className="text-sm font-medium">Origine</p>
                <p className="text-sm text-muted-foreground">
                  {details?.origin}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Fioritura</p>
                <p className="text-sm text-muted-foreground">
                  {details?.bloomingSeason}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Difficoltà</p>
                <p className="text-sm text-muted-foreground">
                  {details?.difficulty}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
