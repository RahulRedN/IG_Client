import ImageHeader from "../ImageHeader";
import { Mail } from "lucide-react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdSubject } from "react-icons/md";
import ContactCard from "./ContactCard";
import { motion } from "framer-motion";
import { useState } from "react";

const details = ["Phone", "Email", "Address", "Physical address"];

const ContactUs_jobseeker = () => {
  
  const [jobcontact, setJobContact] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log("Submitted", jobcontact);
 
  };

  const handleJobContactChange = (e) => {
    const { name, value } = e.target;
    setJobContact((prevJobContact) => ({
      ...prevJobContact,
      [name]: value,
    }));
  };

  return (
    <>
      <ImageHeader src={"contactus"} />
      <div className="mt-[5rem] flex h-fit pb-10">
        <div className="flex m-auto w-[70vw] gap-16 flex-wrap">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="flex-[2] h-fit border border-gray-400 rounded-sm"
          >
            <div className="p-8">
              <h1 className="text-4xl font-[600]">
                Interested in{" "}
                <span className="text-blue-500 transition ease-in duration-300 hover:text-black">
                  discussing
                </span>
                ?
              </h1>
              <h3 className="mt-5 text2xl text-gray-500">
                Active & Ready to use Contact Form!
              </h3>
              <form onSubmit={SubmitHandler} className="mt-5 flex flex-col gap-2 w-full">
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex-[1] min-w-[15vw] max-w-[20vw]">
                    <label className="font-normal text-gray-500">NAME</label>
                    <div className="relative flex items-center">
                      <MdDriveFileRenameOutline
                        size={28}
                        className="absolute left-2 top-[1.2rem] fill-gray-700 text-white"
                      />
                      <input
                        type="text"
                        name="name"
                        value={jobcontact.name}
                        onChange={handleJobContactChange}
                        placeholder="Enter Name"
                        className="mt-2 border border-zinc-400 p-3 pl-[2.5rem] w-[100%] rounded-md outline-none placeholder:text-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="flex-[1] min-w-[15vw] max-w-[20vw]">
                    <label className="font-normal text-gray-500">EMAIL</label>
                    <div className="relative flex items-center">
                      <Mail
                        size={28}
                        className="absolute left-2 top-[1.2rem] fill-gray-700 text-white"
                      />
                      <input
                        type="text"
                        name="email"
                        value={jobcontact.email}
                        onChange={handleJobContactChange}
                        placeholder="Enter Email"
                        className="mt-2 border border-zinc-400 p-3 pl-[2.5rem] w-[100%] rounded-md outline-none placeholder:text-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="flex-[1] min-w-[15vw] max-w-[20vw]">
                    <label className="font-normal text-gray-500">SUBJECT</label>
                    <div className="relative flex items-center">
                      <MdSubject
                        size={28}
                        className="absolute left-2 top-[1.2rem] fill-gray-700 text-white"
                      />
                      <input
                        type="text"
                        name="subject"
                        value={jobcontact.subject}
                        onChange={handleJobContactChange}
                        placeholder="Enter Subject"
                        className="mt-2 border border-zinc-400 p-3 pl-[2.5rem] w-[100%] rounded-md outline-none placeholder:text-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="flex-[1] min-w-[15vw] max-w-[20vw]">
                    <label className="font-normal text-gray-500">PHONE</label>
                    <div className="relative flex items-center">
                      <FaPhoneAlt
                        size={26}
                        className="absolute left-2 top-[1.2rem] fill-gray-700 text-white"
                      />
                      <input
                        type="text"
                        name="phone"
                        value={jobcontact.phone}
                        onChange={handleJobContactChange}
                        placeholder="Enter Number"
                        className="mt-2 border border-zinc-400 p-3 pl-[2.5rem] w-[100%] rounded-md outline-none placeholder:text-zinc-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="">
                  <label className="font-normal text-gray-500">MESSAGE</label>
                  <textarea
                    name="message"
                    value={jobcontact.message}
                    onChange={handleJobContactChange}
                    placeholder="Enter Message...."
                    className="mt-2 w-full border border-zinc-400 p-4 h-[13rem] rounded-md outline-none placeholder:text-zinc-500
                    placeholder:tracking-widest"
                  ></textarea>
                </div>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="submit"
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeIn", duration: 0.3 }}
                  className="bg-sky-500 p-4 rounded-md text-white font-[600] text-lg hover:bg-sky-600"
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            </div>
          </motion.div>

          <div className="flex-[1] flex flex-col gap-5">
            {details.map((detail, idx) => (
              <ContactCard src={detail} key={detail} delay={0.1 * idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs_jobseeker;
