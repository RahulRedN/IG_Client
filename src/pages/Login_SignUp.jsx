/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Link, useNavigate, Navigate } from "react-router-dom";
import styles from "./css/Login_SignUp.module.css";
import { useEffect, useState } from "react";

import SignInForm from "../components/Login/SignInForm";
import SignUpForm from "../components/Login/SignUpForm";

import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Login_SignUp = () => {
  const [isSignUp, setSignUp] = useState(false);
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);

    const now = new Date(),
      exp = new Date(decoded.exp);

    if (exp > now) {
      localStorage.removeItem("token");
    } else {
      if (decoded.role == "Admin") {
        return <Navigate to={"/admin/home"} />;
      }

      return decoded.role == "jobseeker" ? (
        <Navigate to="/jobseeker" />
      ) : (
        <Navigate to="/company" />
      );
    }
  }

  return (
    <div
      className={`${styles.fContainer} ${
        isSignUp ? styles["sign-up-mode"] : " "
      }`}
    >
      <Link to="/">
        <span className={styles.pageCloseBtn}>x</span>
      </Link>
      <div className={styles["forms-container"]}>
        <div className={styles["signIn-singUp"]}>
          <SignInForm />
          <SignUpForm />
        </div>
      </div>

      <div className={styles["panels-container"]}>
        <div className={`${styles.panel} ${styles["left-panel"]}`}>
          <div className={styles.content}>
            <h3>New here ?</h3>
            <p>
              Don't worry, we got you covered. Just sign up and start your
              journey with us.
            </p>
            <button
              className={`${styles.iBtn} ${styles.transparent}}`}
              onClick={() => setSignUp(true)}
            >
              Sign Up
            </button>
          </div>
          <img src={"/assets/left_panel.svg"} alt="" className={styles.pImg} />
        </div>

        <div className={`${styles.panel} ${styles["right-panel"]}`}>
          <img src={"/assets/right_panel.svg"} alt="" className={styles.pImg} />
          <div className={styles.content}>
            <h3>One of us ?</h3>
            <p>
              Already have an account? Just sign in and start your journey with
              us.
            </p>
            <button
              className={`${styles.iBtn} ${styles.transparent}}`}
              onClick={() => setSignUp(false)}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_SignUp;
