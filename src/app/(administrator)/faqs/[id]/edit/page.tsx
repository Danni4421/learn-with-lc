/** Components */
import { Box, Heading } from "@chakra-ui/react";
import EditQuestionForm from "@/app/(administrator)/faqs/[id]/edit/form";

/** Libraries */
import { fetchQuestionById } from "@/lib/faqs";

export default async function EditQuestionPage(context: {
  params: { id: string };
}) {
  const { id } = context.params;

  const question = await fetchQuestionById(id);
  return (
    <Box>
      <Heading fontSize=".9rem">Ubah Testimoni</Heading>

      <EditQuestionForm question={question} />
    </Box>
  );
}
