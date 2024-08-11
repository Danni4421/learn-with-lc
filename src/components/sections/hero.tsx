import { type LBB } from "@/types";
import { GoRocket } from "react-icons/go";

type HeroProps = {
  lbb: LBB;
  className?: string;
};

export default function Hero({ lbb, className = "", ...props }: HeroProps) {
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
          <div className="flex flex-col lg:flex-row gap-3 mt-5 lg:mt-20">
            <a
              href="#"
              className="bg-indigo-700 hover:bg-indigo-800 px-8 py-4 text-white text-xl text-center rounded-2xl"
            >
              Mulai Sekarang
            </a>
            <a
              href="#"
              className="flex justify-center items-center gap-2 border border-indigo-700 px-8 py-4 text-indigo-700 text-xl hover:bg-indigo-700 hover:text-white rounded-2xl transition-all"
            >
              <GoRocket />
              Eksplorasi
            </a>
          </div>
        </div>
        <div className="hidden lg:flex justify-end">
          <img src={lbb.image} className="w-[450px] lg:w-[580px]" />
        </div>
      </div>
    </section>
  );
}
