
import TestimonialCard from "./TestimonialCard";
import classes from "../AboutUs/Testimonial/Styles/Testimonialstyles.module.css"
import team1 from "../AboutUs/Testimonial/Resources/team-1.jpg"
import team2 from "../AboutUs/Testimonial/Resources/team-2.jpg"
import team3 from "../AboutUs/Testimonial/Resources/team-3.jpg"
import heading from "../AboutUs/Testimonial/Resources/tilt.png"

const Testimonial = () => {

  const testimonials = [
    
    {
      id: 1,
      heading: heading,
      quote: " I had a great experience with this company. The service was excellent, and the team was very professional.",
      imageSrc:team1,
      altText: "Customer Photo 1",
      name: "John Doe"
  },
  {
      id: 2,
      heading: heading,
      quote: "Amazing service! The team went above and beyond to meet my expectations. Highly recommended.",
      imageSrc: team2,
      altText: "Customer Photo 2",
      name: "Jane Smith"
  },
  {
      id: 3,
      heading:heading,
      quote: "The quality of the products is outstanding. I'm a satisfied customer and will definitely come back.",
      imageSrc: team3,
      altText: "Customer Photo 3",
      name: "Robert Johnson"
  }
  //,
   //{
  //     id: 4,
  //     heading: heading,
  //     quote: "Fast delivery and excellent customer support. I recommend this company to everyone.",
  //     imageSrc: team2,
  //     altText: "Customer Photo 4",
  //     name: "Emily Brown"
  // },
  ];

  return (
    <div className={classes.testimonial_container}>

      <div className={classes.testimonial_top}>
        <h1> What They Say ?</h1>
        <p>
          Vestibulum sit amet odio dui. Integer eleifend nibh massa, nec
          vehicula metus efficitur non. Pellentesque iaculis tincidunt  purus,
          eleifend interdum arcu tempor ac.
        </p>
      </div>
      <div className={classes.testimonial_bottom}>
        <TestimonialCard testimonials={testimonials} />
      </div>
    </div>
  );
};

export default Testimonial;




// import React from "react";
// import { useState, useEffect } from "react";
// import classes from ".//homepageStyles.module.css";
// import Testimonial from "./Testimonial";
// function Testimonials() {
//   const [testimonialIndex, setTestimonialIndex] = useState(0);
//   const testimonials = [
//     {
//       username: "Shekar Guptha",
//       currProfession: "Web Application Developer",
//       review:
//         "My tutor was not only knowledgeable but also patient and encouraging, which helped me to stay motivated and focused. With their help, I was able to improve my grades and achieve my academic goals. I also appreciated the flexibility of their scheduling system, which allowed me to easily book sessions at times that worked for me.",
//     },
//     {
//       username: "Roshini",
//       currProfession: "Working at Samsung",
//       review:
//         "Finding a job through Inspiring Go was life-changing. Not only did I secure a position at Samsung, but the mentoring opportunities on the platform have been instrumental in shaping my career. Inspiring Go is a true catalyst for success.",
//     },
//     {
//       username: "Srinath varshith",
//       currProfession: "Tutoring Data Analytics ",
//       review:
//         "Inspiring Go has empowered me to tutor data analytics, connecting me with enthusiastic learners and providing a fulfilling teaching experience. It's a platform that fosters knowledge-sharing and growth.",
//     },
//     {
//       username: "Venu Madhav",
//       currProfession: "Working at Adobe ",
//       review:
//         "Thanks to Inspiring Go, I not only found my dream job at Adobe but also acquired the necessary skills through their courses. The platform's seamless integration of job search and learning resources has been a game-changer in advancing my career.",
//     },
//     {
//       username: "Sagar Verma",
//       currProfession: "App Developer",
//       review:
//         "Inspiring Go transformed my career as an app developer, connecting me with my dream job and a supportive community that accelerated my success. This platform is a game-changer for anyone seeking meaningful career opportunities.",
//     },
//   ];//len 5
//   const testimonialsColors = ["#dbeafe","#bfdbfe","#93c5fd","#60a5fa","#3b82f6"]
//   const showSlide = (index) => {
//     if (index < 0) {
//       setTestimonialIndex(testimonials.length - 1);
//     } else if (index >= testimonials.length) {
//       setTestimonialIndex(0);
//     }
//   };

//   const prevSlide = () => {
//     setTestimonialIndex((prevIndex) => prevIndex - 1);
//   };

//   const nextSlide = () => {
//     setTestimonialIndex((prevIndex) => prevIndex + 1);
//   };

//   useEffect(() => {
//     showSlide(testimonialIndex);
//     console.log("effect called");
//   }, [testimonialIndex]);
//   return (
//     <>
//       <section className={classes.last_info}>
//         <h2 className={classes.middle_heads_dark}>Our Testimonials</h2>
//         <div className={classes.testimonials}>
//           <button className={classes.prev_button} onClick={() => prevSlide()}>
//             &#10094;
//           </button>
//           {testimonials.map((testimonial, index) => (
//             <Testimonial
//                key = {testimonial.username}
//               testimonial={testimonial}
//               tIdx={testimonialIndex} //display index
//               Idx={index} //card index
//             />
//           ))}

//           <button className={classes.next_button} onClick={() => nextSlide()}>
//             &#10095;
//           </button>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Testimonials;
