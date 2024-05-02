/* eslint-disable react/prop-types */
import { Bookmark } from "lucide-react";
import axios from "axios";

const ReviewCard = ({ review, toggleFavorite }) => {
  const handleToggleFavorite = async (id) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_SERVER +'/api/admin/updateFavoriteTestimonial',
        { tid: id, isFavorite: !review.fav},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        } 
      );
      console.log(res.data); // Log the response for debugging
      toggleFavorite(id); // Update the UI state after successful API call
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Handle error (e.g., show error message to the user)
    }
  };
  return (
    <div className="bg-white shadow-md flex gap-x-3 w-[40vw] py-3 pr-3 pl-2 rounded-md min-h-48">
      <div className="flex items-center justify-center border-r px-2">
        <Bookmark
          className={`hover:cursor-pointer ${
            review.fav
              ? "fill-amber-500 text-amber-500 ease-out duration-300"
              : "text-gray-600"
          } `}
          onClick={() => {
            // should be added to server
            handleToggleFavorite(review._id);
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
                src={review.imageurl} //should be a profilepic of user , will be coming in response
                className="h-10 w-10 object-cover rounded-full"
              />
            </div>
            <h1 className="font-extrabold">{review.name} </h1>
            <h1 className="text-sm text-gray-400 font-thin">
              {new Date(review.createdAt).toLocaleString()}
            </h1>
          </div>
          <div className="flex items-center gap-x-1 text-red-500 hover:text-gray-600 hover:cursor-pointer">
            {/* <MdDelete size={22} className="text-inherit" />
            <h1 className="text-lg text-inherit">Delete</h1> */}
          </div>
        </div>

        <p className="text-gray-500 pb-4 text-sm tracking-wide font-normal">
          {review.message}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
