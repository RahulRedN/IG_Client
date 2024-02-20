/* eslint-disable no-unused-vars */
import React from "react";
import "./admin_login.css";
import { useState } from "react";

function Admin_login_form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    var email = document.getElementById('email');
    var pass = document.getElementById('password');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email.value === "" || !emailRegex.test(email) || pass.value === "") {
        email.style = "border: 2px solid red"
        pass.style = "border: 2px solid red"
    } else {
        email.style = "border: 2px solid lightgray"
        pass.style = "border: 2px solid lightgray"
    }
    // 
  }

  return (
    <form className="admin-login-form">
      <div className="input-field">
        <label>EMAIL</label>
        <input
          placeholder="Enter your email"
          type="email"
          name="email"id="email"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="input-field">
        <label>PASSWORD</label>
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
      <div className="form-submit">
        <button type="button" onClick={submitHandler}>Sign in</button>
      </div>
    </form>
  );
}

export default Admin_login_form;
