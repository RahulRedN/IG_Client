import classes from "../AboutSections/Styles/Aboutusimg.module.css";
import video from "../AboutSections/Resources/video button.gif";

const Aboutusimg = () => {
  return (
    <div className={classes.about_us_img_container}>
      <div className={classes.text_container}>
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
