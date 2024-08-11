import Navbar from "@/components/navigations/navbar";
import { fetchTestimonyById } from "@/lib/testimonials";
import { Testimony } from "@/types";
import { Container, Text, Image } from "@chakra-ui/react";

export default async function Page(context: { params: { id: string } }) {
  const { id } = context.params;
  const testimony: Testimony = await fetchTestimonyById(id);

  return (
    <main>
      <Navbar />

      <div className="mt-24">
        <div className="flex w-8/12 mx-auto gap-8">
          <div>
            {testimony.image ? (
              <Image />
            ) : (
              <Container
                fontWeight="bold"
                w={48}
                h={48}
                rounded="lg"
                textColor="white"
                bgColor="gray.500"
                className="flex justify-center items-center"
              >
                {testimony.testimoner_name
                  .split(" ")
                  .map((word: string, index: number) => {
                    if (index <= 2) {
                      return word.charAt(0);
                    }
                  })}
              </Container>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Text>{testimony.testimony}</Text>
            <Container marginTop={12} paddingInline={0} marginInline={0}>
              <Text>{testimony.testimoner_name}</Text>
              <Text fontWeight="bold">{testimony.now_studied_at}</Text>
            </Container>
          </div>
        </div>
      </div>
    </main>
  );
}
