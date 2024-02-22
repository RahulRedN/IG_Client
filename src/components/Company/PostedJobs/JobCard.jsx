import { DeleteSharp, DriveFileRenameOutline } from '@mui/icons-material';
import { SearchCheck, SearchCode } from "lucide-react";
import {
    CancelOutlined,
    VerifiedUserSharp,
  } from "@mui/icons-material";

import React, { useEffect, useState } from 'react'
import Modal from "react-modal";

const JobCard = ({job,date,deleteJobHandler}) => {
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
  
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    const customStyles = {
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      },
      content: {
        top: "390px",
        left: "60%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        borderRadius: "10px",
        outline: "none",
        padding: "2rem",
        position: "fixed",
        width: "40vw",
        height: "70vh",
        overflowY: "auto",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for the modal
        scrollbarWidth: "thin", // For Firefox
        scrollbarColor: "#4a4a4a #e5e5e5", // For Firefox
        zIndex: 1001,
      },
    };
  
  return (
    <>
      <div className="rounded-md m-3 bg-white shadow-lg w-[31%]">
                <div className="px-6 py-4 flex justify-between">
                  <div className="w-0 flex-1">
                    <div className="flex justify-between max-h-40 mt-1 text-xs text-gray-500">
                      <p>Posted on : {date.toDateString("en-IN")}</p>
                      <div className="flex items-baseline">
                        <button
                          onClick={() => {
                            deleteJobHandler(job.id);
                          }}
                        >
                          <DeleteSharp
                            sx={{ color: "red", fontSize: "30px" }}
                          />
                        </button>
                        <button onClick={openModal}>
                          <DriveFileRenameOutline
                            sx={{ color: "#38bcb2", fontSize: "30px" }}
                          />
                        </button>
                        <Modals
                          modalIsOpen={modalIsOpen}
                          closeModal={closeModal}
                          customStyles={customStyles}
                          job={job}
                          key={job.id}
                        />
                      </div>
                    </div>
                    <p>
                      <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                        {job.position}
                      </h1>
                    </p>
                    <div className="relative text-sm max-h-40 w-full overflow-clip">
                      ₹ {Number(job.salary).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
                  <div className="flex justify-between">
                    <div className="flex  gap-8">
                      <div className="flex gap-1">
                        <SearchCode />
                        <h1 className="text-sm">Applicants : 890</h1>
                      </div>
                      <div className="flex gap-1">
                        <SearchCheck />
                        <h1>Vacancies : {job.vacancies}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </>
  )
}

export default JobCard

const Modals = ({ modalIsOpen, closeModal, customStyles, job }) => {
    const [formData, setFormData] = useState({
      position: "",
      joiningDate: "",
      experience: "",
      salary: "",
      totalPositions: 0,
    });
  
    useEffect(() => {
      if (job) {
        setFormData({
          position: job.position || "",
          joiningDate: job.joiningDate || "",
          experience: job.experience || "",
          salary: job.salary || "",
          totalPositions: job.vacancies || 0,
        });
      }
    }, [job]);
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };
    const updateJob = ()=>{
      // alert(formData)
      // console.log(formData)
    }
  
    return (
      <Modal
        key={job.id}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h1 className="text-2xl mt-[-1rem] mb-6 font-semibold text-center">
          Update Job Details
        </h1>
        <div className="w-full flex  justify-center items-center  border-0 rounded-lg">
          <form className={" flex flex-col w-full text-base"}>
            <div className="w-[100%] flex flex-col mb-8 gap-2">
              <label className="ml-1 rounded-lg text-base">Job Position</label>
              <input
                type="text"
                id="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Ex: Software Developer"
                className={"border  rounded-md bg-white w-full p-2 outline-none "}
              />
            </div>
  
            <div className="flex w-full mb-4 gap-[5%]">
              <div className="w-[50%] flex flex-col mb-8 gap-2">
                <label className="ml-1 rounded-lg text-base">
                  New Joining Date
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className={
                    "border  rounded-md bg-white w-full p-2 outline-none "
                  }
                />
              </div>
              <div className="w-[50%] flex flex-col mb-8 gap-2">
                <label className="ml-1 rounded-lg text-base">Experience</label>
                <input
                  type="text"
                  id="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Eg: 10 years"
                  className={
                    "border  rounded-md bg-white w-full p-2 outline-none "
                  }
                />
              </div>
            </div>
  
            <div className="flex w-full mb-4 gap-[5%]">
              <div className="w-[50%] flex flex-col mb-8 gap-2">
                <label className="ml-1 rounded-lg text-base">Salary</label>
                <input
                  type="text"
                  id="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Eg: 1000(in Rs.)"
                  className={
                    "border  rounded-md bg-white w-full p-2 outline-none "
                  }
                />
              </div>
              <div className="w-[50%] flex flex-col mb-8 gap-2">
                <label className="ml-1 rounded-lg text-base">
                  Total Positions
                </label>
                <input
                  type="number"
                  id="totalPositions"
                  value={formData.totalPositions}
                  onChange={handleChange}
                  placeholder="Ex: 10"
                  className={
                    "border  rounded-md bg-white w-full p-2 outline-none "
                  }
                  min={0}
                  max={50}
                  step={1}
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
            <button
              type="button"
              className="flex items-center gap-1 mx-[2rem] px-4 py-3 bg-gray-400 hover:bg-blue-500 hover:text-gray-50 rounded text-base mt-6"
              onClick={updateJob}
            >
              <VerifiedUserSharp className="text-3xl" />
              Update
            </button>
            <button
              onClick={closeModal}
              className="flex items-center gap-1 mx-[2rem] px-4 py-3 bg-gray-400 rounded text-base mt-6"
            >
              <CancelOutlined className="text-3xl" />
              Cancel
            </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  };
  