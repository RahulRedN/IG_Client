/* eslint-disable no-unused-vars */
import React from "react";
import classes from "./admin_login.module.css";
import { useState } from "react";

function Admin_login_form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    var email = document.getElementById("email");
    var pass = document.getElementById("password");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email.value === "" || !emailRegex.test(email) || pass.value === "") {
      email.style = "border: 2px solid red";
      pass.style = "border: 2px solid red";
    } else {
      email.style = "border: 2px solid lightgray";
      pass.style = "border: 2px solid lightgray";
    }
  };

  return (
    <form className={classes.admin_login_form}>
      <div className={classes.input_field}>
        <label className={classes.label}>EMAIL</label>
        <input
          placeholder="Enter your email"
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className={classes.input_field}>
        <label className={classes.label}>PASSWORD</label>
        <input
          placeholder="Enter your password"
          id="password"
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className={classes.form_submit}>
        <button type="button" onClick={submitHandler}>
          Sign in
        </button>
      </div>
    </form>
  );
}

export default Admin_login_form;
