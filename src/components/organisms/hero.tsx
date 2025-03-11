import Image from "next/image";
import { Heading } from "@/components/atoms/Heading/Heading";
import HeroImg from "../../../public/hero-img.png";

export default function Hero() {
  return (
    <section className="w-full bg-gray-950 py-6 md:py-8">
      <div className="container">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <Heading as="h1" className="w-full font-bold text-white md:w-1/2">
            Plants Care Database
          </Heading>

          <div className="flex w-full justify-end md:w-1/2">
            <div className="relative aspect-[5/4] w-full max-w-md md:h-[220px]">
              <Image
                src={HeroImg.src}
                alt="Illustrazione artistica di due vasi: uno blu e uno verde con forme decorative simili a soffioni"
                fill
                className="object-contain object-right"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
