import React, { useEffect, useState } from "react";
import Navbar from "../utilities/Navbar";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Badge,
} from "@chakra-ui/react";
import "../../styles/search.sass";
import { GiTreehouse } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import {
  MdOutlineCabin,
  MdOutlineHouseboat,
  MdPool,
  MdOutlineHouse,
} from "react-icons/md";
import { BsCheck2Circle, BsHeart, BsHeartFill } from "react-icons/bs";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Search() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:8001/findAllPosts";

  useEffect(() => {
    getPosts();
    setLoading(false)
  }, []);

  const getPosts = () => {
    axios
      .get(url)
      .then((response) => {
        const posts = response.data;
        setPosts(posts);
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="filters">
        <Tabs variant="soft-rounded" colorScheme="red">
          <TabList className="tab-list">
            <Tab>
              {" "}
              <GiTreehouse /> &nbsp; Farms{" "}
            </Tab>
            <Tab>
              {" "}
              <MdOutlineCabin /> &nbsp; Cabins
            </Tab>
            <Tab>
              {" "}
              <MdOutlineHouseboat /> &nbsp;Beach front
            </Tab>
            <Tab>
              {" "}
              <MdPool />
              &nbsp; Amazing pools
            </Tab>
            <Tab>
              {" "}
              <MdOutlineHouse /> &nbsp;Tiny homes
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="posts-grid">
                {loading
                  ? Array(8).fill('').map((_, i) => <SkeltonPostCard />)
                  : posts.map((post, i) => (
                      <PostCard
                        key={post._id}
                        imageUrl={post.image}
                        title={post.title}
                        price={post.PricePerNight}
                        baths={post.nbrBathes}
                        beds={post.nbrBeds}
                        rating={post.RatingTotal}
                        verified={post.verified}
                      />
                    ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="posts-grid"></div>
            </TabPanel>
            <TabPanel>
              <div className="posts-grid"></div>
            </TabPanel>
            <TabPanel>
              <div className="posts-grid"></div>
            </TabPanel>
            <TabPanel>
              <div className="posts-grid"></div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}

export default Search;

export const PostCard = ({
  imageUrl,
  title,
  beds,
  baths,
  rating,
  reviewCount,
  price,
  verified,
}) => {
  const property = {
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center",
    formattedPrice: "1.900",
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Box
      height={"400px"}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box height={"250px"} overflow="hidden" className="image-box">
        <img src={imageUrl} alt={property.imageAlt} />
        <BsHeartFill className="heart-outline" />

        {/* < BsHeartFill/> */}
      </Box>
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            mr="2"
          >
            {beds} beds &bull; {baths} baths
          </Box>
          {verified ? (
            <Badge
              display="flex"
              alignItems="center"
              borderRadius="full"
              px="2"
              colorScheme="teal"
            >
              Verified &nbsp; <BsCheck2Circle />
            </Badge>
          ) : (
            ""
          )}
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>

        <Box>
          $ {price}
          <Box as="span" color="gray.600" fontSize="sm">
            / night
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <AiFillStar key={i} fill={i < rating ? "gold" : "grey"} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const SkeltonPostCard = () => {
  return (
    <Box
      height={"400px"}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Skeleton height={250} />
      <Box p="6">
        <Box alignItems="baseline">
          <Skeleton height={50} />
        </Box>

        <Box mt="1">
          <Skeleton height={20} />
        </Box>

        <Box>
          <Skeleton height={20} />
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Skeleton height={20} />
        </Box>
      </Box>
    </Box>
  );
};
