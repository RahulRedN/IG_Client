import "../../Styles/Faqs.css";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FaqSpeak from "../Faq/FaqSpeak";
import FaqQuestions from "../Faq/FaqsQuestions";

const Faqs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return (
    <div className="faq-page">
      <div className="faq-top">
        <motion.div
          ref={ref}
          initial={{ y: 100, opacity: 0 }} // Change y to 100 to start from the bottom
          animate={inView ? { y: 0, opacity: 1 } : "hidden"} // Change y to 0 to move up
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }} // Add delay of 0.3 seconds
          className="formotion"
          // key={index}
        >
          <h1>Frequently asked questions</h1>
          <p>
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            quis nihil doloribus. */}
          </p>
          <hr />
        </motion.div>
      </div>

      <FaqQuestions />

      <FaqSpeak />
    </div>
  );
};

export default Faqs;
