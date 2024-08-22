import { auth } from "@/auth";

/** Components */
import SidebarWithHeader from "@/components/ui/navigations/sidebar";
import { Box } from "@chakra-ui/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarWithHeader user={session?.user} />
      <Box ml={{ base: 0, lg: 60 }} p="8">
        {children}
      </Box>
    </Box>
  );
}
