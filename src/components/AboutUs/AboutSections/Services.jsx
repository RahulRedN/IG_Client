import "../AboutSections/Styles/Services.css";
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
    <div className="services-container">
      <motion.div
        ref={ref}
        initial={{ x: -50, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : "hidden"}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.0 }} // Add delay of 0.3 seconds
        // key={index}

        className="service-top"
      >
        <div className="service-item">
          <img src={note} alt="" className="service-icon" />
          <div className="service-details">
            <h5 className="service-title">Recruitment</h5>
            <p className="service-description">
              Elevate your team with <br />
              strategic talent  <br />acquisition.
            </p>
          </div>
        </div>

        <div className="service-item">
          <img src={hr} alt="" className="service-icon" />
          <div className="service-details">
            <h5 className="service-title">HR Outsourcing</h5>
            <p className="service-description">
              Unlock efficiency with our
              <br />
              comprehensive.
            </p>
          </div>
        </div>

        <div className="service-item">
          <img src={expert} alt="" className="service-icon" />
          <div className="service-details">
            <h5 className="service-title">Expatriate Services</h5>
            <p className="service-description">
              Empower your global <br /> endeavors.
            </p>
          </div>
        </div>

        <div className="service-item">
          <img src={exective} alt="" className="service-icon" />
          <div className="service-details">
            <h5 className="service-title">Executive Search</h5>

            <p className="service-description">
              Executive Search Navigate  <br />the path  to leadership<br />  excellence.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="services-overview">
        <h3 className="overview-heading">Our Services</h3>
        <h1 className="overview-title">Our Rigorous Process Is Proven</h1>
        <p className="overview-description">
          Embrace a transformative journey with our comprehensive offerings.
          From personalized career guidance to skill development, we prioritize
          your success. Collaborate with us for a fulfilling and rewarding
          professional experience. Unlock the door to possibilities as we
          navigate the path to your aspirations together. Your success story
          begins here.
        </p>
        <button className="view-more-btn"> View More</button>
      </div>
    </div>
  );
};

export default Services;
