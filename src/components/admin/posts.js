import React, { useState, useEffect } from "react";
import SidebarWithHeader from "./layout";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Container,
  VStack,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { BsCheck2Circle, BsSnow } from "react-icons/bs";
import { FaCouch, FaWifi, FaYoutube } from "react-icons/fa";
import { MdKitchen, MdOutlineElectricalServices } from "react-icons/md";
import { BiWater } from "react-icons/bi";
import axios from "axios";

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const url = "http://localhost:8001/findAllPosts";

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = () => {
    axios
      .get(url)
      .then((response) => {
        const posts = response.data.result;
        setPosts(posts);
        console.log("posts =>" + posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SidebarWithHeader>
      <h1 className="text-[40px] font-semibold mx-4  ">Posts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {posts.map((post, i) => (
          <AdminPostCard
            key={post._id}
            imageUrl={post.images[0]}
            title={post.title}
            price={post.PricePerNight}
            baths={post.nbrBathes}
            beds={post.nbrBeds}
            rating={post.RatingTotal}
            verified={post.verified}
            space={post.space}
            city={post.city}
          />
        ))}
      </div>
    </SidebarWithHeader>
  );
}

export default AdminPosts;

function AdminPostCard({
  imageUrl,
  title,
  price,
  baths,
  beds,
  rating,
  verified,
  space,
  city,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "90%", md: "540px" }}
        height={{ sm: "400px", md: "300px" }}
        direction={{ base: "row", md: "row" }}
        bg={"white"}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image objectFit="cover" boxSize="100%" src={imageUrl} />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"} className="flex  ">
            {title}
            {verified ? (
              <Badge
                display="flex"
                alignItems="center"
                borderRadius="full"
                px="2"
                mx="2"
                colorScheme="teal"
              >
                <BsCheck2Circle />
              </Badge>
            ) : (
              ""
            )}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {city}
          </Text>
          <Text textAlign={"center"} color={"gray.700"} px={3}>
            {beds} BEDS • {baths} BATHS •{space} M°2
          </Text>
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge px={2} py={1} bg={"gray.50"} fontWeight={"400"}>
              $ {price}/ night
            </Badge>
          </Stack>

          <Button
            width={"200px"}
            height={"45px"}
            fontSize={"sm"}
            rounded={"lg"}
            bg={"#FF5A5F"}
            color={"white"}
            className=""
            _hover={{
              bg: "#FF4A4F",
            }}
            _focus={{
              bg: "#FF4A4F",
            }}
            onClick={onOpen}
          >
            See details
          </Button>
          <DetailsDrawer
            onClose={onClose}
            isOpen={isOpen}
            imageUrl={imageUrl}
            title={title}
            price={price}
            baths={baths}
            beds={beds}
            rating={rating}
            verified={verified}
            space={space}
            city={city}
          />
        </Stack>
      </Stack>
    </Center>
  );
}

function DetailsDrawer({
  onClose,
  isOpen,
  imageUrl,
  title,
  price,
  baths,
  beds,
  rating,
  verified,
  space,
  city,
}) {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>
        <DrawerBody>
          <DetailsDrawerData
            imageUrl={imageUrl}
            title={title}
            price={price}
            baths={baths}
            beds={beds}
            rating={rating}
            verified={verified}
            space={space}
            city={city}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function DetailsDrawerData({
  imageUrl,
  title,
  price,
  baths,
  beds,
  rating,
  verified,
  space,
  city,
}) {
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={imageUrl}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {title}
            </Heading>
            <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
              ${price} /NIGHT
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.200"} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={"gray.500"} fontSize={"2xl"} fontWeight={"300"}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"#FF5A5F"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <Flex align="center">
                    <BiWater /> &nbsp;<ListItem>Water </ListItem>
                  </Flex>
                  <Flex align="center">
                    <MdKitchen /> &nbsp;<ListItem>Gas </ListItem>{" "}
                  </Flex>
                  <Flex align="center">
                    <MdOutlineElectricalServices /> &nbsp;
                    <ListItem>Electricity </ListItem>{" "}
                  </Flex>
                </List>
                <List spacing={2}>
                  <Flex align="center">
                    {" "}
                    <FaCouch /> &nbsp;<ListItem>Furniture </ListItem>
                  </Flex>
                  <Flex align="center">
                    <FaWifi /> &nbsp;<ListItem>Wifi </ListItem>{" "}
                  </Flex>
                  <Flex align="center">
                    <BsSnow /> &nbsp;<ListItem>Air conditioning </ListItem>
                  </Flex>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"#FF5A5F"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Post Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Local type:
                  </Text>{" "}
                  Villa
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    City:
                  </Text>{" "}
                  {city}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Street:
                  </Text>{" "}
                  Oran
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Number of beds:
                  </Text>{" "}
                  {beds}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Number of baths:
                  </Text>{" "}
                  {baths}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Space:
                  </Text>{" "}
                  {space} M°2
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Rating:
                  </Text>{" "}
                  {rating}
                </ListItem>
                <ListItem className="flex justify-between">
                  <div>
                    <Text as={"span"} fontWeight={"bold"}>
                      Verified:
                    </Text>{" "}
                    </div>
                    {verified ? (
                      <Badge
                        display="flex"
                        alignItems="center"
                        borderRadius="full"
                        px="2"
                        mx="2"
                        colorScheme="teal"
                      >
                       Verified &nbsp; <BsCheck2Circle />
                      </Badge>
                    ) : (
                      <div>
                      <Menu isLazy>
                        <MenuButton>Assign an agent</MenuButton>
                        <MenuList>
                          {/* MenuItems are not rendered unless Menu is open */}
                          <MenuItem>Agent 1</MenuItem>
                          <MenuItem>Agent 2</MenuItem>
                          <MenuItem>Agent 3</MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                    )}
                  
                </ListItem>
              </List>
            </Box>
          </Stack>
          <div className="flex justify-between  ">
            <Button
              rounded={"lg"}
              w={"sm"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={"green.600"}
              color={"white"}
              className="mr-5"
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Change status
            </Button>
            <Button
              rounded={"lg"}
              w={"sm"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={"red"}
              color={"white"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Delete
            </Button>
          </div>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
