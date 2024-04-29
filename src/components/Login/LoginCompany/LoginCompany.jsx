/**
 * The `LoginCompany` component is responsible for rendering the login and registration forms for company users.
 * It handles user input validation, login and registration functionality, and navigation to the appropriate pages based on the user's role.
 *
 * The component uses various UI components from the Chakra UI library, as well as the `framer-motion` library for animations.
 * It also utilizes the `axios` library for making HTTP requests to the server for login and registration.
 *
 * The component manages the state of the login and registration forms, as well as various error states. It also handles loading states for the login and registration processes.
 *
 * The component renders either the login form or the registration form based on the value of the `isClicked` state. It also includes a link to the home page and a checkbox for "Remember me" functionality.
 *
 * The `loginHandler` function is responsible for handling the login process, including validating the input fields, making the login request to the server, and navigating to the appropriate page based on the user's role.
 *
 * The `registerHandler` function is responsible for handling the registration process, including validating the input fields, making the registration request to the server, and displaying a success message.
 */
/* eslint-disable no-unused-vars */
import logincompany from "./Resources/logincompany.jpg";
import classes from "../LoginCompany/Styles/LoginCompany.module.css";
import { useEffect, useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IoIosWarning, IoMdArrowBack } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ButtonS from "../../UI/Button";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginCompany = () => {
  const nav = useNavigate();
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

  const [isClicked, setIsClicked] = useState(true);
  const [errN, setErrN] = useState(false);
  const [errP, setErrP] = useState(false);
  const [errE, setErrE] = useState(false);

  const [errPL, setErrPL] = useState(false);
  const [errEL, setErrEL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingR, setIsLoadingR] = useState(false);

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  const emailHandler = (e) => {
    if (e.target.value === "" || !emailRegex.test(e.target.value)) {
      setErrE(true);
    } else {
      setErrE(false);
    }
    setRegister((state) => ({ ...state, email: e.target.value }));
  };

  const passwordHandler = (e) => {
    if (e.target.value === "") {
      setErrP(true);
    } else {
      setErrP(false);
    }
    setRegister((state) => ({ ...state, password: e.target.value }));
  };

  const nameHandler = (e) => {
    if (e.target.value === "") {
      setErrN(true);
    } else {
      setErrN(false);
    }
    setRegister((state) => ({ ...state, name: e.target.value }));
  };

  const emailHandlerLogin = (e) => {
    if (e.target.value === "" || !emailRegex.test(e.target.value)) {
      setErrEL(true);
    } else {
      setErrEL(false);
    }
    setLogin((state) => ({ ...state, email: e.target.value }));
  };

  const passwordHandlerLogin = (e) => {
    if (e.target.value === "") {
      setErrPL(true);
    } else {
      setErrPL(false);
    }
    setLogin((state) => ({ ...state, password: e.target.value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (login.email === "" || login.password === "") {
      setIsLoading(false);
      toast.error("Fill all the fields");
      return;
    }

    if (errEL || errPL) {
      setIsLoading(false);
      toast.error("Fill all the fields correctly");
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER + "/api/auth/loginCompany",
        login
      );
      localStorage.setItem("token", res.data.cookie);
      if (res.status === 200) {
        toast.success("Logged in Successful");
        nav("/company");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast("Email is already in use", {
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
      } else if (error.response.status === 401) {
        toast(error.response.data.msg, {
          icon: <IoIosWarning size={25} />,
          style: {
            width: "270px",
            color: "rgb(245 ,158 ,11)",
          },
        });
      }
      setIsLoading(false);
      console.error(error);
    }
    setIsLoading(false);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoadingR(true);

    if (
      register.name === "" ||
      register.email === "" ||
      register.password === ""
    ) {
      setIsLoadingR(false);
      toast.error("Fill all the fields");
      return;
    }

    if (errN || errE || errP) {
      setIsLoadingR(false);
      toast.error("Fill all the fields correctly");
      return;
    }

    const data = {
      email: register.email,
      name: register.name,
      password: register.password,
      role: "company",
    };

    try {
      const api = axios.create({
        baseURL: import.meta.env.VITE_SERVER + "/api/auth",
        withCredentials: true,
      });

      const res = await api.post("/registerCompany", data);

      if (res.status === 201) {
        toast.success("Registered successfully! Await admin approval!");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast("Email is already in use", {
          icon: <IoIosWarning />,
          style: {
            padding: "20px",
            color: "rgb(245 ,158 ,11)",
          },
          iconTheme: {
            primary: "rgb(245 ,158 ,11)",
            secondary: "#FFFAEE",
          },
        });
      }
      console.error(error);
    } finally {
      setIsLoadingR(false);
    }
  };

  return (
    <div className={classes.login_company}>
      <Link to="/" className="left-3 top-3 absolute z-[100] flex items-center">
        <IoMdArrowBack className="text-3xl text-white" />
        <p className="text-white">Home</p>
      </Link>
      <div className={classes.container_full}>
        <img src={logincompany} className={classes.img_bac} />
        <div className={classes.login_form_wrapper}>
          {isClicked ? (
            <motion.div key={1} className="flex flex-col gap-10 animate123">
              <h1 className="text-center tracking-wider"> Login</h1>
              <form className={classes.login_form + "  w-full"}>
                <label htmlFor="email">Email address</label>
                <input
                  className={
                    classes.inputs +
                    " " +
                    (errEL ? "focus:bg-red-200 bg-red-200" : "")
                  }
                  type="email"
                  onChange={emailHandlerLogin}
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                />

                <label htmlFor="password"> Password</label>
                <input
                  className={
                    classes.inputs +
                    " " +
                    (errPL ? "focus:bg-red-200 bg-red-200" : "")
                  }
                  type="password"
                  onChange={passwordHandlerLogin}
                  id="password"
                  name="password"
                  placeholder=" Enter Your password"
                  required
                />

                <div className={classes.checkbox_div}>
                  <Checkbox
                    className="text-black"
                    color={"blackAlpha.800"}
                    borderBlock={3}
                    borderColor={"blackAlpha.700"}
                  >
                    Remember me
                  </Checkbox>
                  <a href="#">Forgot password?</a>
                </div>

                <ButtonS isLoading={isLoading} onClickHandler={loginHandler}>
                  LOGIN
                </ButtonS>

                <hr />

                <div className={classes.register}>
                  <p>
                    Dont have an account?{" "}
                    <button
                      onClick={() => {
                        setIsClicked((prev) => !prev);
                      }}
                    >
                      Register here
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div key={2} className={classes.animate321}>
              <h1 className={classes.text_center}> Register</h1>
              <form className={classes.login_form + " w-full"}>
                <label htmlFor="name">Name</label>
                <input
                  className={
                    classes.inputs +
                    " " +
                    (errN ? "focus:bg-red-200 bg-red-200" : "")
                  }
                  type="text"
                  id="email"
                  name="email"
                  onChange={nameHandler}
                  placeholder="Enter Name"
                />
                <label htmlFor="email">Email address</label>
                <input
                  className={
                    classes.inputs +
                    " " +
                    (errE ? "focus:bg-red-200 bg-red-200" : "")
                  }
                  type="email"
                  id="email"
                  name="email"
                  onChange={emailHandler}
                  placeholder="Enter Email"
                />

                <label htmlFor="password"> Password</label>
                <input
                  className={
                    classes.inputs +
                    " " +
                    (errE ? "focus:bg-red-200 bg-red-200" : "")
                  }
                  type="password"
                  id="password"
                  name="password"
                  onChange={passwordHandler}
                  placeholder=" Enter Your password"
                />

                <div className={classes.checkbox_div}>
                  <Checkbox
                    className="text-black"
                    color={"blackAlpha.800"}
                    borderBlock={3}
                    borderColor={"blackAlpha.700"}
                  >
                    Remember me
                  </Checkbox>
                  <a href="#">Forgot password?</a>
                </div>

                <ButtonS
                  isLoading={isLoadingR}
                  onClickHandler={registerHandler}
                >
                  REGISTER
                </ButtonS>

                <hr />

                <div className={classes.register}>
                  <p>
                    {" "}
                    Already a user?{" "}
                    <button
                      className="transform"
                      onClick={() => {
                        setIsClicked((prev) => !prev);
                      }}
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginCompany;
