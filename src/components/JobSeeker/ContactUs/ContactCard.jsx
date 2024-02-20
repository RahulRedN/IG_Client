import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaGlobe } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { HiOutlineMailOpen } from "react-icons/hi";
import { motion } from "framer-motion";

const ContactCard = ({ src, delay }) => {
  let icon;
  let content;

  if (src === "Phone") {
    icon = <MdOutlinePhoneInTalk size={50} className="text-sky-500" />;
    content = "+91 7665214327";
  } else if (src === "Email") {
    icon = <HiOutlineMailOpen size={50} className="text-sky-500" />;
    content = "InspiringGo@gmail.com";
  } else if (src === "Address") {
    icon = <FaGlobe size={50} className="text-sky-500" />;
    content = "www.InspiringGo.com";
  } else {
    icon = <FaMapMarkedAlt size={50} className="text-sky-500" />;
    content = "India";
  }

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      ref={ref}
      animate={inView ? { x: 0, opacity: 1 } : "hidden"}
      transition={{ ease: "easeInOut", duration: 0.5, delay: delay * 0.8 }}
      className="flex bg-sky-500 h-[15vh] rounded-lg items-center shadow-lg"
    >
      <div className="h-full flex items-center justify-center p-5">
        <div className="bg-white p-3 rounded-[100px]">{icon}</div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-2xl font-semibold">{src}</h1>
        <p className="text-white text-md font-medium">{content}</p>
      </div>
    </motion.div>
  );
};

export default ContactCard;
