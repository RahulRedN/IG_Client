/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import Admin_login_form from "./Admin_login_form";
import classes from "./admin_login.module.css";

function Admin_Login() {
  return (
    <div className={classes.one}>
      <div className={classes.left_container}>
        {/* <p className="heading">ADMIN LOGIN PAGE</p> */}
        <img
          src="/assets/admin-animate.svg"
          alt=""
          style={{ width: "30rem" }}
          className={classes.svg}
        />
      </div>
      <div className={classes.right_container}>
        <div className={classes.login_card}>
          <div className={classes.logo_title}>
            {/* <img
              draggable={false}
              src="public\images\IG_logo_Dark.png"
              className="logo-title-image"
            /> */}
            <p className={classes.title}>
              Welcome, <span className="company_title">ADMIN</span>!
            </p>
          </div>
          <div className={classes.login_info}>
            <p className={classes.admin_quote}>
              "A great opera house isn't run by a director, but by a great
              administrator."
            </p>
            <p className={classes.login_info_subtitle}>
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
