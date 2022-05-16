import React from "react";
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
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiChevronDown } from "react-icons/fi";
import {
  BsCalendarCheck,
  BsBell,
  BsPatchCheck,
  BsPatchExclamation,
} from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { Link as reactRouter } from "react-router-dom";

const LinkItems = [
  { name: "Home", icon: FiHome, path: "/agent" },
 
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("white", "white")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
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
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Link
      as={reactRouter}
      to={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#FF5A5F",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="18"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="open menu"
            size="lg"
            icon={<BsBell />}
            variant="ghost"
            transition="all 0.3s"
          />
          <MenuList>
            <NotificationItem
              notif="One of your posts has been verified"
              iconType={1}
            />
            <NotificationItem
              notif="One of your posts has been declined"
              iconType={2}
            />
            <NotificationItem
              notif="You have a new reservation request"
              iconType={3}
            />
            <NotificationItem
              notif="One of your posts is under verification"
              iconType={4}
            />
          </MenuList>
        </Menu>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} name="Merzouk ilyes reda" />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Merzouk ilyes reda</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const NotificationItem = ({ notif, iconType }) => {
  if (iconType == 1) {
    return (
      <MenuItem minH="75px" minW="350px">
        <BsPatchCheck fontSize="25" className="mr-5" />
        <span>{notif}</span>
      </MenuItem>
    );
  } else if (iconType == 2) {
    return (
      <MenuItem minH="75px" minW="350px">
        <BsPatchExclamation fontSize="25" className="mr-5" />
        <span>{notif}</span>
      </MenuItem>
    );
  } else if (iconType == 3) {
    return (
      <MenuItem minH="75px" minW="350px">
        <BsCalendarCheck fontSize="25" className="mr-5" />
        <span>{notif}</span>
      </MenuItem>
    );
  } else if (iconType == 4) {
    return (
      <MenuItem minH="75px" minW="350px">
        <BiTimeFive fontSize="25" className="mr-5" />
        <span>{notif}</span>
      </MenuItem>
    );
  } else
    return (
      <MenuItem minH="75px" minW="350px">
        <BiTimeFive fontSize="25" className="mr-5" />
        <span>{notif}</span>
      </MenuItem>
    );
};
