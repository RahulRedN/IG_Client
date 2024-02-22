/* eslint-disable react/prop-types */
import { Trash } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";

const Company_RowUser = ({idx,name,email,status}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <tr className="border-b border-gray-200 h-[3.75rem]">
      <td className="pl-3">{idx}</td>

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
        <h1 className="text-sm">12000</h1>
      </td>



      <td className="pl-2">
        <h1 className="text-sm">26976</h1>
      </td>

      

      <td className="pl-2">
        <div className={`${status === "rejected" ? "bg-rose-100 text-rose-500 border-rose-500" :"bg-emerald-100 text-emerald-500 border-emerald-500"} rounded-lg py-1  px-2 w-fit border capitalize`}>
          <h1 className="text-sm">{status}</h1>
        </div>
      </td>

      <td className="pl-2">
        <h1 className="text-sm text-gray-500">12/12/12</h1>
      </td>

      <td>
        <div
          onClick={onOpen}
          className="hover:bg-red-50 w-fit -mt-1 p-3 rounded-md  ml-2 text-gray-600 hover:text-red-500 hover:cursor-pointer"
        >
          <Trash size={20} />
        </div>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Delete Company User?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete the user? You cannot undo
              this.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  console.log("Deleted");
                  onClose();
                  toast.success("User Deleted Successfully!");
                }}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  );
};

export default Company_RowUser;