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

      <div className="mt-10 flex flex-wrap justify-around gap-x-3 gap-y-10">
        <ReviewCard content="I found the job seeking website to be user-friendly with a clean interface, making it easy to navigate and apply for positions. The search filters were effective, and I appreciated the timely job alerts." />
        <ReviewCard content="The job seeking platform lacked some advanced features, and the response time from employers was a bit slow. However, the job matching algorithm was fairly accurate, providing relevant job suggestions based on my profile." />
      </div>
    </div>
  );
};

export default Reviews;
