/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";

import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute = ({ children, role }) => {
  if (role == "jobseeker") {
    const user = useSelector((state) => state.jobseeker.data);

    return user?.uid ? children : <Navigate to={"/login"} />;
  } else if (role == "company") {
    const user = useSelector((state) => state.company.data);

    return user?.uid ? children : <Navigate to={"/loginCompany"} />;
  }
};
export default PrivateRoute;
