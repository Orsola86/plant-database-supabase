import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Button } from "@/components/atoms/button";
import AddOrchidForm from "@/components/organisms/AddOrchidForm";

export default async function AddOrchidPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container py-16">
        <div className="default-grid">
          <div className="col-span-full mb-6 flex justify-between">
            <Link href="/">
              <Button
                variant="outline"
                type="button"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna alla collezione
              </Button>
            </Link>
          </div>
          <Heading
            as="h1"
            styledAs="h2"
            className="col-span-full mb-10 text-center font-serif text-green-800"
          >
            Aggiungi un`orchidea alla tua collezione
          </Heading>
          <div
            className="col-span-full overflow-hidden rounded-xl shadow-lg md:col-span-8 md:col-start-3
              lg:col-span-6 lg:col-start-4"
          >
            <AddOrchidForm />
          </div>
        </div>
      </div>
    </div>
  );
}
