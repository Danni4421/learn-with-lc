import clsx from "clsx";

/** Components */
import { Image } from "@chakra-ui/react";

/** Types */
import { type Strength } from "@/types";

type StrengthProps = {
  strengths: Strength[];
  className?: string;
};

export function Strengths({
  strengths,
  className = "",
  ...props
}: StrengthProps) {
  return (
    <section {...props} id="strengths" className={className}>
      <div className="flex flex-col gap-20 mt-12 md:mt-0">
        {strengths?.map((strength, index) => (
          <div
            className={clsx(
              "flex flex-col-reverse justify-center items-center gap-20",
              index % 2 != 0 ? "md:flex-row-reverse text-end" : "md:flex-row"
            )}
            key={index}
          >
            <Image
              src={strength.image}
              alt="Image of Strength"
              className="lg:w-[330px] w-[300px]"
            />

            <div
              className={clsx(
                "flex flex-col w-full md:w-1/2 items-center",
                index % 2 != 0 ?? "flex-row-reverse text-end"
              )}
            >
              <h2 className="text-2xl font-bold mb-5">{strength.title}</h2>
              <h4 className="text-lg">{strength.description}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
