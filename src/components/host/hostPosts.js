import React, { useState, useEffect } from "react";
import SidebarWithHeader from "./hostLayout";
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
  Avatar,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
} from "@chakra-ui/react";
import { BsCheck2Circle, BsSnow } from "react-icons/bs";
import { FaCouch, FaWifi } from "react-icons/fa";
import { MdKitchen, MdOutlineElectricalServices } from "react-icons/md";
import { BiWater } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";

function HostPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPosts();
    setLoading(false);
  }, []);

  const getPosts = () => {
    axios
      .post("http://localhost:8001/findPostByIdHost", {
        idHost: "624b05de38b856734316b248",
      })
      .then((response) => {
        console.log(response);
        const posts = response.data.result;
        setPosts(posts);
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(posts);
  return (
    <SidebarWithHeader>
      <h1 className="text-[40px] font-semibold mx-4  ">Posts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {posts.map((post, i) => (
          <AdminPostCard
            key={post._id}
            id={post._id}
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
  id,
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
          <div className="flex justify-between">
            <Heading fontSize={"2xl"} fontFamily={"body"} className="flex  ">
              {title}
            </Heading>

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
          </div>
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
            id={id}
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
  id,
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
            idPost={id}
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
  idPost,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isFeedOpen,
    onOpen: onFeedOpen,
    onClose: onFeedClose,
  } = useDisclosure();

  const ConfirmPostHandler = (id) => {
    axios
      .patch("http://localhost:8001/UpdatePostStatus", {
        id: id,
      })
      .then(function (response) {
        console.log(response);
        onConfirmClose();
        toast.success("This post is now verified !");
        setTimeout(() => {
          window.location.reload(false);
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                      Verification:
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
                      <Button onClick={onOpen} variant="ghost">
                        Assign an agent
                      </Button>

                      <Modal
                        scrollBehavior={"inside"}
                        isOpen={isOpen}
                        onClose={onClose}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Agents</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            {Array(5)
                              .fill("")
                              .map((_, i) => (
                                <AgentsCard key={i} />
                              ))}
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                    </div>
                  )}
                </ListItem>
              </List>
            </Box>
          </Stack>
          <div className="flex flex-col justify-center  items-center ">
            {verified ? (
              ""
            ) : (
              <div>
                <Button
                  rounded={"lg"}
                  w={"sm"}
                  size={"lg"}
                  py={"7"}
                  variant="ghost"
                  onClick={onFeedOpen}
                >
                  See agent's feedback
                </Button>
                <Modal isOpen={isFeedOpen} onClose={onFeedClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Agent's feedback</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="font-semibold">
                      This house is very well organised , everything is
                      authentic just like in the host's post
                    </ModalBody>

                    <ModalFooter>
                      <Button variant="ghost" mr={3} onClick={onFeedClose}>
                        OK
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Button
                  rounded={"lg"}
                  w={"sm"}
                  mt={4}
                  size={"lg"}
                  py={"7"}
                  bg={"green.600"}
                  color={"white"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                  onClick={onConfirmOpen}
                >
                  Confirm the post
                </Button>
                <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="font-semibold">
                      Are you sue you want to confirm this post?
                    </ModalBody>

                    <ModalFooter>
                      <Button variant="ghost" mr={3} onClick={onConfirmClose}>
                        Cancel
                      </Button>
                      <Button
                        variant="solid"
                        colorScheme="green"
                        onClick={() => ConfirmPostHandler(idPost)}
                      >
                        Confirm
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            )}
            <Button
              rounded={"lg"}
              w={"sm"}
              mt={4}
              size={"lg"}
              py={"7"}
              bg={"white"}
              color={"red"}
              border={"solid"}
              borderColor={"red"}
              _hover={{
                color: "white",
                bg: "red",
              }}
              onClick={onDeleteOpen}
            >
              Delete the post
            </Button>
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody className="font-semibold">
                  Are you sue you want to Delete this post?
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onDeleteClose}>
                    Cancel
                  </Button>
                  <Button variant="solid" colorScheme="red">
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

function AgentsCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div
        className="flex  items-center justify-between p-3 
     rounded-md hover:bg-gray-200 transition ease-in-out 
     cursor-pointer	focus:outline-none focus:ring focus:gray-900
     "
      >
        <div className="flex  items-center">
          <Avatar name="merzouk ilyes" className="mr-3" />
          <div className="flex flex-col">
            <p className="text-gray-900 font-semibold">Merzouk ilyes reda</p>
            <p className="text-gray-500">Oran</p>
          </div>
        </div>
        <Button variant="outline" onClick={onOpen}>
          {" "}
          Assign
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure ?</ModalHeader>
            <ModalCloseButton />

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button variant="solid" colorScheme="green">
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <Divider />
    </>
  );
}

export default HostPosts;
