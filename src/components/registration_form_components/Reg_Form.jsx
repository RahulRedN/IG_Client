/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Reg_Form.module.css";
import Form_Header from "./Form_Header";
import NextPrevButton from "./NextPrevButton";
import countryList from "./countryList";

import { motion } from "framer-motion";
import { useAuth } from "../../Firebase/AuthContexts";
import { addDoc } from "firebase/firestore";

import toast from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";
import axios from "axios";
import { Upload } from "lucide-react";

// eslint-disable-next-line react/prop-types
const Reg_Form = ({ className }) => {
  const [val, setVal] = useState(<>&nbsp;</>);

  const nav = useNavigate();

  const [backAnimate, setBackAnimate] = useState(true);
  var index = 0;
  const countryMap = countryList.map((country, index) => {
    index = index + 1;
    return (
      <option key={index} value={country}>
        {country}
      </option>
    );
  });

  const [tab, setTab] = useState(0);
  const [Data, SetData] = useState({
    fname: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
    gender: "-1",
    nationality: "-1",
    marital: "-1",
    qualification: "-1",
    i_name: "",
    yoa: "",
    yoc: "",
    password1: "",
    password2: "",
    image: null,
    resume: null,
  });

  const nextTab = (event) => {
    event.preventDefault();

    if (tab == 0) {
      if (!stepOneVal()) {
        return;
      }
    } else if (tab == 1) {
      if (!stepTwoVal()) {
        return;
      }
    } else if (tab == 2) {
      if (!stepThreeVal()) {
        return;
      }
    }

    if (tab < steps.length - 1) {
      setBackAnimate(true);
      setTab(tab + 1);
    }
  };

  const prevTab = (event) => {
    event.preventDefault();
    if (tab > 0) {
      setVal(<>&nbsp;</>);
      setBackAnimate(false);
      setTab(tab - 1);
    }
  };

  const isLastStep = (tab) => {
    if (tab === steps.length - 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!stepFourVal()) {
      return;
    }

    const {
      email,
      password1,
      fname,
      mobile,
      address,
      nationality,
      dob,
      gender,
      marital,
      qualification,
      i_name,
      yoa,
      yoc,
      image,
      resume,
    } = Data;

    const newData = new FormData();
    newData.append("email", email);
    newData.append("password", password1);
    newData.append("fname", fname);
    newData.append("mobile", mobile);
    newData.append("address", address);
    newData.append("nationality", nationality);
    newData.append("dob", dob);
    newData.append("gender", gender);
    newData.append("marital", marital);
    newData.append("qualification", qualification);
    newData.append("i_name", i_name);
    newData.append("yoa", yoa);
    newData.append("yoc", yoc);
    newData.append("image", image);
    newData.append("resume", resume);

    try {
      const api = axios.create({
        baseURL: import.meta.env.VITE_SERVER + "/api/auth",
        withCredentials: true,
      });

      const res = await api.post("/registerJobseeker", newData);

      if (res.status === 201) {
        localStorage.setItem("token", res.data.cookie);
        toast.success("Registered successfully!");
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
      }
      console.error(error);
    }
    return;
  };

  const steps = [
    // Step One
    <motion.div
      initial={{ opacity: 0.3, x: backAnimate ? 200 : -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={classes.step}
      key={0}
    >
      <p className="text-md text-gray-900 leading-tight text-center mb-5 text-4xl">
        Register
      </p>

      <p className="text-red-400 mb-2 text-center">{val}</p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Full Name"
          name="fname"
          id="fname"
          defaultValue={Data.fname}
          onChange={(event) => SetData({ ...Data, fname: event.target.value })}
          className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />
      </div>

      <div className="mb-6">
        <input
          type="number"
          placeholder="Mobile Number"
          name="mobile"
          id="mobile"
          defaultValue={Data.mobile}
          onChange={(event) => SetData({ ...Data, mobile: event.target.value })}
          className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Address"
          name="address"
          id="address"
          defaultValue={Data.address}
          onChange={(event) =>
            SetData({ ...Data, address: event.target.value })
          }
          className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />
      </div>
    </motion.div>,

    //   Step Two
    <motion.div
      initial={{ opacity: 0.3, x: backAnimate ? 200 : -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={classes.step}
      key={1}
    >
      <p className="text-red-400 mb-2 text-center">{val}</p>

      <div className="mb-6">
        <label>DOB</label>
        <input
          type="date"
          name="dob"
          id="dob"
          onChange={(event) => SetData({ ...Data, dob: event.target.value })}
          className={
            "w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200 "
          }
        />
      </div>

      <div className="mb-6">
        <label>Gender</label>
        <select
          name="gender"
          className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
          id="gender"
          defaultValue={Data.gender}
          onChange={(event) => SetData({ ...Data, gender: event.target.value })}
        >
          <option value="-1">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label>Nationality</label>
        <select
          name="Nationality"
          className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
          id="nationality"
          defaultValue={Data.nationality}
          onChange={(event) =>
            SetData({ ...Data, nationality: event.target.value })
          }
        >
          <option value="-1">-- Select --</option>
          {countryMap}
        </select>
      </div>

      <div className={"mb-6 "}>
        <label>Marital Status</label>
        <select
          name="Marital-Status"
          className={
            "w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200 "
          }
          id="marital"
          defaultValue={Data.marital}
          onChange={(event) =>
            SetData({ ...Data, marital: event.target.value })
          }
        >
          <option value="-1">-- Select --</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="seperated">Seperated</option>
          <option value="widowed">Widowed</option>
        </select>
      </div>
    </motion.div>,

    //   Step Three
    <motion.div
      initial={{ opacity: 0.3, x: backAnimate ? 200 : -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={classes.step}
      key={2}
    >
      <p className="text-red-400 mb-2 text-center">{val}</p>

      <p className="text-md text-black-700 leading-tight text-center  mb-5">
        Highest Qualification
      </p>

      <div className="mb-6">
        <select
          name="Qualification"
          id="qualification"
          className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
          defaultValue={Data.qualification}
          onChange={(event) =>
            SetData({ ...Data, qualification: event.target.value })
          }
        >
          <option value="-1">Select Qualification Type</option>
          <option value="bachelors">Bachelor`s Degree</option>
          <option value="masters">Master`s Degree</option>
          <option value="doctoral">Doctoral Degree</option>
          <option value="diploma">Diploma</option>
          <option value="advanced">Advanced Diploma</option>
          <option value="graduate">Graduate Degree</option>
          <option value="national">National Diploma</option>
          <option value="postgraduate">Post Graduate Education</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Institute Name"
          name="Iname"
          id="i_name"
          defaultValue={Data.i_name}
          onChange={(event) => SetData({ ...Data, i_name: event.target.value })}
          className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />
      </div>

      <div className="mb-6">
        <input
          type="number"
          placeholder="Year of Admission"
          name="YOA"
          id="yoa"
          defaultValue={Data.yoa}
          onChange={(event) => SetData({ ...Data, yoa: event.target.value })}
          className="w-48 px-2 py-2 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />

        <input
          type="number"
          placeholder="Year of Completion"
          name="YOC"
          id="yoc"
          defaultValue={Data.yoc}
          onChange={(event) => SetData({ ...Data, yoc: event.target.value })}
          className="w-48 px-2 py-2 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />
      </div>

      <hr style={{ border: "1px solid black" }} />

      <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
        Profile Photo
      </p>

      <div className="mb-6">
        <input
          type="file"
          name="image"
          id="image"
          onChange={(event) => {
            SetData({ ...Data, image: event.target.files[0] });
          }}
          className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />
      </div>
    </motion.div>,

    // Step Four
    <motion.div
      initial={{ opacity: 0.3, x: backAnimate ? 200 : -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={classes.step}
      key={3}
    >
      <p className="text-red-400 mb-2 text-center">{val}</p>

      <div className="mb-6">
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          defaultValue={Data.email}
          onChange={(event) => SetData({ ...Data, email: event.target.value })}
          className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />
      </div>

      <div className="mb-6">
        <input
          type="password"
          placeholder="Enter Password"
          name="password1"
          id="password1"
          defaultValue={Data.password1}
          onChange={(event) =>
            SetData({ ...Data, password1: event.target.value })
          }
          className="w-full text-lg px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />
      </div>

      <div className="mb-10">
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          id="password2"
          defaultValue={Data.password2}
          onChange={(event) =>
            SetData({ ...Data, password2: event.target.value })
          }
          className="w-full text-lg px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
        />
      </div>
      <div className="mb-10 flex flex-col justify-center items-center">
        <label
          className="flex items-center justify-center w-full px-10 py-3 gap-x-3 text-gray-500 border border-gray-200 cursor-pointer"
          htmlFor="resume"
        >
          <Upload size={22} />
          <p className="text-base">Upload Resume</p>
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          onChange={(e) => {
            SetData({ ...Data, resume: e.target.files[0] });
          }}
          className="hidden"
        />
      </div>
    </motion.div>,
  ];

  const stepOneVal = () => {
    const alphaRegex = /^[a-zA-Z\s]+$/;
    const mobileRegex = /^\d{10}$/;

    const { fname, mobile, address } = Data;

    const fnameRef = document.getElementById("fname");
    const mobileRef = document.getElementById("mobile");
    const addressRef = document.getElementById("address");

    if (fname.trim() === "") {
      setVal("! Please enter your First Name");
      fnameRef.classList.add(classes.invalid);
      fnameRef.focus();
      return false;
    } else if (!alphaRegex.test(fname.trim())) {
      setVal("! Please enter only alphabetic characters for your First Name.");
      fnameRef.classList.add(classes.invalid);
      fnameRef.focus();
      return false;
    }
    fnameRef.classList.remove(classes.invalid);

    if (mobile.trim() === "") {
      setVal("! Mobile number is required.");
      mobileRef.classList.add(classes.invalid);
      mobileRef.focus();
      return false;
    } else if (!mobileRegex.test(mobile.trim())) {
      setVal("! Please enter a valid mobile number.");
      mobileRef.classList.add(classes.invalid);
      mobileRef.focus();
      return false;
    }
    mobileRef.classList.remove(classes.invalid);

    if (address.trim() === "") {
      setVal("! Please enter your Address.");
      addressRef.classList.add(classes.invalid);
      addressRef.focus();
      return false;
    }
    addressRef.classList.remove(classes.invalid);

    setVal(<>&nbsp;</>);
    return true;
  };

  const stepTwoVal = () => {
    const { dob, gender, nationality, marital } = Data;

    const dobRef = document.getElementById("dob");
    const genderRef = document.getElementById("gender");
    const nationalityRef = document.getElementById("nationality");
    const maritalRef = document.getElementById("marital");

    if (dob === "") {
      setVal("! Please enter your date of birth");
      dobRef.classList.add(classes.invalid);
      dobRef.focus();
      return false;
    } else {
      const parsedDate = new Date(dob);
      const curr = new Date();
      if (isNaN(parsedDate)) {
        setVal("! Please enter a valid date of birth");
        dobRef.classList.add(classes.invalid);
        dobRef.focus();
        return false;
      } else if (curr.getFullYear() - parsedDate.getFullYear() < 18) {
        setVal("! Age should be greater than 18");
        dobRef.classList.add(classes.invalid);
        dobRef.focus();
        return false;
      }
    }
    dobRef.classList.remove(classes.invalid);

    if (gender === "-1") {
      setVal("! Select Gender Option");
      genderRef.classList.add(classes.invalid);
      genderRef.focus();
      return false;
    }
    genderRef.classList.remove(classes.invalid);

    if (nationality === "-1") {
      setVal("! Select a Country");
      nationalityRef.classList.add(classes.invalid);
      nationalityRef.focus();
      return false;
    }
    nationalityRef.classList.remove(classes.invalid);

    if (marital === "-1") {
      setVal("! Select Maritial Status.");
      maritalRef.classList.add(classes.invalid);
      maritalRef.focus();
      return false;
    }
    maritalRef.classList.remove(classes.invalid);

    setVal(<>&nbsp;</>);
    return true;
  };

  const stepThreeVal = () => {
    const alphaRegex = /^[a-zA-Z\s]+$/;
    const { qualification, i_name, yoa, yoc, skills, dob } = Data;

    const qualificationRef = document.getElementById("qualification");
    const i_nameRef = document.getElementById("i_name");
    const yoaRef = document.getElementById("yoa");
    const yocRef = document.getElementById("yoc");
    const skillsRef = document.getElementById("skills");

    if (qualification === "-1") {
      setVal("! Select Highest Qualification");
      qualificationRef.classList.add(classes.invalid);
      qualificationRef.focus();
      return false;
    }
    qualificationRef.classList.remove(classes.invalid);

    if (i_name.trim() === "") {
      setVal("! Please enter an institute name.");
      i_nameRef.classList.add(classes.invalid);
      i_nameRef.focus();
      return false;
    } else if (!alphaRegex.test(i_name.trim())) {
      setVal("! Please enter a valid institute name.");
      i_nameRef.classList.add(classes.invalid);
      i_nameRef.focus();
      return false;
    }
    i_nameRef.classList.remove(classes.invalid);

    const parsedDate = new Date(dob);
    const curr = new Date();

    if (yoa === "") {
      setVal("! Please enter the year of admission.");
      yoaRef.classList.add(classes.invalid);
      yoaRef.focus();
      return false;
    } else if (
      yoa - parsedDate.getFullYear() <= 15 ||
      yoa > curr.getFullYear()
    ) {
      setVal("! Please enter a valid Year.");
      yoaRef.classList.add(classes.invalid);
      yoaRef.focus();
      return false;
    }
    yoaRef.classList.remove(classes.invalid);

    if (yoc === "") {
      setVal("! Please enter the year of completion.");
      yocRef.classList.add(classes.invalid);
      yocRef.focus();
      return false;
    } else if (yoa > yoc || yoc - yoa <= 2) {
      setVal("! Please enter valid Year of completion");
      yocRef.classList.add(classes.invalid);
      yocRef.focus();
      return false;
    }
    yocRef.classList.remove(classes.invalid);

    setVal(<>&nbsp;</>);
    return true;
  };

  const stepFourVal = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const regexPass = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;

    const { email, password1, password2 } = Data;

    const emailRef = document.getElementById("email");
    const password1Ref = document.getElementById("password1");
    const password2Ref = document.getElementById("password2");

    if (email.trim() === "") {
      setVal("! Email is required.");
      emailRef.classList.add(classes.invalid);
      emailRef.focus();
      return false;
    } else if (!emailRegex.test(email.trim())) {
      setVal("! Please enter a valid email address.");
      emailRef.classList.add(classes.invalid);
      emailRef.focus();
      return false;
    }
    emailRef.classList.remove(classes.invalid);

    if (password1.trim() === "") {
      setVal("! Please enter password.");
      password1Ref.classList.add(classes.invalid);
      password1Ref.focus();
      return false;
    } else if (!regexPass.test(password1)) {
      setVal(
        "! Password incorrect format. Contains at least one special character,one smallcase character,one uppercase character and has a minimum length of 8 characters:"
      );
      password1Ref.classList.add(classes.invalid);
      password1Ref.focus();
      return false;
    }
    password1Ref.classList.remove(classes.invalid);

    if (password2.trim() === "") {
      setVal("! Please enter password.");
      password2Ref.classList.add(classes.invalid);
      password2Ref.focus();
      return false;
    } else if (password1 != password2) {
      setVal("! Enter correct Password.");
      password2Ref.classList.add(classes.invalid);
      password2Ref.focus();
      return false;
    }
    password2Ref.classList.remove(classes.invalid);

    setVal(<>&nbsp;</>);
    return true;
  };

  return (
    <form
      onSubmit={() => {
        console.log(Data);
      }}
      className={
        className +
        " " +
        classes.signUpForm +
        " " +
        classes.form +
        " p-12 shadow-md rounded-2xl bg-white mx-auto border-solid  border-2 border-gray-100 mb-8"
      }
    >
      <Form_Header tab={tab} />
      {steps[tab]}
      <NextPrevButton
        count={tab}
        len={steps.length}
        handleNext={nextTab}
        handlePrev={prevTab}
        isLast={isLastStep}
        handleSubmit={handleSubmit}
      />
    </form>
  );
};

export default Reg_Form;
