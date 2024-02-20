import Cards from "./Cards";
import "./Styles/Ques.css";

const QuesCards = () => {
  return (
    <div className="whole-cont">
      <div className="top-cont">
        <h3> Our news </h3>
        <h1>
          Our Latest News <br /> That Can Help You
        </h1>

        <p>
          Explore insightful articles that can enrich your knowledge and <br />
          keep you informed about the latest happenings.
        </p>
      </div>
      <div className="bottom-cont">
        <Cards />
      </div>
    </div>
  );
};

export default QuesCards;
