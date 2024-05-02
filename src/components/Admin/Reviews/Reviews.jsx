import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

import axios from "axios";

const Reviews = () => {
  const [Reviews, setReviews] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_SERVER + "/api/admin/getAllTestimonials",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.status == 200) {
        setReviews(res.data.testimonials);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("desc");
  const [showFavorites, setShowFavorites] = useState("all");

  // Filtered and sorted reviews based on search query, timestamp, and favorite status
  const filteredReviews = Reviews.filter((review) => {
    return review.name.toLowerCase().includes(searchQuery.toLowerCase());
  })
    .filter((review) => {
      if (showFavorites === "favorites") {
        return review.fav == true;
      } else if (showFavorites === "notFavorites") {
        return review.fav == false;
      } else {
        return review; // Show all reviews
      }
    })
    .sort((a, b) => {
      const tsA = new Date(a.createdAt);
      const tsB = new Date(b.createdAt);

      if (sortBy === "desc") {
        return tsB - tsA;
      } else {
        return tsA - tsB;
      }
    });

  const toggleFavorite = (id) => {
    // Find the index of the review with the given name
    const index = Reviews.findIndex((review) => review._id === id);
    if (index !== -1) {
      // Create a copy of the mockReviews array
      const updatedReviews = [...Reviews];
      // Toggle the favorite status of the review at the given index
      updatedReviews[index] = {
        ...updatedReviews[index],
        fav: updatedReviews[index].fav ? false : true,
      };
      console.log(updatedReviews);
      // Update the state with the modified reviews array
      setReviews(updatedReviews);
    }
  };

  return (
    <div className="h-full p-3 bg-gray-50">
      {/* <div className="flex justify-between items-baseline"> */}
      <h1 className="text-3xl mb-4">REVIEWS</h1>

      <div className="flex items-baseline">
        <h2 className="text-lg mr-2">Filter By :</h2>
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10  border-2 mr-4 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
        />

        {/* Sorting options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border-2 border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 h-10 w-30 mr-2"
        >
          <option value="desc">Sort by Newest</option>
          <option value="asc">Sort by Oldest</option>
        </select>

        {/* Favorite status filter */}
        <select
          value={showFavorites}
          onChange={(e) => setShowFavorites(e.target.value)}
          className="border-2 border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 h-10 w-30 mr-2"
        >
          <option value="all">Show All Reviews</option>
          <option value="favorites">Show Favorites</option>
          <option value="notFavorites">Show Not Favorites</option>
        </select>
      </div>
      {/* </div> */}
      <div className="mt-10 flex  flex-wrap justify-around gap-x-3 gap-y-10">
        {filteredReviews.length === 0 ? (
          <p>No results found.</p>
        ) : (
          filteredReviews.map((review, idx) => (
            <ReviewCard
              key={idx}
              review={review}
              toggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
