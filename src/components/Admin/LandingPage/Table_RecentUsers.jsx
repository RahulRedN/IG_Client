import React from "react";
import Table_RecentUsers_Row from "./Table_RecentUsers_Row";

const Table_RecentUsers = () => {
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
        <Table_RecentUsers_Row role={"JobSeeker"}/>
        <Table_RecentUsers_Row role={"JobSeeker"}/>
        <Table_RecentUsers_Row role={"Company"}/>
        <Table_RecentUsers_Row role={"Company"}/>
        <Table_RecentUsers_Row role={"Company"}/>
        <Table_RecentUsers_Row role={"Company"}/>
        <Table_RecentUsers_Row role={"Company"}/>
      </tbody>
    </table>
  );
};

export default Table_RecentUsers;
