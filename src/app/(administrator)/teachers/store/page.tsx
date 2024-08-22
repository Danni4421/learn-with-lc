/** Components */
import { Box, Heading } from "@chakra-ui/react";
import EditTeacherForm from "@/app/(administrator)/teachers/store/form";

export default async function StoreTeacherPage() {
  return (
    <Box>
      <Heading fontSize=".9rem">Ubah Pengajar</Heading>

      <EditTeacherForm />
    </Box>
  );
}
