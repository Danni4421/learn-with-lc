"use client";

import { type LBB } from "@/types";
import { Image } from "@chakra-ui/react";
import { GoRocket } from "react-icons/go";

type HeroProps = {
  lbb: LBB;
  className?: string;
  hideActionButton?: boolean;
};

export default function Hero({
  lbb,
  className = "",
  hideActionButton = false,
  ...props
}: HeroProps) {
  if (!lbb) return <>bentar loading</>;

  return (
    <section {...props} className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
        <div className="flex flex-col gap-4">
          <h1
            className="text-5xl font-extrabold font-default"
            dangerouslySetInnerHTML={{
              __html: lbb.about,
            }}
          ></h1>
          <h4 className="text-2xl">{lbb.description}</h4>
          {!hideActionButton && (
            <div className="flex flex-col lg:flex-row gap-3 mt-5 lg:mt-20">
              <a
                href="#"
                className="bg-black hover:bg-black hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] shadow-solid px-8 py-4 text-white text-xl text-center rounded-2xl transition-transform transition-shadow duration-300 ease-in-out"
              >
                Mulai Sekarang
              </a>
              <a
                href="#"
                className="flex justify-center items-center gap-2 border border-black px-8 py-4 text-black text-xl hover:bg-black hover:text-white  hover:border-[#DBFF00] rounded-2xl transition-all duration-300 ease-in-out"
              >
                <GoRocket />
                Eksplorasi
              </a>
            </div>
          )}
        </div>
        <div className="hidden lg:flex justify-end">
          <Image
            src={lbb.image}
            className="w-[450px] lg:w-[580px]"
            alt="Lentera Cendekia Image"
          />
        </div>
      </div>
    </section>
  );
}
