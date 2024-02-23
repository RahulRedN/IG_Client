import { useState } from "react";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const mockReviews = [
    {
      name : "mockPavan",
      ts : "2024/08/08",
      fav : "true",
      reviewContent : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur provident exercitationem nihil in, consectetur, repudiandae rerum delectus eaque quos numquam ad nesciunt ullam earum corporis iusto enim quod amet architecto!5 gwrfiu wegfiu weuig weufg wefg weiufg wefuigh wefuigh weuihf uihwsdf."
    },
    {
      name : "mockJoe",
      ts : "2024/12/08",
      fav : "false",
      reviewContent : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur provident exercitationem nihil in, consectetur"
    },
    {
      name : "mockStwey",
      ts : "2024/08/31",
      fav :"false",
      reviewContent : "earum corporis iusto enim quod amet architecto!5 gwrfiu wegfiu weuig weufg wefg weiufg wefuigh wefuigh weuihf uihwsdf."
    },
  ]
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('desc');
  const [showFavorites, setShowFavorites] = useState("all");

  // Filtered and sorted reviews based on search query, timestamp, and favorite status
  const filteredReviews = mockReviews.filter(review => {
    return review.name.toLowerCase().includes(searchQuery.toLowerCase());
  }).filter(review => {
    if (showFavorites === 'favorites') {
      return review.fav == "true";
    } else if (showFavorites === 'notFavorites') {
      return review.fav == "false";
    } else {
      return review; // Show all reviews
    }
  }).sort((a, b) => {
    const tsA = new Date(a.ts);
    const tsB = new Date(b.ts);

    if (sortBy === 'desc') {
      return tsB - tsA;
    } else {
      return tsA - tsB;
    }
  });

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
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border-2 border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 h-10 w-30 mr-2">
        <option value="desc">Sort by Newest</option>
        <option value="asc">Sort by Oldest</option>
      </select>

      {/* Favorite status filter */}
      <select value={showFavorites} onChange={(e) => setShowFavorites(e.target.value)}
      className="border-2 border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 h-10 w-30 mr-2">
        <option value="all">Show All Reviews</option>
        <option value="favorites">Show Favorites</option>
        <option value="notFavorites">Show Not Favorites</option>
      </select>

      </div>
      {/* </div> */}
      <div className="mt-10 flex  flex-wrap justify-around gap-x-3 gap-y-10">
        {        
                filteredReviews.map((review,idx)=>(
                  <ReviewCard review={review} />
                ))
        }
      </div>
    </div>
  );
};

export default Reviews;
