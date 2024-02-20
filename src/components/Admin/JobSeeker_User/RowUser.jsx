import img from "../../../../public/images/mentors.jpg";
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

const RowUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <tr className="border-b border-gray-200 h-[3.75rem]">
      <td className="pl-3">1</td>

      <td className="pl-2">
        <div className="flex items-center gap-x-2">
          <img src={img} className="h-9 w-9 rounded-full object-cover" />
          <div className="flex items-center justify-center gap-x-1">
            <h1 className="text-sm font-light">Pavan Kumar</h1>
            <h1 className="text-[8px] border py-[1px] px-[4px] border-green-500 text-green-500 rounded">
              NEW
            </h1>
          </div>
        </div>
      </td>

      <td className="pl-3">
        <h1 className="text-sm">Female</h1>
      </td>

      <td className="pl-3">
        <h1 className="text-sm">15</h1>
      </td>

      <td className="pl-2">
        <h1 className="text-sm">+91 73373 26976</h1>
      </td>

      <td className="pl-2">
        <h1 className="text-sm">jppavan2003@gmail.com</h1>
      </td>

      <td className="pl-2">
        <h1 className="text-sm">25th March,2018</h1>
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
            <AlertDialogHeader>Delete Jobseeker?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete the user? You can &apos t undo
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

export default RowUser;
