import clsx from "clsx";
import { Question } from "@/types";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Image,
  Text,
} from "@chakra-ui/react";

type FaqsProps = {
  faqs: Question[];
  className?: string;
};

export default function Faqs({ faqs, className = "", ...props }: FaqsProps) {
  return (
    <div
      {...props}
      className={clsx("flex items-center gap-8", className)}
      id="faqs"
    >
      <Image src="images/faq.svg" />
      <div className="border border-gray-200 rounded-lg">
        <Accordion allowToggle minW="650px" gap={6} rounded="lg">
          {faqs.map((faq) => (
            <AccordionItem maxW="full" key={faq.id}>
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                bg="white"
              >
                <Text fontSize="md">{faq.question}</Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} maxW="700px" bg="zinc.500">
                <Text
                  color="gray.600"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                ></Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
