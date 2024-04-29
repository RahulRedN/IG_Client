import { motion } from "framer-motion";
import styles from "./UpdateInfoProfile_Job.module.css";

import upload from "/assets/Upload.gif";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../redux/jobseekerReducer";

import toast from "react-hot-toast";
import axios from "axios";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";

const UpdateInfoProfile_Job = () => {
  const userData = useSelector((state) => state.jobseeker.data);
  const dispatch = useDispatch();

  const [data, setDataUser] = useState({});

  useEffect(() => {
    setDataUser(userData);
  }, [userData]);

  const [edit, setEdit] = useState(false);
  const [picEdit, setPicEdit] = useState(false);

  const SubmitHandler = async () => {
    //Validation

    const alphaRegex = /^[a-zA-Z\s]+$/;
    const mobileRegex = /^\d{10}$/;

    if (data.fname.trim() === "") {
      toast.error("Name is Required!", { className: "text-red-500" });
      return;
    }

    if (!alphaRegex.test(data.fname)) {
      toast.error("Name can only contain alphabets!", {
        className: "text-red-100",
      });
      return;
    }

    if (data.mobile.trim() === "") {
      toast.error("Mobile Number is Required!", { className: "text-red-500" });
      return;
    }

    if (!mobileRegex.test(data.mobile)) {
      toast.error("Mobile Number should be of 10 digits!", {
        className: "text-red-500",
      });
      return;
    }

    if (data.address.trim() === "") {
      toast.error("Address is Required!", { className: "text-red-500" });
      return;
    }

    if (!data.resume){
      data.resume = userData.resume;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER + "/api/jobseeker/updateDetails",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status == 200) {
        dispatch(setData({ data: data }));
        toast.success("Profile Updated!");
      }
      setEdit((state) => !state);
    } catch (error) {
      console.error(error);
      toast.error("Something Happened!", { className: "text-red-400" });
    }
  };

  const handleChange = async (e) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const image = new FormData();
        image.append("image", e.target.files[0]);
        image.append("uid", data.uid);
        const res = await axios.post(
          import.meta.env.VITE_SERVER + "/api/jobseeker/updatePhoto",
          image,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (res.status == 200) {
          dispatch(setData({ data: { ...data, img: res.data.img } }));
          resolve("Updated successfully");
        }
      } catch (error) {
        reject("An error occured");
        console.error(error);
      }
    });

    toast.promise(promise, {
      loading: "Updating profile picture...",
      success: (data) => {
        return `${data}`;
      },
      error: (data) => {
        return `${data}`;
      },
    });

    setPicEdit((prev) => !prev);
  };

  return (
    <>
      {console.log(data?.resume)}
      <div
        id="update"
        className="flex flex-col h-screen gap-y-6 max-w-[90%] mx-auto"
      >
        <div className="mt-5 flex justify-between items-center shadow p-4 rounded">
          <h1 className="text-3xl font-[600] ">Profile</h1>
          <div className="flex">
            <p>
              Profile &gt; <span className="text-cyan-500">Edit</span>
            </p>
          </div>
        </div>
        <div className="flex gap-10 h-[80vh]">
          <div className="flex-[1] h-full flex flex-col justify-between max-w-[100%] p-[2rem] bg-white rounded-lg shadow-lg">
            <h2 className=" text-xl text-center font-semibold mb-9">
              {picEdit ? (
                <p>Change Profile Picture here</p>
              ) : (
                <p className="text-2xl">Profile Picture</p>
              )}
            </h2>
            <div className="">
              <img
                src={userData?.img ? userData?.img : "/assets/Profile_man.jpg"}
                className={
                  "w-[18rem] mx-auto h-[18rem] rounded-[50%] object-cover object-top"
                }
              />
            </div>

            <div className="mt-10 flex justify-center items-center">
              <div className={styles.fileinputcontainer}>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className={styles.fileinput}
                  onChange={handleChange}
                />

                {picEdit ? (
                  <label
                    htmlFor="fileInput"
                    className="flex items-center justify-center p-3 hover:cursor-pointer"
                  >
                    <img src={upload} className={styles.uploadicon} />
                    <h3 className="mb-2">Upload your picture</h3>
                  </label>
                ) : (
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      type="submit"
                      animate={{ opacity: 1 }}
                      transition={{ ease: "easeIn", duration: 0.3 }}
                      className=" p-3 w-52 text-white rounded-md bg-emerald-500 hover:bg-emerald-600"
                      onClick={() => setPicEdit((prev) => !prev)}
                    >
                      EDIT PICTURE
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-[2] max-w-[100%] h-full p-[2rem] pb-0 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">
              {edit ? (
                <p>Change User Information here</p>
              ) : (
                <p>User Information</p>
              )}
            </h2>
            <form className="h-[86%]">
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-wrap gap-y-4 gap-x-7">
                  <div className="flex flex-col min-w-[47%]">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm font-bold mb-1 tracking-wider"
                    >
                      Name{edit ? "*" : ""}
                    </label>
                    <input
                      type="text"
                      name="name"
                      disabled={!edit}
                      value={data?.fname}
                      onChange={(e) =>
                        setDataUser((state) => ({
                          ...state,
                          fname: e.target.value,
                        }))
                      }
                      placeholder="Enter new Name"
                      className={`w-full px-3 py-2 ${
                        edit
                          ? "border bg-gray-50 rounded-md"
                          : "bg-gray-100 rounded-lg"
                      } placeholder:text-gray-500 border-gray-600 outline-none text-gray-900  focus:outline-none focus:border-blue-400`}
                    />
                  </div>

                  {!edit && (
                    <>
                      <div className="min-w-[47%]">
                        <label
                          htmlFor="title"
                          className="block text-gray-700 text-sm font-bold mb-1 tracking-wider"
                        >
                          Email{edit ? "*" : ""}
                        </label>
                        <input
                          type="email"
                          name="Email"
                          disabled={!edit}
                          value={data?.email}
                          onChange={(e) =>
                            setDataUser((state) => ({
                              ...state,
                              email: e.target.value,
                            }))
                          }
                          placeholder="Enter new Email"
                          className={`w-full px-3 py-2 ${
                            edit
                              ? "border bg-gray-50 rounded-md"
                              : "bg-gray-100 rounded-lg"
                          } placeholder:text-gray-500 border-gray-600 outline-none text-gray-900  focus:outline-none focus:border-blue-400`}
                        />
                      </div>
                    </>
                  )}

                  <div className="min-w-[47%]">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm font-bold mb-1 tracking-wider"
                    >
                      Phone Number{edit ? "*" : ""}
                    </label>
                    <input
                      type="number"
                      name="PhoneNumber"
                      disabled={!edit}
                      value={data?.mobile}
                      onChange={(e) =>
                        setDataUser((state) => ({
                          ...state,
                          mobile: e.target.value,
                        }))
                      }
                      placeholder="Enter new Phone Number"
                      className={`w-full px-3 py-2 ${
                        edit
                          ? "border bg-gray-50 rounded-md"
                          : "bg-gray-100 rounded-lg"
                      } placeholder:text-gray-500 border-gray-600 outline-none text-gray-900  focus:outline-none focus:border-blue-400`}
                    />
                  </div>

                  <div className={"min-w-[47%] " + (edit && "w-full")}>
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm font-bold mb-1 tracking-wider"
                    >
                      Address{edit ? "*" : ""}
                    </label>
                    <textarea
                      type="text"
                      name="Address"
                      disabled={!edit}
                      value={data?.address}
                      onChange={(e) =>
                        setDataUser((state) => ({
                          ...state,
                          address: e.target.value,
                        }))
                      }
                      placeholder="Enter new Address"
                      className={`w-full px-3 py-2 ${
                        edit
                          ? "border bg-gray-50 rounded-md  h-[10rem] tracking-wider"
                          : "bg-gray-200 rounded-lg h-[2.5rem]"
                      } placeholder:text-gray-500 border-gray-600 outline-none text-gray-900  focus:outline-none focus:border-blue-400`}
                    />
                  </div>
                  <div className={`${!edit ? "min-w-[47%]" : "w-full"}`}>
                    {!edit && (
                      <div className="flex flex-col">
                        <label
                          htmlFor="title"
                          className="block text-gray-700 text-sm font-bold mb-1 tracking-wider"
                        >
                          Skills{edit ? "*" : ""}
                        </label>
                        <div className="mt-2 flex gap-5 items-center">
                          {data?.skills?.map((role, index) => {
                            const [id, name, stage] = role.split(";");
                            return (
                              <p
                                key={index}
                                className="text-sm px-2 py-2 bg-gray-100 text-gray-800 rounded"
                              >
                                {name + " (" + stage + ")"}
                              </p>
                            );
                          })}
                          <div className="hover:underline hover:cursor-pointer hover:border-blue-200">
                            <a
                              className="flex gap-x-1 items-center "
                              href={data?.resume}
                              target="__blank"
                            >
                              <p>Resume</p>
                              <ArrowRight size={20} />
                            </a>
                          </div>
                        </div>

                        <label
                          htmlFor="title"
                          className="mt-4 block text-gray-700 text-sm font-bold mb-1 tracking-wider"
                        >
                          Education{edit ? "*" : ""}
                        </label>
                        <input
                          type="text"
                          name="Education"
                          disabled={!edit}
                          value={data?.qualification}
                          className={`w-full mt-2 px-3 py-2 ${
                            edit
                              ? "border bg-gray-50 rounded-md"
                              : "bg-gray-100 rounded-lg"
                          } placeholder:text-gray-500 border-gray-600 outline-none text-gray-900  focus:outline-none focus:border-blue-400`}
                        />

                        <div className="flex justify-between gap-x-9">
                          <div className="w-fit">
                            <label
                              htmlFor="title"
                              className="mt-4 block text-gray-700 text-sm font-bold mb-1 tracking-wider"
                            >
                              Date Of Birth{edit ? "*" : ""}
                            </label>
                            <input
                              type="text"
                              name="DateOfBirth"
                              disabled={!edit}
                              value={data?.dob}
                              className={`w-fit mt-2 px-3 py-2 bg-gray-100 rounded-lg
                               placeholder:text-gray-500  outline-none text-gray-900  focus:outline-none focus:border-blue-400`}
                            />
                          </div>

                          <div className="w-fit">
                            <label
                              htmlFor="title"
                              className="mt-4 block text-gray-700 text-sm font-bold mb-1 tracking-wider"
                            >
                              Gender{edit ? "*" : ""}
                            </label>
                            <input
                              type="text"
                              name="Gender"
                              disabled={!edit}
                              value={data?.gender}
                              className={`w-fit mt-2 px-3 py-2 ${
                                edit
                                  ? "border bg-gray-50 rounded-md"
                                  : "bg-gray-100 rounded-lg"
                              } placeholder:text-gray-500 border-gray-600 outline-none text-gray-900  focus:outline-none focus:border-blue-400`}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {edit && (
                  <div className="-mt-5 mb-10 flex flex-col">
                    <p className="text-lg mb-2">Resume*</p>
                    <label
                      className={
                        (!data?.resume || typeof data?.resume === "string"
                          ? "border-gray-300 hover:bg-gray-100"
                          : "border-green-500 text-green-500 bg-green-100 ") +
                        " flex items-center justify-center w-fit py-4 pl-4 pr-5 gap-x-3 text-gray-500 border-2 cursor-pointer rounded-xl"
                      }
                      htmlFor="resume"
                    >
                      <Upload size={20} />
                      <p className="text-base font-light">
                        {!data?.resume || typeof data?.resume === "string"
                          ? "Upload"
                          : "Uploaded"}
                      </p>
                    </label>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      onChange={(e) =>
                        setDataUser((state) => ({
                          ...state,
                          resume: e.target.files[0],
                        }))
                      }
                      className="hidden"
                    />
                  </div>
                )}

                {edit ? (
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      type="button"
                      animate={{ opacity: 1 }}
                      transition={{ ease: "easeIn", duration: 0.3 }}
                      className=" p-3 w-36 text-white rounded-md bg-blue-500 hover:bg-blue-600"
                      onClick={SubmitHandler}
                    >
                      Confirm
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      type="button"
                      animate={{ opacity: 1 }}
                      transition={{ ease: "easeIn", duration: 0.3 }}
                      className=" p-3 w-36 text-white rounded-md bg-red-500 hover:bg-red-600"
                      onClick={() => {
                        setEdit((prev) => !prev);
                        setDataUser(userData);
                      }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      type="button"
                      animate={{ opacity: 1 }}
                      transition={{ ease: "easeIn", duration: 0.3 }}
                      className=" p-3 w-48 text-white rounded-md bg-blue-500 hover:bg-blue-600"
                      onClick={() => setEdit((prev) => !prev)}
                    >
                      EDIT PROFILE
                    </motion.button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateInfoProfile_Job;
