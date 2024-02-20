/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import "../Testimonial/Styles/Testimonialstyles.css";
import { ChevronRight, ChevronLeft } from "lucide-react";

const TestCard = ({ heading, quote, imageSrc, altText, name }) => {
  return (
    <div className="testimonial-card visible">
      <img src={heading} className="testimonial-card-heading-img" />
      <p className="testimonial-card-quote">{quote}</p>
      <img className="testimonial-card-image" src={imageSrc} alt={altText} />
      <p className="testimonial-card-name">{name}</p>
    </div>
  );
};

const TestimonialCard = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext(); 
    }, 5000); // Adjust the interval as needed (e.g., 5000 milliseconds = 5 seconds)

    return () => clearInterval(intervalId);
  }, [testimonials, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="testimonial-slider">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`testimonial-card ${
            index === currentIndex ? "visible" : "hidden"
          }`}
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
