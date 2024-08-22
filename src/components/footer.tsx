"use client";

import clsx from "clsx";
import { ReactNode } from "react";

/** Components */
import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import ApplicationLogo from "@/components/logo";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";

/** Types */
import { Contact } from "@/types";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

interface NavigationItem {
  navItem: string;
  redirectTo: string;
}

interface PopularCourse {
  courseName: string;
  redirectTo: string;
}

interface FooterProps {
  className?: string;
  contacts: Contact;
  navigations: NavigationItem[];
  popularCourses: PopularCourse[];
}

export default function Footer({
  className = "",
  contacts,
  navigations,
  popularCourses,
}: FooterProps) {
  return (
    <Box className={clsx("min-w-full", className)}>
      <Container as={Stack} py={10} className="min-w-[80%]">
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <ApplicationLogo />
            </Box>
            <Text fontSize={12}>
              © 2024 LBB Lentera Cendekia. All rights reserved
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton label={"Whatsapp"} href={contacts.whatsapp}>
                <FaWhatsapp />
              </SocialButton>
              <SocialButton label={"YouTube"} href={contacts.instagram}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={"Instagram"} href={contacts.instagram}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            {navigations.map((navigation, index) => (
              <Box
                as="a"
                href={navigation.redirectTo}
                fontSize={12}
                key={index}
              >
                {navigation.navItem}
              </Box>
            ))}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Popular Course</ListHeader>
            {popularCourses.map((course, index) => (
              <Box as="a" href={course.redirectTo} fontSize={12} key={index}>
                {course.courseName}
              </Box>
            ))}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                _placeholder={{ fontSize: 12 }}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
              <IconButton
                bg={useColorModeValue("yellow.400", "yellow.800")}
                color={useColorModeValue("white", "gray.800")}
                _hover={{
                  bg: "yellow.600",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
