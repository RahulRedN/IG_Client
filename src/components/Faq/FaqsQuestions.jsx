import { faqsData, faqsDataOne, faqsDataTwo } from "../faqsData.js";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FaqQuestions = () => {
  const [refApplyForJob, inViewApplyForJob] = useInView({
    triggerOnce: true,
  });

  const [refTechnicalSupport, inViewTechnicalSupport] = useInView({
    triggerOnce: true,
  });

  const [refCareerServices, inViewCareerServices] = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <div className="faqs-container">
        <motion.div
          ref={refApplyForJob}
          initial={{ y: 100, opacity: 0 }}
          animate={inViewApplyForJob ? { y: 0, opacity: 1 } : "hidden"}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.5 }}
          className="faq-heading"
        >
          <div className="color-heading"> </div>
          <h1> Apply For a Job</h1>
        </motion.div>

        <Accordion allowToggle>
          {faqsData.map((faq) => (
            <AccordionItem key={faq.id} className="faq-item">
              <h2>
                <AccordionButton className="accordion-button">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="faq-question"
                  >
                    {faq.Faq_Que}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="faq-answer">
                {faq.Faq_Ans}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="faqs-container">
        <motion.div
          ref={refTechnicalSupport}
          initial={{ y: 100, opacity: 0 }}
          animate={inViewTechnicalSupport ? { y: 0, opacity: 1 } : "hidden"}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }}
          className="faq-heading"
        >
          <div className="color-heading"> </div>
          <h1> Technical Support</h1>
        </motion.div>

        <Accordion allowToggle>
          {faqsDataOne.map((faq) => (
            <AccordionItem key={faq.id} className="faq-item">
              <h2>
                <AccordionButton className="accordion-button">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="faq-question"
                  >
                    {faq.Faq_Que}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="faq-answer">
                {faq.Faq_Ans}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="faqs-container">
        <motion.div
          ref={refCareerServices}
          initial={{ y: 100, opacity: 0 }}
          animate={inViewCareerServices ? { y: 0, opacity: 1 } : "hidden"}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }}
          className="faq-heading"
        >
          <div className="color-heading"> </div>
          <h1> Career Services</h1>
        </motion.div>

        <Accordion allowToggle>
          {faqsDataTwo.map((faq) => (
            <AccordionItem key={faq.id} className="faq-item">
              <h2>
                <AccordionButton className="accordion-button">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="faq-question"
                  >
                    {faq.Faq_Que}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="faq-answer">
                {faq.Faq_Ans}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default FaqQuestions;
