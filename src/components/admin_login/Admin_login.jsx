/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import Admin_login_form from "./Admin_login_form";
import "./admin_login.css";

function Admin_Login() {
  return (
    <div id="one">
      <div className="left-container">
        {/* <p className="heading">ADMIN LOGIN PAGE</p> */}
        <img
          src="public\assets\admin-animate.svg"
          alt=""
          style={{ width: "30rem" }}
        />
      </div>
      <div className="right-container">
        <div className="login-card">
          <div className="logo-title">
            <img
              draggable={false}
              src="public\images\IG_logo_Dark.png"
              className="logo-title-image"
            />
            <p className="title">
              Welcome, <span className="company-title">ADMIN</span>!
            </p>
          </div>
          <div className="login-info">
            <p className="admin-quote">
              "A great opera house isn't run by a director, but by a great
              administrator."
            </p>
            <p className="login-info-subtitle">
              Please sign-in to your account
            </p>

            <Admin_login_form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_Login;
