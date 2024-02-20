import React from "react";

import classes from "./JobSeeker.module.css";
import TopJobs from "./TopJobs";
import TopCategories from "./TopCategories";
import Testimonials from "./Testimonials";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  return (
    <>
      <div className={classes.sliderContainer}>
        <div className={classes.sliderText}>
          <div className={classes.sliderCaption}>
            <span>Easiest way to find a perfect job</span>
            <h1>
              <span>Find Your Next</span> <span>Dream Job</span>
            </h1>
            <button onClick={()=>{nav('findJobs')}} className={classes.find}>LOOKING FOR A JOB?</button>
          </div>
        </div>
        <div className={classes.sliderBG1}>
          <img src="/assets/bg-1.webp" alt="bg1" />
        </div>
        <div className={classes.sliderBG2}>
          <img src="/assets/bg-2.webp" alt="" />
        </div>
        <div className={classes.back}>JOBS</div>
      </div>
      <TopJobs />
      <TopCategories />
      <Testimonials />
    </>
  );
};

export default Home;
