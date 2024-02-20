/* eslint-disable react/prop-types */
import {
  Building2,
  TrendingUp,
  MapPin,
  Home,
  CalendarRange,
  Coins,
  Hourglass,
  History,
  CalendarSearch,
  MailSearch,
  Heart,
} from "lucide-react";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import { CgProfile } from "react-icons/cg";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RoleCard from "./RoleCard";
import { IoCloseCircle } from "react-icons/io5";
import toast from "react-hot-toast";

import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setApplied } from "../../../redux/jobseekerReducer";
import { useNavigate } from "react-router-dom";

const FindJobCard = ({ job, fav, setFavHandler }) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const currDate = new Date();
  const postedDate = new Date(job?.postedDate);

  const isJustNow = Math.abs(currDate - postedDate) <= 24 * 60 * 60 * 1000;
  const [isfav, setIsfav] = useState(fav && fav[job.id]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset overflow on component unmount
    };
  }, [modalIsOpen]);

  const favHandler = () => {
    setIsfav((state) => {
      if (fav) {
        const newFav = { ...fav };
        newFav[job.id] = !state;
        setFavHandler(newFav);
      } else {
        const newFav = {};
        newFav[job.id] = !state;
        setFavHandler(newFav);
      }

      if (!state) {
        setTimeout(
          () =>
            toast("Added to Favourites!", {icon:'❤️'}),
          750
        );
      } else {
        setTimeout(() => toast.success("Removed from Favourites!"), 750);
      }

      return !state;
    });
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1000,
    },
    content: {
      top: "390px",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      borderRadius: "10px",
      outline: "none",
      padding: "2rem",
      position: "fixed",
      width: "85vw",
      height: "90vh",
      overflowY: "scroll",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for the modal
      scrollbarWidth: "thin", // For Firefox
      scrollbarColor: "#4a4a4a #e5e5e5", // For Firefox
      zIndex: 1001,
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          inView
            ? {
                opacity: 1,
                scale: 1,
                transition: { ease: "easeIn", duration: 0.3 },
              }
            : "hidden"
        }
        className="shadow-xl w-[45vw] h-fit p-4 border border-gray-100 bg-white"
      >
        <div className="flex items-center justify-between">
          <div className="max-w-fit border border-gray-300 rounded-md flex items-center gap-2 p-1">
            <TrendingUp
              strokeWidth={2.3}
              size={16}
              color={`${isJustNow ? "#10b981" : "#60a5fa"}`}
            />
            <p className="text-sm tracking-wide">
              {isJustNow ? "Actively Hiring" : "Hiring"}
            </p>
          </div>
          <Heart
            className={`hover:cursor-pointer ${
              isfav ? "fill-red-500 text-red-500" : ""
            } `}
            onClick={favHandler}
          />
        </div>
        <div className="flex justify-between items-center mt-5">
          <div className="flex flex-col gap-1">
            <h2 className="tracking-wide text-xl font-bold">{job?.position}</h2>
            <h6 className="text-sm text-gray-400 font-bold tracking-wide">
              {job?.companyName}
            </h6>
          </div>
          <Building2 size={30} />
        </div>

        <div className="mt-5">
          {job?.location ? (
            <div className="flex items-start gap-2">
              <MapPin size={18} />
              <p className="text-sm">{job?.location}</p>
            </div>
          ) : (
            <div className="flex gap-1">
              <Home size={16} />
              <p className="text-sm tracking-wide">Work from home</p>
            </div>
          )}

          <div className="flex flex-wrap mt-5 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <CalendarRange size={17} color="#3b82f6" />
                <span className="text-sm font-normal text-zinc-500 tracking-wide">
                  Joining Date
                </span>
              </div>
              <h1 className="text-sm font-thin">
                {new Date(job.joiningDate).toLocaleDateString("en-GB")}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <Coins size={17} color="gold" />
                <span className="text-sm text-zinc-500 tracking-wider">
                  Salary
                </span>
              </div>
              <h1 className="text-sm font-thin tracking-wide">
                ₹ {Number(job?.salary).toLocaleString("en-IN")}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <Hourglass size={16} color="#000000" />
                <span className="text-sm text-zinc-500 tracking-wider">
                  Experience
                </span>
              </div>
              <h1 className="text-sm font-thin">{job?.experience}</h1>
            </div>
          </div>

          <div className="flex mt-5 gap-3 items-stretch flex-wrap">
            {isJustNow ? (
              <div className="max-w-fit rounded flex items-center gap-1 p-1 bg-green-100">
                <History strokeWidth={2} size={16} color="#4ade80" />
                <p className="text-sm text-green-400">
                  {Math.floor(
                    (currDate.getTime() - postedDate.getTime()) /
                      (1000 * 3600 * 24)
                  )}{" "}
                  days ago
                </p>
              </div>
            ) : (
              <div className="max-w-fit rounded flex items-center gap-1 p-1 bg-sky-100">
                <History strokeWidth={2} size={16} color="#60a5fa" />
                <p className="text-sm text-blue-400">
                  {Math.floor(
                    (currDate.getTime() - postedDate.getTime()) /
                      (1000 * 3600 * 24)
                  )}{" "}
                  days ago
                </p>
              </div>
            )}

            {job?.skills?.split(",").map((role, index) => (
              // eslint-disable-next-line react/jsx-key
              <RoleCard key={index} role={role} />
            ))}
          </div>

          <hr className="my-5 text-black" />
          <div className="flex justify-end">
            <button
              onClick={openModal}
              className="bg-sky-500 hover:bg-sky-600 text-white tracking-wider py-2 px-4 rounded focus:outline-none focus:shadow-outline
          "
            >
              VIEW DETAILS
            </button>
          </div>
        </div>
      </motion.div>

      <Modals
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        job={job}
      />
    </>
  );
};

export default FindJobCard;

const Modals = ({ modalIsOpen, closeModal, customStyles, job }) => {
  const nav = useNavigate();
  const user = useSelector((state) => state.jobseeker.data);
  const dispatch = useDispatch();

  const applyHandler = async () => {
    const data = { ...job.status };

    if (data[user.id] == undefined) {
      try {
        data[user.id] = {
          applied: null,
          date: Date().toLocaleString(),
          fname: user.fname,
        };
        const docRef = doc(collection(db, "jobs"), job.id);
        await updateDoc(docRef, { status: data });
        dispatch(setApplied({ data: data, id: job.id }));
        toast.success("Job Applied!");

        nav("/jobseeker/profile");
      } catch (error) {
        console.error(error);
        toast.error("An error Occured!", { className: "text-red-500" });
      }
    } else {
      toast("Already applied to the Job!");
    }
  };

  const isDisabled = job.status[user.id];

  const color = (status) => {
    if (status === "Rejected") {
      return "bg-red-200 text-red-600 ";
    } else if (status === "Accepted") {
      return "bg-green-200 text-green-600";
    } else {
      return "bg-yellow-100 text-yellow-500";
    }
  };

  const getStatus = (status) => {
    if (status == null) {
      return "Pending";
    } else if (status) {
      return "Accepted";
    } else {
      return "Rejected";
    }
  };

  return (
    <Modal
      key={job.id}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex gap-96">
        <button onClick={closeModal}>
          <IoCloseCircle className="text-3xl" />
        </button>
        <h1 className="font-bold text-4xl text-center">{job.companyName}</h1>
      </div>

      <h1 className="mt-6 text-lg font-[600]">Job Description</h1>
      <p className="mt-2 text-[500] text-gray-500">{job.jobDesc}</p>

      <div className="w-fit mt-6 p-4 border flex flex-col gap-3 rounded shadow">
        <h1 className="font-[600]">Activity on InspiringGo</h1>
        <div className="flex gap-5">
          <div className="flex gap-1 items-center">
            <CalendarSearch size={19} />
            <h2>
              Hiring since{" "}
              {new Date(job?.postedDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
          </div>
          <div className="flex gap-1 items-center">
            <MailSearch size={19} />
            <h2>{job.totalPositions} oppurtunities posted</h2>
          </div>
          <div className="flex gap-1 items-center">
            <CgProfile size={21} />
            <h2>{job.totalPositions - job.vacancies} candidates hired</h2>
          </div>
        </div>
      </div>

      <h3 className="mt-4 font-[600]">Responsibility</h3>
      <ul className="ml-5 text-gray-500" style={{ listStyleType: "disc" }}>
        <br />
        {job?.responsibilities.map((res, idx) => (
          <li key={idx}>{res}</li>
        ))}
      </ul>

      <h1 className="mt-8 text-lg font-[600]">Qualifications</h1>
      <div className="flex mt-3 gap-3 items-stretch flex-wrap">
        {job?.skills.split(",").map((role, index) => (
          <RoleCard key={index} role={role} />
        ))}
      </div>

      <h1 className="mt-8 text-lg font-[600]">Benefits</h1>
      <div className="flex mt-3 gap-3 items-stretch flex-wrap">
        {job?.benefits.split(",").map((benifit, index) => (
          <p
            key={index}
            className="text-sm p-1 bg-gray-200 text-gray-500 rounded"
          >
            {benifit}
          </p>
        ))}
      </div>

      <h1 className="mt-8 text-lg font-[600]">Job Summary</h1>
      <ul className="ml-5 text-gray-500" style={{ listStyleType: "disc" }}>
        <br></br>
        <li>
          Posted on: {new Date(job?.postedDate).toLocaleDateString("en-US")}
        </li>
        <li>Vacancy : {job?.vacancies}</li>
        <li>Salary : ₹ {Number(job?.salary).toLocaleString("en-IN")}</li>
        {job?.location && <li>Location : {job?.location}</li>}
        <li>Job Nature : {job?.location ? "on Site" : "Work From Home"}</li>
      </ul>
      <button
        onClick={applyHandler}
        className={
          "mt-8 text-center m-auto text-white tracking-wider py-2 px-4 rounded focus:outline-none focus:shadow-outline " +
          (isDisabled
            ? color(getStatus(isDisabled.applied))
            : "bg-blue-600 hover:bg-blue-700")
        }
        disabled={isDisabled}
      >
        {isDisabled ? getStatus(isDisabled.applied) : "Apply"}
      </button>
    </Modal>
  );
};
