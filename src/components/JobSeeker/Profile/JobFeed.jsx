import ProfileNavbar from "./ProfileNavbar";
import classes from "./JobFeed.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useAuth } from "../../../Firebase/AuthContexts";
import JobFeedCard from "./JobFeedCard";


const JobFeed = ({ status }) => {
  
  const user = useSelector((state) => state.jobseeker.data);
  const jobs = useSelector((state) => state.jobseeker.jobs)
    ?.filter((job) => job.status[user.id])
    .sort((a, b) => {
      const dateA = new Date(a.status[user.id].date);
      const dateB = new Date(b.status[user.id].date);

      return dateB - dateA;
    });

  const [applied, setApplied] = useState(jobs);

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
        <div className="rounded-md border-[1px] border-gray-300">
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

            
              {applied.map((job, idx , feed) => {
                const date = new Date(job.status[user?.id].date);
                return (
                  <>
                    <JobFeedCard
                      job={job}
                      idx={idx}
                      date={date}
                      key={idx}
                      status={job.status[user?.id].applied}
                      feedback={feed}
                    />


                  </>
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
