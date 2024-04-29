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
import axios from "axios";

const RowUser = ({ jobseeker, idx, fetchJobSeekers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const dob = new Date(jobseeker.dob);
  const joinDate = new Date(jobseeker.createdAt);
  const now = new Date();

  const timeDifference = now - joinDate;

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const isWithinOneDay = timeDifference < oneDayInMilliseconds;

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(
        import.meta.env.VITE_SERVER + "/api/admin/deleteUser",
        { uid: jobseeker._id },
        {
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status == 200) {
        toast.success("User Deleted!");
        fetchJobSeekers();
      }
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  return (
    <tr className="border-b border-gray-200 h-[3.75rem]">
      <td className="pl-3">{idx + 1}</td>

      <td className="pl-2">
        <div className="flex items-center gap-x-2">
          <img
            src={jobseeker.img}
            className="h-9 w-9 rounded-full object-cover"
          />
          {/* jobseeker. */}
          <div className="flex items-center justify-center gap-x-1">
            <h1 className="text-sm font-light">{jobseeker.fname}</h1>
            {isWithinOneDay && (
              <h1 className="text-[8px] border py-[1px] px-[4px] border-green-500 text-green-500 rounded">
                NEW
              </h1>
            )}
          </div>
        </div>
      </td>

      <td className="pl-3">
        <h1 className="text-sm">{jobseeker.gender}</h1>
      </td>

      <td className="pl-3">
        <h1 className="text-sm">{now.getFullYear() - dob.getFullYear()}</h1>
      </td>

      <td className="pl-2">
        <h1 className="text-sm">{jobseeker.mobile}</h1>
      </td>

      <td className="pl-2">
        <h1 className="text-sm">{jobseeker.email}</h1>
      </td>

      <td className="pl-2">
        <h1 className="text-sm">
          {" "}
          {new Date(jobseeker.createdAt).toDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "2-digit", // Use '2-digit' to display the year in a two-digit format (e.g., 24 instead of 2024)
          })}
        </h1>
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
              <Button colorScheme="red" ml={3} onClick={deleteHandler}>
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
