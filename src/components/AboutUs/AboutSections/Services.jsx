import classes from "../AboutSections/Styles/Services.module.css";
import note from "../AboutSections/Resources/note.png";
import hr from "../AboutSections/Resources/Hr.png";
import expert from "../AboutSections/Resources/expert.png";
import exective from "../AboutSections/Resources/exective.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div className={classes.services_container}>
      <motion.div
        ref={ref}
        initial={{ x: -50, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : "hidden"}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.0 }} // Add delay of 0.3 seconds
        // key={index}

        className={classes.service_top}
      >
        <div className={classes.service_item}>
          <img src={note} alt="" className={classes.service_icon} />
          <div className={classes.service_details}>
            <h5 className={classes.service_title}>Recruitment</h5>
            <p className={classes.service_description}>
              Elevate your team with <br />
              strategic talent  <br />acquisition.
            </p>
          </div>
        </div>

        <div className={classes.service_item}>
          <img src={hr} alt="" className={classes.service_icon} />
          <div className={classes.service_details}>
            <h5 className={classes.service_title}>HR Outsourcing</h5>
            <p className={classes.service_description}>
              Unlock efficiency with our
              <br />
              comprehensive.
            </p>
          </div>
        </div>

        <div className={classes.service_item}>
          <img src={expert} alt="" className={classes.service_icon} />
          <div className={classes.service_details}>
            <h5 className={classes.service_title}>Expatriate Services</h5>
            <p className={classes.service_description}>
              Empower your global <br /> endeavors.
            </p>
          </div>
        </div>

        <div className={classes.service_item}>
          <img src={exective} alt="" className={classes.service_icon} />
          <div className={classes.service_details}>
            <h5 className={classes.service_title}>Executive Search</h5>

            <p className={classes.service_description}>
              Executive Search Navigate  <br />the path  to leadership<br />  excellence.
            </p>
          </div>
        </div>
      </motion.div>

      <div className={classes.services_overview}>
        <h3 className={classes.overview_heading}>Our Services</h3>
        <h1 className={classes.overview_title}>Our Rigorous Process Is Proven</h1>
        <p className={classes.overview_description}>
          Embrace a transformative journey with our comprehensive offerings.
          From personalized career guidance to skill development, we prioritize
          your success. Collaborate with us for a fulfilling and rewarding
          professional experience. Unlock the door to possibilities as we
          navigate the path to your aspirations together. Your success story
          begins here.
        </p>
        <button className={classes.view_more_btn}> View More</button>
      </div>
    </div>
  );
};

export default Services;
