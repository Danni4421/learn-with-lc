"use client";

/** Components */
import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";

/** Types */
import { type Program } from "@/types";

type ProgramsProps = {
  programs: Program[];
  className?: string;
};

export function Programs({
  programs,
  className = "",
  ...props
}: ProgramsProps) {
  return (
    <section {...props} id="programs" className={className}>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {programs?.map((program) => (
          <Card className="max-w-sm mx-auto" key={program.id}>
            <CardBody>
              <Image src={program.image} alt={program.name} borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">{program.name}</Heading>
                <Text>{program.description}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
