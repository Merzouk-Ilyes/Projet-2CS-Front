import React from "react";
import "../../styles/navbar.sass";
import { FaSearchLocation } from "react-icons/fa";
import { Show } from "@chakra-ui/react";
import { GoThreeBars } from "react-icons/go";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Navbar({ searchInput }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isLogged = useSelector((state) => state.isLogged.value);
  console.log(isLogged);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="logo">Rented</div>
      <Show breakpoint="(min-width: 1200px)">
        <div className="links">
          <Link to="/">
            {" "}
            <p>Home</p>
          </Link>
          <Link to="/search">
            {" "}
            <p>Locals</p>
          </Link>
          <Link to="/about">
            {" "}
            <p>About</p>
          </Link>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Ex: apartement, villa ..etc"
            onChange={searchInput}
          />
          <div className="icon-box">
            <FaSearchLocation className="icon" />
          </div>
        </div>
        {!isLogged ? (
           <Link to="/signupclient">
          <div className="join">
            <button>Join now</button>
          </div>
          </Link>
        ) : (
          <Menu>
            <MenuButton>
              <Avatar name="MERZOUK ILYES" size="md" />
            </MenuButton>
            <Box color="black">
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <Box color="red">
                  <MenuItem>Logout </MenuItem>
                </Box>
              </MenuList>
            </Box>
          </Menu>
        )}
      </Show>
      <Show breakpoint="(max-width: 1200px)">
        <GoThreeBars className="drawer-icon" onClick={onOpen} />
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Logo</DrawerHeader>
            <DrawerBody className="drawer-body">
              <div className="links">
                <Link to="/">
                  {" "}
                  <p>Home</p>
                </Link>
                <Link to="/search">
                  {" "}
                  <p>Locals</p>{" "}
                </Link>
                <Link to="/about">
                  {" "}
                  <p>About</p>
                </Link>
              </div>
              <div className="search">
                <input type="text" placeholder="Ex: apartement, villa ..etc" />
                <div className="icon-box">
                  <FaSearchLocation className="icon" />
                </div>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </div>
  );
}

export default Navbar;
