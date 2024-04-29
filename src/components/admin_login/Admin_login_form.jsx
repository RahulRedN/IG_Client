/* eslint-disable no-unused-vars */
import React from "react";
import classes from "./admin_login.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Admin_login_form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submitHandler = async () => {
    var email = document.getElementById("email");
    var pass = document.getElementById("password");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email.value === "" || pass.value === "") {
      email.style = "border: 2px solid red";
      pass.style = "border: 2px solid red";
      return;
    } else {
      email.style = "border: 2px solid lightgray";
      pass.style = "border: 2px solid lightgray";
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER + "/api/auth/loginAdmin",
        { email: email.value, password: pass.value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem("token", res.data.cookie);

      if (res.status === 200) {
        toast.success("Logged in Successful");
        nav("/admin/home");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast(error.response.data.msg, {
          icon: <IoIosWarning />,
          style: {
            padding: "16px",
            color: "rgb(245 ,158 ,11)",
          },
          iconTheme: {
            primary: "rgb(245 ,158 ,11)",
            secondary: "#FFFAEE",
          },
        });
      }
      console.log(error);
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
