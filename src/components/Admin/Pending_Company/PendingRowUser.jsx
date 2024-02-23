/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
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
import { toast } from "react-hot-toast";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, action }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {action === "accept" ? "Accept" : "Reject"} Confirmation
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to {action === "accept" ? "accept" : "reject"}{" "}
          the Company?
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={action === "accept" ? "green" : "red"}
            mr={3}
            onClick={onConfirm}
          >
            {action === "accept" ? "Accept" : "Reject"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const PendingRowUser = ({ idx, name, email, status }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [action, setAction] = useState("");

  const handleAction = (actionType) => {
    setAction(actionType);
    onOpen();
  };

  const handleConfirm = () => {
    if (action === "accept") {
      toast.success("Company Accepted");
    } else {
      toast.error("Company Rejected");
    }
    onClose();
  };

  return (
    <tr className="border-b border-gray-200 h-[3.75rem]">
      <td className="pl-6">{idx}</td>

      <td className="pl-2">
        <div className="flex items-center gap-x-2">
          <div className="flex items-center justify-center gap-x-1">
            <h1 className="text-sm font-light">{name}</h1>
            <h1 className="text-[8px] border py-[1px] px-[4px] border-green-500 text-green-500 rounded">
              NEW
            </h1>
          </div>
        </div>
      </td>

      <td className="pl-3">
        <h1 className="text-sm">{email}</h1>
      </td>

      <td className="pl-3">
        <h1 className="text-sm">23rd June , 2023</h1>
      </td>

      <td className="pl-2">
        <div className="bg-amber-100 text-amber-500 border-amber-500 rounded-lg py-1  px-2 w-fit border capitalize">
          <h1 className="text-sm">{status}</h1>
        </div>
      </td>

      <td className="pl-2">
        <div className="flex">
          <div
            onClick={() => handleAction("reject")}
            className="hover:bg-red-50 w-fit -mt-1 p-3 rounded-md ml-2 text-gray-600 hover:text-red-500 hover:cursor-pointer"
          >
            <CloseIcon color={"#ef4444"} />
          </div>
          <div
            onClick={() => handleAction("accept")}
            className="hover:bg-emerald-50 w-fit -mt-1 p-3 rounded-md ml-2 text-gray-600 hover:text-emerald-500 hover:cursor-pointer"
          >
            <CheckIcon color={"#4ade80"} />
          </div>
          <ConfirmationModal isOpen={isOpen} onClose={onClose} onConfirm={handleConfirm} action={action}/>
        </div>
      </td>
    </tr>
  );
};

export default PendingRowUser;
