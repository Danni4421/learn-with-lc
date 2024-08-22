/** Components */
import { Box, Heading } from "@chakra-ui/react";
import EditProgramForm from "@/app/(administrator)/programs/[id]/edit/form";
import { fetchProgramById } from "@/lib/programs";

export default async function EditProgramPage(context: {
  params: { id: string };
}) {
  const { id } = context.params;

  const program = await fetchProgramById(id);

  return (
    <Box>
      <Heading fontSize=".9rem">Tambah Program</Heading>

      <EditProgramForm program={program} />
    </Box>
  );
}
