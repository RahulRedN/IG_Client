import logincompany from "./Resources/logincompany.jpg";
import { useState } from "react";
import "../LoginCompany/Styles/LoginCompany.css";
import { Checkbox } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IoIosWarning, IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Firebase/AuthContexts";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase/config";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import ButtonS from "../../UI/Button";

const LoginCompany = () => {
  const { signUp, signIn } = useAuth();

  const user = useSelector((state) => state.jobseeker.data);
  const company = useSelector((state) => state.company.data);

  const nav = useNavigate();

  if (company?.uid) {
    nav("/company");
  } else if (user?.uid) {
    nav("/jobseeker");
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
    console.log(login);
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
      await signIn(login.email, login.password);
      toast.success("Logged in successfully!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoadingR(true);
    console.log(register);

    if (
      register.name === "" ||
      register.email === "" ||
      register.password === ""
    ) {
      setIsLoadingR(false)
      toast.error("Fill all the fields");
      return;
    }

    if (errN || errE || errP) {
      setIsLoadingR(false)
      toast.error("Fill all the fields correctly");
      return;
    }

    const data = {
      email: register.email,
      name: register.name,
      role: "company",
    };

    try {
      const res = await signUp(register.email, register.password);

      if (res) {
        const collectionRef = collection(db, "users");
        await addDoc(collectionRef, { ...data, uid: res.user.uid });
        toast.success("Registered Successfully!");
        setIsLoadingR(false)
      }
    } catch (error) {
      setIsLoadingR(false)
      if (error.code == "auth/email-already-in-use") {
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
      } else if (error.code == "auth/invalid-email") {
        toast("Entered email is not valid ", {
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
      } else if (error.code == "auth/operation-not-allowed") {
        toast("Operation not allowed", {
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
      } else if (error.code == "auth/weak-password") {
        toast("Password is too weak", {
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
      console.error(error);
    }
    setIsLoadingR(false)
  };

  return (
    <div className="login-company">
      <Link to="/" className="left-3 top-3 absolute z-[100] flex items-center">
        <IoMdArrowBack className="text-3xl text-white" />
        <p className="text-white">Home</p>
      </Link>
      <div className="container_full">
        <img src={logincompany} className="img_bac" />
        <div className="login-form-wrapper">
          {isClicked ? (
            <motion.div key={1} className="flex flex-col gap-10 animate123">
              <h1 className="text-center tracking-wider"> Login</h1>
              <form className="login-form w-full">
                <label htmlFor="email">Email address</label>
                <input
                  className={`inputs ${
                    errEL ? "focus:bg-red-200 bg-red-200" : ""
                  }`}
                  type="email"
                  onChange={emailHandlerLogin}
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                />

                <label htmlFor="password"> Password</label>
                <input
                  className={`inputs ${
                    errPL ? "focus:bg-red-200 bg-red-200" : ""
                  }`}
                  type="password"
                  onChange={passwordHandlerLogin}
                  id="password"
                  name="password"
                  placeholder=" Enter Your password"
                  required
                />

                <div className="checkbox-div">
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

                <div className="register">
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
            <motion.div key={2} className="animate321">
              <h1 className="text-center"> Register</h1>
              <form className="login-form w-full">
                <label htmlFor="name">Name</label>
                <input
                  className={`inputs ${
                    errN ? "focus:bg-red-200 bg-red-200" : ""
                  }`}
                  type="text"
                  id="email"
                  name="email"
                  onChange={nameHandler}
                  placeholder="Enter Name"
                />
                <label htmlFor="email">Email address</label>
                <input
                  className={`inputs ${
                    errE ? "focus:bg-red-200 bg-red-200" : ""
                  }`}
                  type="email"
                  id="email"
                  name="email"
                  onChange={emailHandler}
                  placeholder="Enter Email"
                />

                <label htmlFor="password"> Password</label>
                <input
                  className={`inputs ${
                    errP ? "focus:bg-red-200 bg-red-200" : ""
                  }`}
                  type="password"
                  id="password"
                  name="password"
                  onChange={passwordHandler}
                  placeholder=" Enter Your password"
                />

                <div className="checkbox-div">
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

                <ButtonS isLoading={isLoadingR} onClickHandler={registerHandler}>
                  REGISTER
                </ButtonS>

                <hr />

                <div className="register">
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