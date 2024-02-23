/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import Explore_Admin from "../../UI/Explore_Admin";
import PendingRowUser from "./PendingRowUser";
import { RiGraduationCapFill } from "react-icons/ri";

const Pending_Company = () => {
  const PCompany = [
    {
      name: "Facebook",
      email: "facebook@gmail.com",
      status: "pending",
    },
    {
      name: "Google",
      email: "google@gmail.com",
      status: "pending",
    },
    {
      name: "Youtube",
      email: "youtube@gmail.com",
      status: "pending",
    },
    {
      name: "InspiringGO",
      email: "topcompany@gmail.com",
      status: "pending",
    },
  ];

  const [idx,setIdx] = useState(0);

  return (
    <div className="p-3 h-full">
      <div className="flex gap-x-3">
        <h1 className="pb-3 font-[500] text-lg">Pending List</h1>
        <RiGraduationCapFill size={25} />
      </div>
      <Explore_Admin text={"Pending List"} />

      <table className="w-[99%] mt-4 bg-white">
        <thead className="bg-zinc-100 h-12">
          <tr>
            <th className="text-left font-light text-base py-3 px-6 w-[9%]">
              #
            </th>
            <th className="text-left font-light text-sm py-3 px-2 w-[14%]">
              Company Name
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[15%]">
              Email
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[12%]">
              Posted On
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[12%]">
              Status
            </th>

            <th className="text-left font-thin text-sm py-3 pl-8 pr-4 w-[10%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {PCompany.map((company,idx)=>{
            return (
              <PendingRowUser key={idx+1} idx={idx+1} name={company.name} email={company.email} status={company.status}/>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Pending_Company;
