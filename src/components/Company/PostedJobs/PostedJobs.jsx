/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../Dashboard/Header";
import { DeleteForeverSharp, DeleteSharp } from "@mui/icons-material";
import { SearchCheck, SearchCode } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { removeJob } from "../../../redux/companyReducer";
import toast from "react-hot-toast";

import { db } from "../../../Firebase/config";
import { collection, deleteDoc, doc } from "firebase/firestore";

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

  return (
    <div className="m-[20px]">
      <Header
        title="Posted Jobs"
        subtitle="Here are the jobs posted by you on our platform"
      />
      <div className="flex flex-wrap">
        {jobState
          ?.sort((a, b) => {
            const dateA = new Date(a.postedDate);
            const dateB = new Date(b.postedDate);
            return dateB - dateA;
          })
          .map((job, idx) => {
            const date = new Date(job.postedDate);
            return (
              <div
                className="rounded-md m-3 bg-white shadow-lg w-[31%]"
                key={idx}
              >
                <div className="px-6 py-4 flex justify-between">
                  <div className="w-0 flex-1">
                    <div className="flex justify-between max-h-40 mt-1 text-xs text-gray-500">
                      <p>Posted on : {date.toDateString("en-IN")}</p>
                      <button
                        onClick={() => {
                          deleteJobHandler(job.id);
                        }}
                      >
                        <DeleteSharp sx={{ color: "red", fontSize: "30px" }} />
                      </button>
                    </div>
                    <p>
                      <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                        {job.position}
                      </h1>
                    </p>
                    <div className="relative text-sm max-h-40 w-full overflow-clip">
                      ₹ {Number(job.salary).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
                  <div className="flex justify-between">
                    <div className="flex  gap-8">
                      <div className="flex gap-1">
                        <SearchCode />
                        <h1 className="text-sm">Applicants : 890</h1>
                      </div>
                      <div className="flex gap-1">
                        <SearchCheck />
                        <h1>Vacancies : {job.vacancies}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostedJobs;
