import React from "react";

const RoleCard = ({index,role}) => {
  return (
    <p key={index} className="text-sm p-1 bg-gray-200 text-gray-500 rounded">
      {role}
    </p>
  );
};

export default RoleCard;
