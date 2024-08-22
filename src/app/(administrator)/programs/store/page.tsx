/** Components */
import { Box, Heading } from "@chakra-ui/react";
import StoreProgramForm from "@/app/(administrator)/programs/store/form";

export default async function StoreProgramPage() {
  return (
    <Box>
      <Heading fontSize=".9rem">Tambah Program</Heading>

      <StoreProgramForm />
    </Box>
  );
}
