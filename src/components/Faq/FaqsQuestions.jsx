import { faqsData, faqsDataOne, faqsDataTwo } from "../faqsData.js";

import classes from '../../Styles/Faqs.module.css'

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react";
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
      <div className={classes.faqs_container}>
        <motion.div
          ref={refApplyForJob}
          initial={{ y: 100, opacity: 0 }}
          animate={inViewApplyForJob ? { y: 0, opacity: 1 } : "hidden"}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.5 }}
          className={classes.heading}
        >
          <div className={classes.color_heading}> </div>
          <h1> Apply For a Job</h1>
        </motion.div>

        <Accordion allowToggle>
          {faqsData.map((faq) => (
            <AccordionItem key={faq.id} className={classes.faq_item}>
              <h2>
                <AccordionButton className={classes.accordion_button}>
                  <Box as="span" flex="1" textAlign="left" className={classes.faq_question}>
                    {faq.Faq_Que}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className={classes.faq_answer}>
                {faq.Faq_Ans}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className={classes.faqs_container}>
        <motion.div
          ref={refTechnicalSupport}
          initial={{ y: 100, opacity: 0 }}
          animate={inViewTechnicalSupport ? { y: 0, opacity: 1 } : "hidden"}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }}
          className={classes.heading}
        >
          <div className={classes.color_heading}> </div>
          <h1> Technical Support</h1>
        </motion.div>

        <Accordion allowToggle>
          {faqsDataOne.map((faq) => (
            <AccordionItem key={faq.id} className={classes.faq_item}>
              <h2>
                <AccordionButton className={classes.accordion_button}>
                  <Box as="span" flex="1" textAlign="left" className={classes.faq_question}>
                    {faq.Faq_Que}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className={classes.faq_answer}>
                {faq.Faq_Ans}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className={classes.faqs_container}>
        <motion.div
          ref={refCareerServices}
          initial={{ y: 100, opacity: 0 }}
          animate={inViewCareerServices ? { y: 0, opacity: 1 } : "hidden"}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }}
          className={classes.heading}
        >
          <div className={classes.color_heading}> </div>
          <h1> Career Services</h1>
        </motion.div>

        <Accordion allowToggle>
          {faqsDataTwo.map((faq) => (
            <AccordionItem key={faq.id} className={classes.faq_item}>
              <h2>
                <AccordionButton className={classes.accordion_button}>
                  <Box as="span" flex="1" textAlign="left" className={classes.faq_question}>
                    {faq.Faq_Que}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className={classes.faq_answer}>
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
