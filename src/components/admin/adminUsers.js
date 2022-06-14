import React, { useState, useEffect } from "react";
import SidebarWithHeader from "./adminLayout";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import {HiOutlineIdentification} from "react-icons/hi"
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineThunderbolt } from "react-icons/ai";
import { GrValidate } from "react-icons/gr";
import axios from "axios";
import { toast } from "react-toastify";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:8000/accounts";
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axios
      .get(url)
      .then((response) => {
        const users = response.data;
        setUsers(users);
        setLoading(false);
        console.log("users =>" + JSON.stringify(users[0].emailVerified));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SidebarWithHeader>
      <div className="container mx-auto px-4 sm:px-8">
        <div>
          <h1 className="text-[34px] font-semibold">Users</h1>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-[20px] py-[20px] border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-[20px] py-[20px] border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-[20px] py-[20px] border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Phone number
                    </th>
                    <th className="px-[20px] py-[20px] border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-[20px] py-[20px] border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email Verified
                    </th>
                    <th className="px-[20px] py-[20px] border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Account verified
                    </th>
                    <th className="px-[20px] py-[20px] border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td>
                        <Spinner size="lg" />
                      </td>
                    </tr>
                  ) : (
                    users.map((users, i) => (
                      <TableItem
                        key={i}
                        name={users.firstname + " " + users.lastname}
                        email={users.email}
                        phone={users.phonenumber}
                        type={users.role}
                        emailVerified={users.emailVerified}
                        accountVerified={users.accountVerified}
                        idUser={users._id}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SidebarWithHeader>
  );
}

export default AdminUsers;

const TableItem = ({
  name,
  email,
  type,
  emailVerified,
  accountVerified,
  phone,idUser
}) => {
  var role = "Client";
  if (type == 0) {
    role = "Admin";
  } else if (type == 1) {
    role = "Agent";
  } else if (type == 2) {
    role = "Client";
  } else if (type == 3) {
    role = "Host";
  }

  return (
    <tr>
      <td className="px-[20px] py-[20px] border-b border-gray-200 bg-white text-sm">
        <div className="flex">
          <div className="flex-shrink-0 w-10 h-10 flex items-center">
            <Avatar name={name} size="sm" />
          </div>
          <div className="ml-3 flex items-center">
            <p className="text-gray-900 whitespace-no-wrap">{name}</p>
          </div>
        </div>
      </td>
      <td className="px-[20px] py-[20px] border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-[20px] py-[20px] border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{phone}</p>
      </td>
      <td className="px-[20px] py-[20px] border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{role}</p>
      </td>
      <td className="px-[20px] py-[20px] border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          <Status status={emailVerified} />
        </p>
      </td>
      <td className="px-[20px] py-[20px] border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          <Status status={accountVerified} />
        </p>
      </td>

      <td className="px-[20px] py-[20px] border-b border-gray-200 bg-white text-sm text-right">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsThreeDotsVertical />}
            variant="ghost"
            fontSize={20}
          />
          <MenuList>
            <SeeId />
            <DetailsMenuItem id={idUser} />
            
            <DeleteMenuItem />
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
};
const DetailsMenuItem = ({id}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const url = "http://localhost:8000/validateAccount";
  const validateAccount = () => {
    axios
      .post(url,{id:id})
      .then((response) => {
        console.log(response);
        onClose();
        toast.success("Account is verified !");
        setTimeout(() => {
          window.location.reload(false);
        }, 2500);
        

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MenuItem onClick={onOpen} icon={<GrValidate fontSize={20} />} fontSize={18}>
      Validate Account
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Validate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to validate this account?</ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="black"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          <Button
              variant="solid"
              colorScheme="green"
              mr={3}
              onClick={validateAccount}
            >
              Validate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MenuItem>
  );
};
const SeeId = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
  
    return (
      <MenuItem onClick={onOpen} icon={<HiOutlineIdentification fontSize={20} />} fontSize={18}>
        Verify ID
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Validate</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to validate this account?</ModalBody>
  
            <ModalFooter>
              <Button
                variant="ghost"
                colorScheme="black"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
            <Button
                variant="solid"
                colorScheme="green"
                mr={3}
                
              >
                Validate
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </MenuItem>
    );
  };

const DeleteMenuItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MenuItem
      onClick={onOpen}
      icon={<AiOutlineDelete fontSize={20} />}
      fontSize={18}
    >
      Delete
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this?</ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="black"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button variant="solid" colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MenuItem>
  );
};

const Status = ({ status }) => {
  var bgColor;
  var color;
  if (status) {
    bgColor = "bg-green-200";
    color = "text-green-900";
  } else {
    bgColor = "bg-red-200";
    color = "text-red-900";
  }
  return (
    <span
      className={`relative inline-block px-3 py-1 font-semibold ${color} leading-tight`}
    >
      <span
        aria-hidden
        className={`absolute inset-0  ${bgColor} opacity-50 rounded-full`}
      ></span>
      <span className="relative">{status ? "Verified" : "Not Verified"}</span>
    </span>
  );
};
