import React from "react";
import SidebarWithHeader from "./hostLayout";
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
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineThunderbolt } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
function Reservations() {
  return (
    <SidebarWithHeader>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h1 className="text-[34px] font-semibold">Reservations</h1>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Start date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      End date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  <TableItem
                    clientName="Merzouk ilyes reda"
                    amount="100"
                    startDate="may 13,2022"
                    endDate="may 20,2022"
                    status="Pending"
                  />
                  <TableItem
                    clientName="Nadia elouali"
                    amount="4300"
                    startDate="may 13,2022"
                    endDate="may 20,2022"
                    status="Ended"
                  />
                  <TableItem
                    clientName="Abir benaissa"
                    amount="1000"
                    startDate="may 13,2022"
                    endDate="may 20,2022"
                    status="Refused"
                  />
                  <TableItem
                    clientName="Dacine boulma"
                    amount="1230"
                    startDate="may 13,2022"
                    endDate="may 20,2022"
                    status="Accepted"
                  />
                  <TableItem
                    clientName="Zineddine feddag"
                    amount="300"
                    startDate="may 13,2022"
                    endDate="may 20,2022"
                    status="On going"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SidebarWithHeader>
  );
}

export default Reservations;

const TableItem = ({ clientName, amount, startDate, endDate, status }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex">
          <div className="flex-shrink-0 w-10 h-10 flex items-center">
            <Avatar name={clientName} size="sm" />
          </div>
          <div className="ml-3 flex items-center">
            <p className="text-gray-900 whitespace-no-wrap">{clientName}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${amount}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{startDate}</p>
        <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{endDate}</p>
        <p className="text-gray-600 whitespace-no-wrap">Due in 7 days</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Status status={status} />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsThreeDotsVertical />}
            variant="ghost"
            fontSize={20}
          />
          <MenuList>
            <DetailsMenuItem />
            <TakeActionmenuItem />
            <DeleteMenuItem />
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
};
const DetailsMenuItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <MenuItem onClick={onOpen} icon={<BiDetail fontSize={20} />} fontSize={18}>
    Details
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="black"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
  </MenuItem>
    
  )
}
const TakeActionmenuItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MenuItem
      onClick={onOpen}
      icon={<AiOutlineThunderbolt fontSize={20} />}
      fontSize={18}
    >
      Take action
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reservation request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Would you like to accept this reservation request?</ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="red"
              mr={3}
              onClick={onClose}
            >
              Refuse
            </Button>
            <Button variant="solid" colorScheme="green">
              Accept
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
  if (status.toLowerCase().includes("acc")) {
    bgColor = "bg-green-200";
    color = "text-green-900";
  } else if (status.toLowerCase().includes("ref")) {
    bgColor = "bg-red-200";
    color = "text-red-900";
  } else if (status.toLowerCase().includes("on")) {
    bgColor = "bg-blue-200";
    color = "text-blue-900";
  } else if (status.toLowerCase().includes("pen")) {
    bgColor = "bg-orange-200";
    color = "text-orange-900";
  } else if (status.toLowerCase().includes("en")) {
    bgColor = "bg-gray-200";
    color = "text-gray-900";
  }
  return (
    <span
      className={`relative inline-block px-3 py-1 font-semibold ${color} leading-tight`}
    >
      <span
        aria-hidden
        className={`absolute inset-0  ${bgColor} opacity-50 rounded-full`}
      ></span>
      <span className="relative">{status}</span>
    </span>
  );
};
