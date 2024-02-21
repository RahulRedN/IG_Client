import classes from "../AboutSections/Styles/AboutUsTop.module.css";
import TopImage from "../AboutSections/Resources/TopImage.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUsTop = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return (
    <div className={classes.AboutUsTop}>
     
    
        <img src={TopImage} alt="" />
     

      <motion.div
        ref={ref}
        initial={{ x: -100, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : "hidden"}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.0}} 
        className={classes.extra_bg_div}

      ></motion.div>

      <div className={classes.AboutUsTopContent}>
        <h3>Welcome To InspiringGo</h3>
        <h1>We Help Your Company To Grow</h1>
        <p>
        Welcome to InspiringGo, your growth partner in business success. We specialize in nurturing companies through strategic solutions, expert guidance, and a commitment to your organizational prosperity.
        </p>
        <button>Learn More</button>
      </div>
    </div>
  );
};

export default AboutUsTop;
