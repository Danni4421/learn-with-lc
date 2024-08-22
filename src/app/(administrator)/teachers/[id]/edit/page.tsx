/** Components */
import { Box, Heading } from "@chakra-ui/react";
import EditTeacherForm from "@/app/(administrator)/teachers/[id]/edit/form";

/** Libraries */
import { fetchTeacherById } from "@/lib/teachers";

export default async function EditTeacherPage(context: {
  params: { id: string };
}) {
  const { id } = context.params;

  const teacher = await fetchTeacherById(id);

  return (
    <Box>
      <Heading fontSize=".9rem">Ubah Pengajar</Heading>

      <EditTeacherForm teacher={teacher} />
    </Box>
  );
}
