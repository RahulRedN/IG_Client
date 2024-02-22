/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../Dashboard/Header";



import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { removeJob } from "../../../redux/companyReducer";
import toast from "react-hot-toast";

import { db } from "../../../Firebase/config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import JobCard from "./JobCard";

const PostedJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.company.jobs);

  let jobState = [...jobs];

  const deleteJobHandler = async (jobId) => {
    try {
      const docRef = doc(collection(db, "jobs"), jobId);
      const res = await deleteDoc(docRef);
      dispatch(removeJob(jobId));
      toast.success("Deleted Job!");
    } catch (error) {
      console.error(error);
      toast.error("An Error Occured!");
    }
  };

  //filters
  // Define state variables for filters and sorting
const [positionFilter, setPositionFilter] = useState("");
const [sortBy, setSortBy] = useState("");
const [sortOrder, setSortOrder] = useState("desc");

// Function to handle filtering by job position
const handlePositionFilter = (event) => {
  setPositionFilter(event.target.value);
};

// Function to handle sorting
const handleSortBy = (event) => {
  setSortBy(event.target.value);
};

// Function to handle changing sort order
const handleSortOrder = (event) => {
  setSortOrder(event.target.value);
};

// Apply filters and sorting to the jobState array
let filteredJobs = [...jobs];
if (positionFilter !== "") {
  filteredJobs = filteredJobs.filter((job) =>
    job.position.toLowerCase().includes(positionFilter.toLowerCase())
  );
}

if (sortBy !== "") {
  filteredJobs.sort((a, b) => {
   if(sortBy === "date"){
        const dateA = new Date(a.postedDate);
            const dateB = new Date(b.postedDate);
            return dateB - dateA;
   }
   else
    {if (sortOrder === "asc") {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }}
  }
  );
}
  console.log(filteredJobs)

  return (
    <div className="m-[20px] overflow-auto">
      <Header
        title="Posted Jobs"
        subtitle="Here are the jobs posted by you on our platform"
      />
      {/* filters */}
      <div className="flex justify-start items-center mb-4">
      <div className="flex items-center">
        <label className="mr-2 text-black text-base">Filter by Position:</label>
        <input
          type="text"
          value={positionFilter}
          onChange={handlePositionFilter}
          className="h-10  border-2 mr-4 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
          placeholder="Search by Position"
        />
      </div>
      <div className="flex items-center">
        <label className="mr-2 text-black text-base">Sort By:</label>
        <select onChange={handleSortBy} value={sortBy} className="border-2 border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 h-10 w-30 mr-2">
          <option value="date"  className="text-base">-- Select --</option>
          <option value="vacancies" className="text-base">Vacancies</option>
          <option value="salary" className="text-base">Salary</option>
          <option value="applicants" className="text-base">Applicants</option>
        </select>

        <select onChange={handleSortOrder} value={sortOrder} className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 h-10 w-30">
          <option value="desc" className="text-base">Descending</option>
          <option value="asc" className="text-base">Ascending</option>
        </select>
      </div>
    </div>
      <div className="flex flex-wrap">
        {filteredJobs
          // ?.sort((a, b) => {
          //   const dateA = new Date(a.postedDate);
          //   const dateB = new Date(b.postedDate);
          //   return dateB - dateA;
          // })
          .map((job, idx) => {
            const date = new Date(job.postedDate);
            return (
              <JobCard
                key={job.id}
                job={job}
                date={date}
                deleteJobHandler={deleteJobHandler}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PostedJobs;

