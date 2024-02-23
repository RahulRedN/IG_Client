import React from "react";
import { RiCheckboxBlankFill } from "react-icons/ri";

const Table_RecentUsers_Row = ({ role, name, email, date }) => {
  let color;

  // const dateNew = new Date(date);

  // const formattedDate = new Intl.DateTimeFormat("en-US", {
  //   day: "2-digit",
  //   month: "long",
  //   year: "numeric",
  // }).format(dateNew);

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
        <p className="text-inherit">{name}</p>
      </td>
      <td className="pl-3 py-3 text-sm">{email}</td>
      <td className="pl-3 py-3 text-sm">
        {new Date(date).toDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "2-digit", // Use '2-digit' to display the year in a two-digit format (e.g., 24 instead of 2024)
        })}
      </td>
    </tr>
  );
};

export default Table_RecentUsers_Row;
