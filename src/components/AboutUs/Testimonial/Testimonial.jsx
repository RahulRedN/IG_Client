import TestimonialCard from "./TestimonialCard";
import classes from "../Testimonial/Styles/Testimonialstyles.module.css";
import team1 from "../Testimonial/Resources/team-1.jpg";
import team2 from "../Testimonial/Resources/team-2.jpg";
import team3 from "../Testimonial/Resources/team-3.jpg";
import heading from "../Testimonial/Resources/tilt.png";
import { motion } from "framer-motion";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      heading: heading,
      quote:
        " I had a great experience with this company. The service was excellent, and the team was very professional.",
      imageSrc: team1,
      altText: "Customer Photo 1",
      name: "John Doe",
    },
    {
      id: 2,
      heading: heading,
      quote:
        "Amazing service! The team went above and beyond to meet my expectations. Highly recommended.",
      imageSrc: team2,
      altText: "Customer Photo 2",
      name: "Jane Smith",
    },
    {
      id: 3,
      heading: heading,
      quote:
        "The quality of the products is outstanding. I'm a satisfied customer and will definitely come back.",
      imageSrc: team3,
      altText: "Customer Photo 3",
      name: "Robert Johnson",
    },
  ];

  return (
    <div className={classes.testimonial_container}>
      <div className={classes.testimonial_top}>
        <h1> What They Say ?</h1>
        <p>
          Vestibulum sit amet odio dui. Integer eleifend nibh massa, nec
          vehicula metus efficitur non. Pellentesque iaculis tincidunt purus,
          eleifend interdum arcu tempor ac.
        </p>
      </div>
      <div className={classes.testimonial_bottom}>
        <motion.div
          initial={{ x: 100, y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <TestimonialCard testimonials={testimonials} />
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
