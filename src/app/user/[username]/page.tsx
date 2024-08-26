/** Components */
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import Navbar from "@/components/ui/navigations/navbar";
import Footer from "@/components/footer";

/** Libraries */
import { getUserByUsername } from "@/lib/users";
import { auth } from "@/auth";

/** Utilities */
import content from "@/utils/content.json";

export default async function UserProfile(context: {
  params: { username: string };
}) {
  const session = await auth();
  const { username } = context.params;

  const user = await getUserByUsername(username);

  if (!user) {
    return "User not found";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
      <Navbar user={session?.user} />

      {/* Profile Image Banner */}
      <Flex mt={24} flexDirection="column">
        <Box
          w="65vw"
          h="200px"
          mx="auto"
          bgColor="#000000"
          rounded="xl"
          className="relative"
        >
          <svg
            width="100%"
            viewBox="0 0 1138 200"
            fill="none"
            className="absolute bottom-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 200L18.8241 179.378C37.6481 159.52 76.1519 119.039 113.8 83.1418C151.448 48.0079 189.952 17.4567 227.6 27.3859C265.248 37.315 303.752 88.4882 341.4 98.4173C379.048 108.346 417.552 77.7953 455.2 83.1418C492.848 88.4882 531.352 128.969 569 113.693C606.648 98.4173 645.152 27.3859 682.8 17.4567C720.448 6.76382 758.952 57.937 796.6 73.2126C834.248 88.4882 872.752 67.8662 910.4 67.8662C948.048 67.8662 986.552 88.4882 1024.2 88.4882C1061.85 88.4882 1100.35 67.8662 1119.18 57.937L1138 48.0079V200H1119.18C1100.35 200 1061.85 200 1024.2 200C986.552 200 948.048 200 910.4 200C872.752 200 834.248 200 796.6 200C758.952 200 720.448 200 682.8 200C645.152 200 606.648 200 569 200C531.352 200 492.848 200 455.2 200C417.552 200 379.048 200 341.4 200C303.752 200 265.248 200 227.6 200C189.952 200 151.448 200 113.8 200C76.1519 200 37.6481 200 18.8241 200H0Z"
              fill="#DBFF00"
            />
          </svg>
          <Box
            w="44"
            h="44"
            rounded="full"
            bgColor="gray"
            overflow="hidden"
            className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          >
            <Image
              src={user.image}
              w="full"
              h="full"
              className="object-cover"
            />
          </Box>
        </Box>

        <Box mt="20" mx="auto" textAlign="center">
          <Text as="h2" fontWeight="700" fontSize="xl">
            {user?.firstname} {user?.lastname}
          </Text>
          <Text fontSize=".8rem">
            {new Date(user?.created_at).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </Box>
      </Flex>

      <Footer
        className="mt-24 bg-inherit"
        contacts={content.footer.contacts}
        navigations={content.footer.navigations}
        popularCourses={content.footer.popularCourses}
      />
    </main>
  );
}
