import React from "react";
import { RiCheckboxBlankFill } from "react-icons/ri";

const Table_RecentUsers_Row = ({ role }) => {
  let color;

  if (role === "Company") {
    color = "text-emerald-500";
  } else if (role === "JobSeeker") {
    color = "text-blue-500";
  }

  return (
    <tr className="border-b border-gray-200">
      <td className="pl-3 py-3 text-sm">
        <div className="flex gap-x-3 items-center">
          <RiCheckboxBlankFill size={20} className={color} />
          <p className="text-inherit">{role}</p>
        </div>
      </td>
      <td className="pl-3 py-3 text-sm">
        <p className="text-inherit">Pavan Kumar</p>
      </td>
      <td className="pl-3 py-3 text-sm">pavan@gmail.com</td>
      <td className="pl-3 py-3 text-sm">25th July,2019</td>
    </tr>
  );
};

export default Table_RecentUsers_Row;
