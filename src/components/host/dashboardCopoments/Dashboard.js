import React, { useEffect, useState } from "react";
import '../../../styles/dashboardCompoments/Dashboard.sass'
import axios from 'axios'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Badge,
} from "@chakra-ui/react";
import { BsCheck2Circle, BsHeart, BsHeartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import "../../../styles/Host.sass";
import { getHostPosts } from '../../utilities/Data';
import SidebarWithHeader from ".././layout"




function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPosts();
    setLoading(false);
   
  }, []);

  const getPosts = () => {
    axios
      .get("http://localhost:8001/findPostByIdHost")  
      .then((response) => {
        const posts = response.data.result ;
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
    <div className='posts'>
     

     { posts.map((item, index ) => {
      return (
 
        <PostCard 
        key={item._id}
        imageUrl={item.images}
        title={item.title}
        price={item.price}
        baths={item.baths}
        beds={item.beds}
        rating={item.rating}
        verified={item.verified}
        space={item.space}
        city={item.city}
        
      />  


      )

     } )}

    </div>
    </SidebarWithHeader>
  )
}
export const PostCard = ({
  imageUrl,
  title,
  beds,
  baths,
  rating,
  reviewCount,
  price,
  verified,
  space,
  city 
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
        {/* <div className="heart">
          <BsHeartFill className="heart-outline" />
        </div> */}
        <div className="heart">
          <BsHeart className="heart-outline" />
        </div>
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
            {beds} beds &bull; {baths} baths &bull; {space} m°2
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
          {title} - {city} 
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
          {/* <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard