import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { BiTimeFive, BiImageAdd } from "react-icons/bi";
import { Link as reactRouter, useNavigate, Navigate } from "react-router-dom";
import { MdPublic } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../state/auth_slice";
import logo from "../../assets/Rented.png";

const LinkItems = [
  { name: "Home", icon: FiHome, path: "/host" },
  { name: "Posts", icon: MdPublic, path: "/host/posts" },
  { name: "Add post", icon: BiImageAdd, path: "/host/addpost" },
  { name: "Reservations", icon: BsCalendarCheck, path: "/host/reservations" },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogged = useSelector((state) => state.isLogged);
  let navigate = useNavigate();
  console.log(isLogged);
  // useEffect(() => {
  //   if (!isLogged) {
  //     navigate("/login");
  //   }
  // });

  return (
    <Box minH="100vh" bg={"white"}>
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
      <Flex h="20" alignItems="center" justifyContent="space-between">
        <div className=" logo  w-[250px] h-[100px] flex justify-start items-center">
          <img src={logo} alt="RENTED" className="" />
        </div>

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
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getNotifications();
  }, []);
  const getNotifications = () => {
    console.log("opened");
    axios
      .post("http://localhost:8000/getNotificationByidHost", {
        id: "6245f759dcaa169f72781127",
      })
      .then((response) => {
        const notifications = response.data.result;
        setNotifications(notifications);
        console.log(notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dispatch = useDispatch();
  let userSession = JSON.parse(sessionStorage.getItem("USER"));
  if (userSession) {
    dispatch(actions.setLogin(true));
  } else {
    dispatch(actions.setLogin(false));
  }

  const logoutHandler = () => {
    sessionStorage.removeItem("USER");
    dispatch(actions.setLogin(false));
    toast.success("Logged out successfully !");
  };

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

      <Box display={{ base: "flex", md: "none" }}>
        <div className=" logo  w-[250px] h-[100px] flex justify-center items-center">
          <img src={logo} alt="RENTED" className="" />
        </div>
      </Box>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="open menu"
            size="lg"
            icon={<BsBell />}
            variant="ghost"
            transition="all 0.3s"
            // onOpen ={ getNotifications }
          />
          <MenuList>
            {notifications
              .map((item, index) => {
                return (
                  <NotificationItem
                    notif={item.discreption}
                    iconType={item.type}
                  />
                );
              })
              .reverse()}

            {/* <NotificationItem
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
            /> */}
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
                <Avatar size={"sm"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {userSession
                      ? userSession.firstname + userSession.lastname
                      : ""}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Host
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
