import "../AboutSections/Styles/Aboutusimg.css";
import video from "../AboutSections/Resources/video button.gif";

const Aboutusimg = () => {
  return (
    <div className="about-us-img-container">
      <div className="text-container">
        <p>
          We Continue Helping Company <br />
          Finding The Right Employee
        </p>
        <button>
          {" "}
          <img src={video} alt="" />{" "}
        </button>
      </div>
    </div>
  );
};

export default Aboutusimg;
