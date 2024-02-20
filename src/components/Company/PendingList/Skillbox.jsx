import React from "react";

const Skillbox = ({index,skill}) => {
  return (
    <p key={index} className="m-1 bg-gray-200 pl-3 pr-3 pt-2 pb-2 rounded-lg ">{skill}</p>
  );
};

export default Skillbox;
