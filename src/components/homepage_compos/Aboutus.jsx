import "../../Styles/AboutUs.css";
// import { Link } from "react-router-dom";
// import QuesCards from "../AboutUs/TeamCard/QuesCards";
import AboutUsTop from "../AboutUs/AboutSections/AboutUsTop";
import AboutUsTop2 from "../AboutUs/AboutSections/AboutUsTop2";
import AboutUsTop3 from "../AboutUs/AboutSections/AboutUsTop3";
import Services from "../AboutUs/AboutSections/Services";
import Aboutusimg from "../AboutUs/AboutSections/Aboutusimg";
import ImageHeader from "../JobSeeker/ImageHeader";

const AboutUs = () => {
  return (
    <div className="aboutus-page">
      <ImageHeader src = {"aboutus"}/>

      <AboutUsTop />
      <div className="top2-top3">
        <AboutUsTop2 />
        <AboutUsTop3 />
      </div>
      <Aboutusimg />

      <Services />
      {/* <Testimonial /> */}

      {/* <QuesCards /> */}
    </div>
  );
};

export default AboutUs;
