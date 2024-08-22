/** Components */
import { Box, Heading } from "@chakra-ui/react";
import StoreQuestionForm from "@/app/(administrator)/faqs/store/form";

export default async function StoreTestimonialPage() {
  return (
    <Box>
      <Heading fontSize=".9rem">Tambah Testimoni</Heading>

      <StoreQuestionForm />
    </Box>
  );
}
