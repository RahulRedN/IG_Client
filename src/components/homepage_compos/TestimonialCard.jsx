/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import classes from "../AboutUs/Testimonial/Styles/Testimonialstyles.module.css";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TestCard = ({ heading, quote, imageSrc, altText, name }) => {
  const [ref, inView] = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={
        inView
          ? { opacity: 1, transition: { ease: "easeInOut", duration: 0.6 } }
          : "hidden"
      }
      className={classes.testimonial_card + " " + classes.visible}
    >
      <img src={heading} className={classes.testimonial_card_heading_img} />
      <p className={classes.testimonial_card_quote}>{quote}</p>
      <img
        className={classes.testimonial_card_image}
        src={imageSrc}
        alt={altText}
      />
      <p className={classes.testimonial_card_name}>{name}</p>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [testimonials, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={classes.testimonial_slider}>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={
            classes.testimonial_card +
            " " +
            (index === currentIndex ? classes.visible : classes.hidden)
          }
        >
          <TestCard
            heading={testimonial.heading}
            quote={testimonial.quote}
            imageSrc={testimonial.imageSrc}
            altText={testimonial.altText}
            name={testimonial.name}
          />
        </div>
      ))}
    </div>
  );
};

export default TestimonialCard;
