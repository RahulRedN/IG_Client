import { useEffect, useState } from "react";
import FindJobCard from "./FindJobCard";
import ImageHeader from "../ImageHeader";
import Filters from "./Filters";

import { setFav } from "../../../redux/jobseekerReducer";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NoJob from "./NoJob";

const FindJobs = () => {
  const [parmas, setParam] = useSearchParams();
  const jobId = parmas.get("jobId");
  const filter = parmas.get("filter");

  const user = useSelector((state) => state.jobseeker);

  const [state, setState] = useState({
    data: {},
    jobs: [],
  });

  useEffect(() => {
    setState({
      data: user?.data,
      jobs: jobId
        ? user?.jobs.filter((job) => job._id == jobId)
        : filter
        ? user?.jobs.filter((job) =>
            job.position.toLowerCase().includes(filter.toLowerCase())
          )
        : user?.jobs,
    });
  }, [user]);

  const dispatch = useDispatch();

  const setFavHandler = async (jobId) => {
    let favJobs = [...state.data.fav];

    // Check if jobId is already in favJobs
    const index = favJobs.indexOf(jobId);

    if (index !== -1) {
      favJobs = [...favJobs.slice(0, index), ...favJobs.slice(index + 1)];
    } else {
      favJobs = [...favJobs, jobId];
    }
    console.log(favJobs);
    dispatch(setFav(favJobs));
  };

  return (
    <div className="bg-gray-50 pb-5 m-0">
      <ImageHeader src={"FindJobs"} />
      <div className="ml-[15rem] mt-5 flex flex-wrap gap-10 relative">
        <Filters jobs={user?.jobs} setState={setState} />
        <div className="m-1 flex-[11] flex flex-wrap gap-2">
          {state.jobs?.map((job, idx) => (
            <FindJobCard
              key={idx}
              job={job}
              fav={state.data?.fav}
              uid={state.data?.uid}
              setFavHandler={setFavHandler}
            />
          ))}
          {state.jobs.length == 0 && <NoJob />}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
