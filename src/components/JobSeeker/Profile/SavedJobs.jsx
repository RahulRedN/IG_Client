/* eslint-disable no-unsafe-optional-chaining */
import { useState, useEffect } from "react";
import SavedJobCard from "./SavedJobCard";
import { useSelector } from "react-redux";
const SavedJobs = () => {
  const user = useSelector((state) => state.jobseeker);

  const [state, setState] = useState({ fav: [], jobs: [] });

  useEffect(() => {
    setState({ fav: user?.data.fav, jobs: user?.jobs });
  }, [user]);

  console.log(state.jobs);

  const scrollLeft = () => {
    var scrollContainer = document.getElementById("scrollContainer");
    scrollContainer.scrollLeft -= 400;
  };

  const scrollRight = () => {
    var scrollContainer = document.getElementById("scrollContainer");
    scrollContainer.scrollLeft += 400;
  };

  return (
    <div id="saved" className="flex justify-center items-center h-screen p-3">
      <div className="h-full w-full border p-1">
        <div className="flex justify-between items-center shadow p-3 rounded">
          <h1 className="text-3xl font-[600] ">Saved Jobs</h1>
          <div className="flex">
            <p>
              Profile &gt; <span className="text-cyan-500">Saved Jobs</span>
            </p>
          </div>
        </div>
        <div
          id="scrollContainer"
          className="mt-5 h-[79vh] p-2 flex flex-col flex-wrap gap-y-10 gap-x-6 overflow-y-auto scrollbar-none"
        >
          {state.jobs
            ?.filter((job) => state.fav.includes(job._id))
            .map((jobCard, idx) => (
              <SavedJobCard key={idx} job={jobCard} />
            ))}
          {(state.jobs?.filter((job) => state.fav.includes(job._id))).length ==
          0
            ? "No jobs found!"
            : ""}
        </div>
        <div className="flex justify-between px-52">
          <div className="bg-gray-300 rounded hover:bg-gray-400">
            <button
              className="text-black p-2 rounded-md hover:text-white"
              onClick={scrollLeft}
            >
              &lt; Previous
            </button>
          </div>
          <div className="bg-gray-300 rounded hover:bg-gray-400">
            <button
              className="text-black p-2 rounded-md hover:text-white"
              onClick={scrollRight}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
