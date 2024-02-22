/* eslint-disable react/prop-types */
import { Bookmark } from "lucide-react";
import photo from "../../../../public/images/tutoring.jpeg";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const ReviewCard = ({ content }) => {
  const [issave, setIssave] = useState(false);

  return (
    <div className="bg-white shadow-md flex gap-x-3 w-[40vw] py-3 pr-3 pl-2 rounded-md">
      <div className="flex items-center justify-center border-r px-2">
        <Bookmark
          className={`hover:cursor-pointer ${
            issave
              ? "fill-amber-500 text-amber-500 ease-out duration-300"
              : "text-gray-600"
          } `}
          onClick={() => {
            setIssave((prev) => !prev);
          }}
          strokeWidth={1}
          size={30}
        />
      </div>

      <div className="w-full flex flex-col gap-y-5">
        <div className="flex items-center justify-between pr-4">
          <div className="flex gap-x-3 items-center">
            <div className="rounded-full bg-red-300 w-fit">
              <img
                src={photo}
                className="h-10 w-10 object-cover rounded-full"
              />
            </div>
            <h1 className="font-extrabold">Pavan Kumar</h1>
            <h1 className="text-sm text-gray-400 font-thin">5 mins ago</h1>
          </div>
          <div className="flex items-center gap-x-1 text-red-500 hover:text-gray-600 hover:cursor-pointer">
            <MdDelete size={22} className="text-inherit" />
            <h1 className="text-lg text-inherit">Delete</h1>
          </div>
        </div>

        <p className="text-gray-500 pb-4 text-sm tracking-wide font-normal">
          {content}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
