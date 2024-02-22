import classes from "./PendingList.module.css";
import Skillbox from "./Skillbox";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import toast from "react-hot-toast";
import axios from "axios";
import { setStatus } from "../../../redux/companyReducer";
import { Box } from "@mui/material";

const PendingList = ({ status }) => {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.company.jobs);
  const applications = useSelector((state) => state.company.applications);
  const users = useSelector((state) => state.company.users);

  const [pending, setPending] = useState([]);

  useEffect(() => {
    const pendingApplications = applications
      ?.filter((app) => app.status === "pending")
      .map((app) => {
        const jobDetails = jobs.find((job) => job._id === app.jobId);
        const userDetails = users.find((user) => user._id === app.userId);

        return {
          ...app,
          jobDetails: jobDetails || null,
          userDetails: userDetails || null,
        };
      });

    setPending(pendingApplications);
  }, [applications, jobs]);

  console.log(pending);

  const acceptHandler = async (appId, jobId) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER + "/api/company/updateJobRequest",
        { appId: appId, action: "accept" }
      );
      if (res.status == 200) {
        toast.success("User Accepted!");
        dispatch(setStatus({ appId, jobId, action: "accepted" }));
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured : " + error.response.data.msg);
    }
  };

  const rejectHandler = async (appId, jobId) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER + "/api/company/updateJobRequest",
        { appId: appId, action: "reject" }
      );
      if (res.status == 200) {
        toast.success("User Rejected!");
        dispatch(setStatus({ appId, jobId, action: "rejected" }));
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured : " + error.response.data.msg);
    }
  };

  return (
    <Box className="max-h-full" id="PendingList">
      <div className={classes.container}>
        <h2>My Applications</h2>
        <div className="rounded-md border-[1px] border-gray-300 w-fit">
          <table className={classes.table}>
            <thead className="bg-gray-400 h-16 text-center">
              <tr>
                <td className="rounded-tl-md w-[15%]">Username</td>
                <td className="w-[15%]">POSITION</td>
                <td className="w-[15%]">APPLIED ON</td>
                <td className="w-[30%]">SKILLS</td>
                <td className="rounded-tr-md w-[25%]">APPLICATION STATUS</td>
              </tr>
            </thead>
            <tbody>
              {pending?.map((pend, idx) => {
                const date = new Date(pend.createdAt);
                return (
                  <tr
                    className="border-gray-200 hover:bg-gray-100 text-center text-[2rem]"
                    key={pend._id}
                  >
                    <td>{pend.userDetails.fname}</td>
                    <td className="border-gray-200 hover:bg-gray-100">
                      <h1>{pend.jobDetails.position}</h1>
                    </td>
                    <td>{date.toLocaleDateString("en-IN")}</td>
                    <td>
                      <div className="flex justify-start gap-3 align-baseline">
                        {pend.userDetails.skills
                          .slice(0, 3)
                          .map((skill, idx) => {
                            const [id, name, stage] = skill.split(";");
                            return (
                              <Skillbox
                                index={idx}
                                skill={name + "(" + stage + ")"}
                                key={idx}
                              />
                            );
                          })}
                      </div>
                    </td>

                    <td>
                      <div className="flex gap-3 justify-center">
                        <button
                          className={
                            "pr-2 pl-2 pt-1.5 pb-1.5 rounded-md text-white bg-emerald-300  border-emerald-300 hover:bg-white hover:cursor-pointer hover:text-emerald-800 hover:border-emerald-800 hover:border-[1px]"
                          }
                          onClick={() => {
                            acceptHandler(pend._id, pend.jobId);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className={
                            "pr-2 pl-2 pt-1.5 pb-1.5 rounded-md text-white bg-red-400 hover:bg-white hover:cursor-pointer hover:text-red-800 hover: bg-white-800 hover:border-red-800 hover:border-[1px]"
                          }
                          onClick={() => {
                            rejectHandler(pend._id, pend.jobId);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {pending?.length == 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    No pending applications!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Box>
  );
};

export default PendingList;
