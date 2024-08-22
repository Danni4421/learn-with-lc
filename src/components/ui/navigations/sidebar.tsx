"use client";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Collapse,
} from "@chakra-ui/react";
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiPackage,
} from "react-icons/fi";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { IconType } from "react-icons";
import { logout } from "@/actions/logout";
import { User } from "@/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface DropdownItemProps {
  name: string;
  href: string;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  href?: string | undefined;
  dropdown?: DropdownItemProps[];
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  href: string | undefined;
  active: boolean;
}

interface NavItemCollapseProps extends FlexProps {
  parenteses: {
    name: string;
    icon: IconType;
  };
  items: DropdownItemProps[];
  active: boolean;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
  user: User | undefined;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, href: "/dashboard" },
  {
    name: "Pages",
    icon: FiPackage,
    dropdown: [
      {
        name: "Landing Page",
        href: "/pages/landing-page",
      },
    ],
  },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", lg: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          LearnWith <span className="-ms-3 text-indigo-600">LC</span>
        </Text>
        <CloseButton display={{ base: "flex", lg: "none" }} onClick={onClose} />
      </Flex>
      <Flex flexDirection="column" rowGap={2} mt={4}>
        {LinkItems.map((link, index) =>
          link.dropdown ? (
            <NavItemCollapse
              key={index}
              parenteses={{ ...link }}
              items={link.dropdown}
              active={link.dropdown.some((item) => item.href === pathname)}
            ></NavItemCollapse>
          ) : (
            <NavItem
              href={link.href}
              key={link.name}
              icon={link.icon}
              active={pathname === link.href}
            >
              {link.name}
            </NavItem>
          )
        )}
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, href, children, active, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        px="4"
        py="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        className={clsx(
          "hover:bg-indigo-600 hover:text-white",
          active && "bg-indigo-600 text-white"
        )}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const NavItemCollapse = ({
  parenteses,
  items,
  active,
}: NavItemCollapseProps) => {
  const { icon, name } = parenteses;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        align="center"
        px="4"
        py="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        className={clsx(
          "hover:bg-indigo-600 hover:text-white",
          active && "bg-indigo-600 text-white"
        )}
        onClick={onToggle}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {name}
      </Flex>
      <Collapse in={isOpen} animateOpacity className="ms-4 flex justify-end">
        {items.map((item, index) => (
          <Flex
            key={index}
            align="center"
            px="4"
            py="2"
            mx="4"
            my="2"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            className={clsx("hover:bg-gray-300/15")}
            as="a"
            href={item.href}
            onClick={onToggle}
          >
            <Icon mr="4" fontSize="16" as={MdOutlineRadioButtonUnchecked} />
            {item.name}
          </Flex>
        ))}
      </Collapse>
    </Box>
  );
};

const MobileNav = ({ onOpen, user, ...rest }: MobileProps) => {
  const router = useRouter();

  return (
    <Flex
      ml={{ base: 0, lg: 60 }}
      px={{ base: 4, lg: 4 }}
      height="14"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", lg: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", lg: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        LearnWithLC
      </Text>

      <HStack spacing={{ base: "0", lg: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {user?.image ? (
                  <Avatar size={"sm"} src={user?.image} />
                ) : (
                  <Box w={12} h={12} bgColor="gray.300">
                    {user?.name
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .concat("")}
                  </Box>
                )}
                <VStack
                  display={{ base: "none", lg: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", lg: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Box p={3}>
                <Text>{user?.name}</Text>
                <Text fontWeight="semibold">{user?.email}</Text>
              </Box>
              <MenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={async () => {
                  await logout();
                  router.push("/auth/login");
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ user }: { user: User | undefined }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} user={user} />
    </>
  );
};

export default SidebarWithHeader;
