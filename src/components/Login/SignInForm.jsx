/* eslint-disable react/prop-types */
import { useState } from "react";

import styles from "../../pages/css/Login_SignUp.module.css";
import { useNavigate } from "react-router-dom";
// import GoogleButton from "../UI/GoogleButton/GoogleButton";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";

const SignInForm = () => {
  const [credentials, SetCred] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const onSubmit = async () => {
    const { email, password } = credentials;
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Enter all the fields");
    } else {
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER + "/api/auth/loginJobseeker",
          credentials
        );
        console.log(res.cookie);
        localStorage.setItem("token", res.data.cookie);
        if (res.status === 200) {
          toast.success("Logged in Successful");
          nav("/jobseeker");
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
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className={styles["sign-in-form"]}>
      <h2 className={styles.title}>Sign in</h2>
      <div className={styles["input-field"]}>
        <span className={styles.fIcon}>
          <EmailIcon color="gray.600" className="flex text-2xl" />
        </span>
        <input
          type="email"
          name="email"
          onChange={(e) => {
            SetCred((state) => ({ ...state, email: e.target.value }));
          }}
          placeholder="Email"
        />
      </div>
      {/* {errors.email && <span className="text-warning">This field is required</span>} */}
      <div className={styles["input-field"]}>
        <span className={styles.fIcon}>
          <LockIcon color="gray.600" className="text-2xl" />
        </span>
        <input
          onChange={(e) => {
            SetCred((state) => ({ ...state, password: e.target.value }));
          }}
          type="password"
          placeholder="Password"
        />
      </div>
      {/* {errors.password && <span className="text-warning">This field is required</span>} */}
      <button
        type="button"
        className=" bg-sky-500 hover:bg-sky-600 shadow-lg mt-5 w-[20vw] h-12 rounded-lg text-white font-semibold"
        onClick={onSubmit}
      >
        SIGN IN
      </button>
      {/* <p className={styles["social-text"]}>Or </p>
      <GoogleButton
        isLoading={isLoading}
        onClickHandler={googleSignInHandler}
      /> */}
      {/* <SocialMedia handleResponse={handleResponse}/> */}
    </form>
  );
};

export default SignInForm;
