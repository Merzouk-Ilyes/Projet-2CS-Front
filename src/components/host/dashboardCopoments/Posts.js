// import { Checkbox } from '@chakra-ui/react';
import React, { useState } from "react";
import "../../../styles/dashboardCompoments/Posts.sass";
import { toast } from "react-toastify";

import { BsFillCloudUploadFill } from "react-icons/bs";
import BtnSlider from "./Slider/BtnSlider";
import SidebarWithHeader from "../hostLayout";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { Checkbox, Stack } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

function Posts() {
  const [postData, setPostData] = useState({
    title: "",
    city: "",
    street: "",
    nbBeds: "",
    nbBaths: "",
    space: "",
    description: "",
    pricePerNight: "",
    furnish: false,
    gas: false,
    electricty: false,
    water: false,
    type: "",
    image: [],
  });

  const [images, setPath] = useState([]);
  // console.log( images , "images")

  console.log(images);

  const handleSubmit = (e) => {
    e.preventDefault();
    var pattern = new RegExp("[0-9][0-9]*");

    if (!pattern.test(postData.pricePerNight)) {
      toast.error("price  should contain only numbers ");
      return;
    }

    if (!pattern.test(postData.space)) {
      toast.error("Space should contain only numbers ");
      return;
    }

    if (postData.type == "") {
      toast.error("you should select a type ");
      return;
    }

    if (selectedImages.length == 0) {
      toast.error(" you should select images  ");
      return;
    }

    // beds and Baths are not required do we check first if host introduced value
    // for them then we check if they match with the pattern

    if (postData.nbBeds != "" && !pattern.test(postData.nbBaths)) {
      toast.error(" number of baths  should contain only numbers ");
      return;
    }

    if (postData.nbBeds !== "" && !pattern.test(postData.nbBeds)) {
      toast.error("number of beds should contain only numbers ");
      return;
    }

    axios
      .post("http://localhost:8001/addpost", {
        title: postData.title,
        idUser: "6248ae87204af883c140395e",
        city: postData.city,
        street: postData.street,
        nbrBeds: postData.nbBeds,
        nbrBathes: postData.nbBaths,
        space: postData.space,
        description: postData.description,
        PricePerNight: postData.pricePerNight,
        furnish: postData.furnish,
        gas: postData.gas,
        electricty: postData.electricty,
        water: postData.water,
        type: postData.type,
        images: postData.image,
      })
      .then((response) => {
        console.log(response);

        toast.success("post added succefuly");
      })
      .catch((error) => {
        toast.error("use error occurred please try again");

        console.log(error);
      });
  };

  // contain images
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    postData.image = selectedImages;
  };

  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== selectedImages.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === selectedImages.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(selectedImages.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <SidebarWithHeader>
      <div className="addpost">
        <div className="div1">
          <h3 className="title">Add post</h3>
          <form className="form" onSubmit={handleSubmit}>
            {/* _______________________________________title ______________________________________________________ */}
            <div>
              <div>
                {/* <p>Title</p> */}
                <input
                  type="text"
                  value={postData.title}
                  className="form-control titre"
                  placeholder="title"
                  onChange={(e) => {
                    const data = {
                      title: e.target.value,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                  required
                />
              </div>
            </div>

            {/* ___________________________ city + street __________________________________________ */}
            <div className="group">
              <div>
                <input
                  type="text"
                  value={postData.city}
                  className="form-control"
                  placeholder="city"
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: e.target.value,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                  required
                />
              </div>
              {/* ________street */}
              <div>
                <input
                  type="text"
                  value={postData.street}
                  className="form-control"
                  placeholder="street"
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: e.target.value,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                  required
                />
              </div>
            </div>

            {/* _______________beds+ baths _______________ */}
            <div className="group">
              <div>
                <input
                  type="number"
                  value={postData.nbBeds}
                  className="form-control"
                  placeholder="beds"
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: e.target.value,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                />
              </div>

              <div>
                <input
                  type="number"
                  value={postData.nbBaths}
                  className="form-control"
                  placeholder="baths"
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: e.target.value,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                />
              </div>
            </div>
            {/* _______________space + price_______________ */}
            <div className="group">
              <div>
                <input
                  type="number"
                  value={postData.pricePerNight}
                  className="form-control"
                  placeholder="price per night "
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: e.target.value,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                  required
                />
              </div>

              <div>
                <input
                  type="number"
                  value={postData.space}
                  className="form-control"
                  placeholder="space"
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: e.target.value,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                  required
                />
              </div>
            </div>

            {/* ______gaz electricty water furnish ____ */}

            <div className="chekboxes">
              <Stack spacing={3} direction="row">
                <Checkbox
                  colorScheme="white"
                  borderColor="#FF5A5F"
                  cursorColor="#FF5A5F"
                  iconColor="#FF5A5F"
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: !postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                    console.log(postData.gas);
                  }}
                >
                  gaz
                </Checkbox>
                <Checkbox
                  colorScheme="white"
                  borderColor="#FF5A5F"
                  cursorColor="#FF5A5F"
                  iconColor="#FF5A5F"
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: !postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                    console.log(postData.gas);
                  }}
                >
                  electricity
                </Checkbox>
                <Checkbox
                  colorScheme="white"
                  borderColor="#FF5A5F"
                  cursorColor="#FF5A5F"
                  iconColor="#FF5A5F"
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: !postData.water,
                      type: postData.type,
                      image: postData.image,
                    };
                    setPostData(data);
                    console.log(postData.gas);
                  }}
                >
                  water
                </Checkbox>
                <Checkbox
                  colorScheme="white"
                  borderColor="#FF5A5F"
                  cursorColor="#FF5A5F"
                  iconColor="#FF5A5F"
                  onChange={(e) => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: !postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: postData.type,
                      image: selectedImages,
                    };
                    setPostData(data);
                    console.log(postData.gas);
                  }}
                >
                  furniture
                </Checkbox>
              </Stack>
            </div>

            <Menu>
              <MenuButton
                type="button"
                width="200px"
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                marginTop={"15px"}
                _hover={{ bg: "#FF5A5F20" }}
                _expanded={{ bg: "#FF5A5F" }}
                _focus={{ boxShadow: "outline" }}
                rightIcon={<IoIosArrowDown />}
              >
                type of housing
              </MenuButton>
              <MenuList type="radio">
                <MenuItem
                  onClick={() => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: 1,
                    };
                    setPostData(data);
                  }}
                >
                  Farms
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: 2,
                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                >
                  Appartment
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: 3,
                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                >
                  beach front{" "}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: 4,

                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                >
                  Pool
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    const data = {
                      title: postData.title,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description: postData.description,
                      pricePerNight: postData.pricePerNight,
                      furnish: postData.furnish,
                      gas: postData.gas,
                      electricty: postData.electricty,
                      water: postData.water,
                      type: 5,

                      image: postData.image,
                    };
                    setPostData(data);
                  }}
                >
                  Villa
                </MenuItem>
              </MenuList>
            </Menu>

            {/* _____________________Descriptions _________________________  */}
            <div className="description">
              <textarea
                type="text"
                value={postData.description}
                className="form-control"
                placeholder="description"
                onChange={(e) => {
                  const data = {
                    title: postData.title,
                    city: postData.city,
                    street: postData.street,
                    nbBeds: postData.nbBeds,
                    nbBaths: postData.nbBaths,
                    space: postData.space,
                    description: e.target.value,
                    pricePerNight: postData.pricePerNight,
                    furnish: postData.furnish,
                    gas: postData.gas,
                    electricty: postData.electricty,
                    water: postData.water,
                    type: postData.type,
                    image: postData.image,
                  };
                  setPostData(data);
                }}
                required
              />
            </div>

            {/* submit btn  */}

            <button className="btn" type="submit">
              Add post
            </button>
          </form>
        </div>
        <div className="div2">
          <div className="slider">
            {/* image slider   */}
            <div className="container-slider">
              {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <div
                      key={image}
                      className={
                        slideIndex === index + 1 ? "slide active-anim" : "slide"
                      }
                    >
                      <img src={image} alt="upload" />
                      <button
                        onClick={() =>
                          setSelectedImages(
                            selectedImages.filter((e) => e !== image)
                          )
                        }
                      >
                        delete image
                      </button>
                      <p>{index + 1}</p>
                    </div>
                  );
                })}

              {/* privious and next buttons  */}
              <BtnSlider moveSlide={nextSlide} direction={"next"} />
              <BtnSlider moveSlide={prevSlide} direction={"prev"} />
              {/* dots  */}
              <div className="container-dots">
                {Array.from({ length: selectedImages.length }).map(
                  (item, index) => (
                    <div
                      onClick={() => moveDot(index + 1)}
                      className={
                        slideIndex === index + 1 ? "dot active" : "dot"
                      }
                    ></div>
                  )
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="upload-file"
            onClick={() => {
              document.getElementById("file").click();
            }}
          >
            {" "}
            Upload images &nbsp;&nbsp;&nbsp; <BsFillCloudUploadFill />{" "}
          </button>

          <input
            type="file"
            id="file"
            name="file"
            multiple
            accept="image/*"
            // value={images}

            onChange={onSelectFile}
          />
        </div>
      </div>
    </SidebarWithHeader>
  );
}

export default Posts;
