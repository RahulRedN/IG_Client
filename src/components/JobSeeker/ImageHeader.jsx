import { Link } from "react-router-dom";
import contactUs from "../../Resources/Contact_us.jpg";
import FindJob from "../../Resources/Finding_Jobs.jpg";
import Aboutus from "../../Resources/aboutus_top.jpg"
import { ChevronRight } from "lucide-react";

import classes from "./ImageHeader.module.css";

const ImageHeader = ({ src }) => {
  let img;
  let content;

  if (src === "contactus") {
    img = contactUs;
    content = "Contact Us";
  } else if (src === "FindJobs") {
    img = FindJob;
    content = "Browse Jobs";
  } else if (src === "aboutus") {
    img = Aboutus;
    content = "About us";
  }

  return (
    <div className="h-[45vh] w-full">
      <div className="relative bg-[#092a49] w-full h-full">
        <img src={img} alt="Contact Us" className={classes.image} />
        <div className="absolute inset-0 flex flex-col gap-8 text-white items-center justify-center">
          <h1 className="text-3xl font-[700] tracking-wider uppercase sm:text-6xl">{content}</h1>
          <div className="flex items-center gap-3">
            <Link className="sm:text-2xl text-base">Home</Link>
            <ChevronRight size={29} strokeWidth={4} />
            <Link className="sm:text-2xl text-base">{content}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageHeader;
