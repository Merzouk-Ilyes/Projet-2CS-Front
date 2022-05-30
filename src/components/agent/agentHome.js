import React, { useState, useEffect } from "react";
import SidebarWithHeader from "./agentLayout";
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
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import { BsCheck2Circle, BsSnow } from "react-icons/bs";
import { FaCouch, FaWifi } from "react-icons/fa";
import { MdKitchen, MdOutlineElectricalServices } from "react-icons/md";
import { BiWater } from "react-icons/bi";
import axios from "axios";

function AgentHome() {
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
          <AgentPostCard
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

export default AgentHome;

function AgentPostCard({
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isOpen: isFOpen,onOpen: onFOpen,onClose: onFClose } = useDisclosure();

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
              </List>
            </Box>
          </Stack>
          <div className="flex flex-col justify-center  items-center ">
            <Button
              rounded={"lg"}
              w={"sm"}
              mt={4}
              size={"lg"}
              py={"7"}
              color={"white"}
              bg={"telegram.900"}
              
              onClick={onOpen}
              _hover={{
                color: "white",
                bg: "telegram.900",
              }}
            >
              Select meeting date
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader></ModalHeader>
              
                <ModalBody>
                  <Input placeholder="large size" size="lg" type="date" />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" variant="ghost"mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="blue" >Confirm</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Button
              rounded={"lg"}
              w={"sm"}
              mt={4}
              size={"lg"}
              py={"7"}
              
              color={"white"}
              bg={"orange.900"}
            
              onClick={onFOpen}
              _hover={{
                color: "white",
                bg: "orange.900",
              }}
            >
              Give feedback
            </Button>

            <Modal isOpen={isFOpen} onClose={onFClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader></ModalHeader>
            
                <ModalBody>
                  <Textarea placeholder="Give your feedback" resize={"none"} />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue"  variant="ghost" mr={3} onClick={onFClose}>
                    Close
                  </Button>
                  <Button colorScheme="blue">Submit</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* <Button
              rounded={"lg"}
              w={"sm"}
              mt={4}
              size={"lg"}
              py={"7"}
              
              color={"white"}
              bg={"orange.900"}
            
              onClick={onFOpen}
              _hover={{
                color: "white",
                bg: "telegram.900",
              }}
            >
              Download PDF
            </Button> */}
          </div>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
