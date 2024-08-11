import { Program } from "@/types";
import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";

type ProgramsProps = {
  programs: Program[];
  className?: string;
};

export default function Programs({
  programs,
  className = "",
  ...props
}: ProgramsProps) {
  return (
    <section {...props} id="programs" className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {programs?.map((program) => (
          <Card maxW="sm" key={program.id}>
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
