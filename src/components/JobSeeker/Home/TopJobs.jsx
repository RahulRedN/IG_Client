import { Box } from "@chakra-ui/react";
import Slider from "react-slick";

import classes from "./TopJobs.module.css";
import TopJobCard from "../cards/TopJobCard";

import Counter from "../../UI/Counter";
import { useSelector } from "react-redux";

const TopJobs = () => {
  const jobs = useSelector((state) => state.jobseeker.jobs);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <span>
          <Counter from={0} to={100} duration={1} /> +
        </span>
        <h1>Browse From Our Top Jobs</h1>
      </div>
      <div className={classes.topJobs}>
        <Box
          position={"relative"}
          left={"0"}
          right={"0"}
          padding={"0rem 1rem"}
          width={"100vw"}
          height={"fit-content"}
          flexDirection={"row"}
        >
          <Slider {...settings}>
            {jobs?.slice(0, Math.min(7, jobs.length)).map((job, idx) => (
              <TopJobCard
                key={idx}
                position={job.position}
                jobDesc={job.jobDesc}
                jobId={job._id}
                sticker={!job.location}
              />
            ))}
          </Slider>
        </Box>
      </div>
    </div>
  );
};

export default TopJobs;
