/** Components */
import { Box, Heading } from "@chakra-ui/react";
import StoreTestimonyForm from "@/app/(administrator)/testimonials/store/form";

export default async function StoreTestimonialPage() {
  return (
    <Box>
      <Heading fontSize=".9rem">Tambah Testimoni</Heading>

      <StoreTestimonyForm />
    </Box>
  );
}
