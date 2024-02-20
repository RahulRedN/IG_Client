import { useEffect, useState } from "react";
import FindJobCard from "./FindJobCard";
import ImageHeader from "../ImageHeader";
import Filters from "./Filters";

import { setFav } from "../../../redux/jobseekerReducer";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/config";
import { useSearchParams } from "react-router-dom";
import NoJob from "./NoJob";

const FindJobs = () => {
  const [parmas, setParam] = useSearchParams();
  const jobId = parmas.get("jobId");
  const filter = parmas.get("filter");

  const user = useSelector((state) => state.jobseeker);

  const [state, setState] = useState({
    data: user?.data,
    jobs: jobId
      ? user?.jobs.filter((job) => job.id == jobId)
      : filter
      ? user?.jobs.filter((job) =>
          job.position.toLowerCase().includes(filter.toLowerCase())
        )
      : user?.jobs,
  });

  const dispatch = useDispatch();

  const setFavHandler = async (favJobs) => {
    try {
      const tempData = { ...state.data, fav: favJobs };
      const docRef = doc(collection(db, "users"), state.data.id);
      await updateDoc(docRef, tempData);
    } catch (error) {
      console.log(error);
    }
    
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
