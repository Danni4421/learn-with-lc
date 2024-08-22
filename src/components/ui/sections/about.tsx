import clsx from "clsx";
import { type About } from "@/types";
import Heading from "@/components/heading";
import { Image } from "@chakra-ui/react";

type AboutProps = {
  abouts: About[];
  className?: string;
};

export default function About({
  abouts,
  className = "",
  ...props
}: AboutProps) {
  return (
    <section {...props} id="about_us" className={className}>
      {abouts?.map((about, index) => (
        <div
          className={clsx(
            "flex flex-col justify-center items-center mb-10 lg:gap-20",
            index % 2 != 0 ? "md:flex-row-reverse" : "md:flex-row",
          )}
          key={index}
        >
          <div className="order-2 lg:order-1">
            <Image
              src={about.image}
              alt="About Lentera Cendekia"
              className="w-[350px]"
            />
          </div>

          <div className="flex flex-col md:w-[800px] order-1 lg:order-2 justify-center">
            {index == 0 && (
              <Heading
                head="Tentang Kami"
                subhead="Belum Mengenal Kami?"
                id="about_us_heading"
                className="md:text-start md:mx-0"
              />
            )}
            <div
              className={clsx(
                "flex flex-col md:gap-5",
                index % 2 != 0
                  ? "text-start md:text-end"
                  : "text-end md:text-start",
              )}
            >
              {about.texts?.map((text, nestedIndex) => (
                <h4
                  className="text-lg"
                  key={nestedIndex}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></h4>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
