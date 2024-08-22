"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Question } from "@/types";

import { Image } from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";

interface FaqsProps {
  faqs: Question[];
  className?: string;
}

interface AccordionComponentProps {
  title: string;
  content: string;
}

export default function Faqs({ faqs, className = "", ...props }: FaqsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const memoizedAccordionItems = useMemo(() => {
    return faqs.map((faq) => (
      <AccordionComponent
        key={faq.id}
        title={faq.question}
        content={faq.answer}
      />
    ));
  }, [faqs]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      {...props}
      className={clsx(
        "flex flex-col-reverse lg:flex-row items-center gap-8",
        className
      )}
      id="faqs"
    >
      <Image src="images/faq.svg" alt="Image for frequently asked question" />
      <div className="w-[85vw] md:w-[70vw] lg:w-[50vw]">
        <div className="mx-auto px-5 bg-white min-h-sceen">
          <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
            {faqs.map((faq, index) => (
              <AccordionComponent
                key={index}
                title={faq.question}
                content={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const AccordionComponent = ({
  title,
  content,
}: AccordionComponentProps) => {
  return (
    <div className="py-5">
      <details className="group">
        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
          <span>{title}</span>
          <span className="transition group-open:rotate-180">
            <FaAngleDown />
          </span>
        </summary>
        <p
          className="text-neutral-600 mt-3 group-open:animate-fadeIn"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </details>
    </div>
  );
};
