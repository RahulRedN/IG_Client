/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Company_RowUser from "./Company_RowUser";
import Explore_Admin from "../../UI/Explore_Admin";
import { RiBuildingFill, RiGraduationCapFill } from "react-icons/ri";
import axios from "axios";

const Company_User = () => {
  const [Company, setCompany] = useState([]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER + "/api/admin/getallcompanies"
        );

        console.log(res);
        setCompany(res.data.companies);
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      }
    };
    fetchCompany();
  }, []);

  const [idx, setIdx] = useState(0);

  return (
    <div className="p-3 h-full">
      <div className="flex gap-x-3">
        <h1 className="pb-3 font-[500] text-lg">Company Users</h1>
        <RiBuildingFill size={25} />
      </div>
      <Explore_Admin text={"Company"} />

      <table className="w-[99%] mt-4 bg-white">
        <thead className="bg-zinc-100 h-12">
          <tr>
            <th className="text-left font-light text-base py-3 px-2 w-[6%]">
              #
            </th>
            <th className="text-left font-light text-sm py-3 px-2 w-[16%]">
              Name
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[18%]">
              Email
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[14%]">
              # of Employees
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[14%]">
              # of Jobs Posted
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[12%]">
              Status
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[14%]">
              Date of Joining
            </th>
            <th className="text-left font-thin text-sm py-3 pr-4 w-[8%]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Company.map((company, idx) => {
            return (
              <Company_RowUser
                key={idx + 1}
                idx={idx + 1}
                name={company.name}
                email={company.email}
                status={company.status}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Company_User;
