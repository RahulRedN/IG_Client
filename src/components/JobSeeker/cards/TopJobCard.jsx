import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import classes from "./TopJobCard.module.css";

import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopJobCard = ({ sticker, position, jobDesc, jobId }) => {
  const nav = useNavigate();

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength) + "...";
    }
  };

  return (
    <motion.div
      className={classes.card}
      initial={{ x: 100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : "hidden"}
      ref={ref}
      transition={{
        ease: "easeIn",
        duration: 0.3,
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0, ease: "easeInOut" },
      }}
    >
      <div className={classes.logo}>
        <Building2 size={40} />
      </div>
      <div className={classes.serviceInfo}>
        <h1>{position}</h1>
        <p>{truncateString(jobDesc, 90)}</p>
        <a
          onClick={() => {
            nav("findJobs?jobId=" + jobId);
          }}
        >
          Apply Now
        </a>
      </div>
      {sticker ? <div className={classes.sticker}>Remote</div> : ""}
    </motion.div>
  );
};

export default TopJobCard;
