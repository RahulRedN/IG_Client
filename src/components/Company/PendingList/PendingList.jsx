import classes from "./PendingList.module.css";
import Skillbox from "./Skillbox";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { db } from "../../../Firebase/config";
import { doc, collection, getDoc, updateDoc } from "firebase/firestore";
import { setStatus } from "../../../redux/companyReducer";

import toast from "react-hot-toast";
import { Box } from "@mui/material";

const PendingList = ({ status }) => {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.company.jobs);
  const [pending, setPending] = useState([]);


  return (
    <Box className="max-h-full" id="PendingList">
      <div className={classes.container}>
        <h2>My Applications</h2>
        <div className="rounded-md border-[1px] border-gray-300 w-[75vw]">
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
                const date = new Date(pend.status[pend.id].date);
                return (
                  <tr
                    className="border-gray-200 hover:bg-gray-100 text-center text-[2rem]"
                    key={idx}
                  >
                    <td>{pend.fname}</td>
                    <td className="border-gray-200 hover:bg-gray-100">
                      <h1>{pend.position}</h1>
                    </td>
                    <td>{date.toLocaleDateString("en-IN")}</td>
                    <td>
                      <div className="flex justify-start gap-3 align-baseline">
                        {pend.skills.split(",").slice(0,3).map((skill, idx) => (
                          <Skillbox index={idx} skill={skill} key={idx} />
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="flex gap-3 justify-center">
                        <button
                          className={
                            "pr-2 pl-2 pt-1.5 pb-1.5 rounded-md text-white bg-emerald-300  border-emerald-300 hover:bg-white hover:cursor-pointer hover:text-emerald-800 hover:border-emerald-800 hover:border-[1px]"
                          }
                          onClick={() => {
                            acceptHandler(pend.jobId, pend.id, pend.status);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className={
                            "pr-2 pl-2 pt-1.5 pb-1.5 rounded-md text-white bg-red-400 hover:bg-white hover:cursor-pointer hover:text-red-800 hover: bg-white-800 hover:border-red-800 hover:border-[1px]"
                          }
                          onClick={() => {
                            rejectHandler(pend.jobId, pend.id, pend.status);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {pending.length == 0 && (
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
