/* eslint-disable react/prop-types */
import React from "react";
import Table_RecentUsers_Row from "./Table_RecentUsers_Row";

const Table_RecentUsers = ({ TableDataJob, TableDataCom }) => {
  return (
    <table className="mt-2 w-[100%] bg-white px-2 ">
      <thead className="bg-gray-100 h-8">
        <tr>
          <th className="text-left font-light py-2 text-sm w-[23%] pl-3">
            Role
          </th>
          <th className="text-left font-thin py-2 w-[28%] text-sm pl-3 ">
            Name
          </th>
          <th className="text-left font-thin py-2 w-[30%] text-sm pl-3">
            Email
          </th>
          <th className="text-left font-thin py-2 text-sm pl-3">
            Joining Date
          </th>
        </tr>
      </thead>
      <tbody>
        {TableDataJob?.map((data) => (
          <Table_RecentUsers_Row
            key={data._id}
            role={"JobSeeker"}
            name={data.fname}
            email={data.email}
            date={data.createdAt}
          />
        ))}
        {TableDataCom?.map((data) => (
          <Table_RecentUsers_Row
            key={data._id}
            role={"Company"}
            name={data.name}
            email={data.email}
            date={data.createdAt}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table_RecentUsers;
