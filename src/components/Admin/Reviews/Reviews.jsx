import ReviewCard from "./ReviewCard";

const Reviews = () => {
  return (
    <div className="h-full p-3 bg-gray-50">
      <h1>REVIEWS</h1>

      <div className="mt-10 flex flex-wrap justify-around gap-x-3 gap-y-10">
        <ReviewCard content="I found the job seeking website to be user-friendly with a clean interface, making it easy to navigate and apply for positions. The search filters were effective, and I appreciated the timely job alerts." />
        <ReviewCard content="The job seeking platform lacked some advanced features, and the response time from employers was a bit slow. However, the job matching algorithm was fairly accurate, providing relevant job suggestions based on my profile." />
      </div>
    </div>
  );
};

export default Reviews;
