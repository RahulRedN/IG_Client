import ProfileNavbar from "./ProfileNavbar";
import classes from "./JobFeed.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import JobFeedCard from "./JobFeedCard";

import axios from "axios";

const JobFeed = () => {
  const applications = useSelector(
    (state) => state.jobseeker.data.applications
  );
  const jobs = useSelector((state) => state.jobseeker.jobs);

  const [applied, setApplied] = useState([]);

  const [applStatus, setApplStatus] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const jobIds = applications.map((app) => app.jobId);
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER + "/api/jobseeker/noofapplications",
          { jid: jobIds },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (res.status == 200) {
          setApplStatus(res.data.applications);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [applications]);

  useEffect(() => {
    const appliedJobs = jobs
      .filter((job) => applications.some((app) => app.jobId === job._id))
      .map((job) => {
        const application = applications.find((app) => app.jobId === job._id);
        return {
          ...job,
          application: application || null,
        };
      });

    setApplied(appliedJobs);
  }, [applications, jobs]);

  const searchHandler = (value) => {
    setApplied((state) => {
      if (value.trim() != "") {
        const newState = jobs.filter((job) =>
          job.position.toLowerCase().includes(value.trim().toLowerCase())
        );

        return newState;
      } else {
        return jobs;
      }
    });
  };

  return (
    <div className="max-h-full" id="jobFeed">
      <ProfileNavbar searchHandler={searchHandler} />
      <div className={classes.container}>
        <div className="mt-5 w-[90%] flex justify-between items-center shadow p-4 rounded">
          <h1 className="text-3xl font-[600] ">My Applications</h1>
          <div className="flex">
            <p>
              Profile &gt;{" "}
              <span className="text-cyan-500">My Applications</span>
            </p>
          </div>
        </div>
        <div className="rounded-md border-[1px] border-gray-300 max-h-[70vh] overflow-y-auto ">
          <table className={classes.table}>
            <thead className="bg-blue-200">
              <tr>
                <td className="rounded-tl-md w-[25%]">COMPANY</td>
                <td className="w-[25%]">PROFILE</td>
                <td className="w-[15%]">APPLIED ON</td>
                <td className="w-[15%]">NUMBER OF APPLICANTS</td>
                <td className="rounded-tr-md w-[20%]">APPLICATION STATUS</td>
              </tr>
            </thead>
            <tbody>
              {applied.map((job, idx, feed) => {
                const date = new Date(job?.application?.createdAt);
                return (
                  <JobFeedCard
                    job={job}
                    idx={idx}
                    date={date}
                    key={idx}
                    status={job?.application?.status}
                    feedback={feed}
                    applicants={
                      applStatus?.length != 0 && applStatus[idx].count
                    }
                  />
                );
              })}
              {applied.length == 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    Empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobFeed;
