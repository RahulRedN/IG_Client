import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaFileImage, FaPhoneAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const TestimonialForm = ({ closeModal }) => {
  const uid = useSelector((state) => state.jobseeker.data.uid);
  const [testimonialData, setTestimonialData] = useState({
    testimonial: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTestimonialData({
      ...testimonialData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      message: testimonialData.testimonial,
      uid: uid,
    };
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER + "/api/jobseeker/testimonial",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.status == 200) {
        toast.success("Testimonial Added!");
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast("An error occured, Please try again");
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="w-[50vw] p-8 h-fit"
    >
      <h1 className="text-4xl font-[600] mb-6 text-center">
        Share your{" "}
        <span className="text-blue-500 hover:text-black transition duration-300">
          Testimonial
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Column 2 */}
        <div className="mb-4 col-span-2">
          <label className="font-normal text-gray-500">Your Testimonial</label>
          <textarea
            id="testimonial"
            name="testimonial"
            placeholder="Your Testimonial"
            value={testimonialData.testimonial}
            onChange={handleChange}
            className="mt-2 w-full border border-zinc-400 p-4 h-[13rem] rounded-md outline-none placeholder:text-zinc-500 placeholder:tracking-widest"
          ></textarea>
        </div>

        <motion.button
          whileTap={{ scale: 0.8 }}
          type="submit"
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.3 }}
          className="bg-blue-500 p-4 rounded-md text-white font-[600] text-lg hover:bg-blue-600  hover:translate-y-1 mt-6 mx-auto block col-span-2 w-full"
        >
          Submit Testimonial
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TestimonialForm;
