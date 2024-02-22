import ReviewCard from "./ReviewCard";

const Reviews = () => {
  return (
    <div className="h-full p-3 bg-gray-50">
      <h1>REVIEWS</h1>

      <div className="mt-10 flex flex-wrap justify-around gap-x-3 gap-y-10">
        <ReviewCard content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur provident exercitationem nihil in, consectetur, repudiandae rerum delectus eaque quos numquam ad nesciunt ullam earum corporis iusto enim quod amet architecto!5 gwrfiu wegfiu weuig weufg wefg weiufg wefuigh wefuigh weuihf uihwsdf." />

        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};

export default Reviews;
