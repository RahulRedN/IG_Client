import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaFileImage, FaPhoneAlt } from "react-icons/fa";

const TestimonialForm = ({ closeModal }) => {
  const [testimonialData, setTestimonialData] = useState({
    fullname: "",
    email: "",
    phone: "",
    testimonial: "",
    agree: "",
    photo: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTestimonialData({
      ...testimonialData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setTestimonialData({
        ...testimonialData,
        photo: file,
      });
    } else {
      alert("Please select a valid JPEG or PNG image file.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Testimonial data submitted: ", testimonialData);
    closeModal();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="w-full p-8"
    >
      <h1 className="text-4xl font-[600] mb-6 text-center">
        Share your{" "}
        <span className="text-blue-500 hover:text-black transition duration-300">
          Testimonial
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="mb-4">
          <label className="font-normal text-gray-500">Full Name</label>
          <div className="relative flex items-center">
            <FaUser className="absolute left-2 top-[1.2rem] fill-gray-700 text-white" />
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter Your Full Name"
              value={testimonialData.fullname}
              onChange={handleChange}
              className="mt-2 border border-zinc-400 p-3 pl-[2.5rem] w-full rounded-md outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="font-normal text-gray-500">Email</label>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-2 top-[1.2rem] fill-gray-700 text-white" />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={testimonialData.email}
              onChange={handleChange}
              className="mt-2 border border-zinc-400 p-3 pl-[2.5rem] w-full rounded-md outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="font-normal text-gray-500">PHONE</label>
          <div className="relative flex items-center">
            <FaPhoneAlt className="absolute left-2 top-[1.2rem] fill-gray-700 text-white" />
            <input
              type="text"
              name="phone"
              value={testimonialData.phone}
              onChange={handleChange}
              placeholder="Enter Number"
              className="mt-2 border border-zinc-400 p-3 pl-[2.5rem] w-full rounded-md outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="font-normal text-gray-500">
            Upload Photo (JPEG or PNG)
          </label>
          <div className="relative flex items-center">
            <FaFileImage className="absolute left-2 top-[1.2rem] fill-gray-700 text-white" />
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="mt-2 border border-zinc-400 p-3 pl-[2.5rem] w-full rounded-md outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

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
