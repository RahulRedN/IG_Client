/* eslint-disable react/prop-types */
import { useState } from "react";

import styles from "../../pages/css/Login_SignUp.module.css";
import GoogleButton from "../UI/GoogleButton/GoogleButton";
import { useAuth } from "../../Firebase/AuthContexts";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import axios from "axios";

const SignInForm = ({ signIn }) => {
  const [credentials, SetCred] = useState({ email: "", password: "" });
  const onSubmit = async () => {
    const { email, password } = credentials;
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Enter all the fields")
    }else {
      try {
        await signIn(email, password);
      } catch (error) {
        console.error(error.message);
        toast.error("Check your credentials again and try!")
      }
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const googleSignInHandler = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithGoogle();
      // const res = axios.post("http://localhost:8080/api/auth/login")

      if (res.user.uid) {
        setIsLoading(false);
        toast.success("Logged in!!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something wrong happened!");
      setIsLoading(false);
    }
  };
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
      <p className={styles["social-text"]}>Or </p>
      <GoogleButton
        isLoading={isLoading}
        onClickHandler={googleSignInHandler}
      />
      {/* <SocialMedia handleResponse={handleResponse}/> */}
    </form>
  );
};

export default SignInForm;
