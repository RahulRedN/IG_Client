/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";

import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token)
    return <Navigate to={role == "jobseeker" ? "/login" : "/loginCompany"} />;

  const decoded = jwtDecode(token);
  console.log(decoded.role);

  const now = new Date(),
    exp = new Date(decoded.exp);

  if (exp > now) {
    localStorage.removeItem("token");
    return <Navigate to={role == "jobseeker" ? "/login" : "/loginCompany"} />;
  }

  if (decoded.role == "Admin" && role == "admin") {
    return children;
  } else if (decoded.role == "Admin" && role != "admin") {
    return <Navigate to={"/admin/home"} />;
  } else if (role == "Admin") {
    return <Navigate to={"/"} />;
  }

  return decoded.role == role ? (
    children
  ) : (
    <Navigate to={role == "jobseeker" ? "/login" : "/loginCompany"} />
  );
};
export default PrivateRoute;
