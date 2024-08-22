/** Components */
import { Box, Heading } from "@chakra-ui/react";
import EditTestimonyForm from "@/app/(administrator)/testimonials/[id]/edit/form";

/** Libraries */
import { fetchTestimonyById } from "@/lib/testimonials";

export default async function EditTestimonialPage(context: {
  params: { id: string };
}) {
  const { id } = context.params;

  const testimony = await fetchTestimonyById(id);

  return (
    <Box>
      <Heading fontSize=".9rem">Edit Testimoni</Heading>

      <EditTestimonyForm testimony={testimony} />
    </Box>
  );
}
