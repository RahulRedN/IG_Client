// import React from "react";

// import { Box } from "@chakra-ui/react";
// import Slider from "react-slick";

// import TestimonialCard from "../cards/TestimonialCard";

// import classes from "./Testimonials.module.css";

// const Testimonials = () => {
//   const settings = {
//     focusOnSelect: true,
//     infinite: true,
//     autoplay: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   return (
//     <div className={classes.container}>
//       <div className={classes.slider}>
//         <img src="/assets/bg-3.webp" alt="" />
//         <Box
//           position={"relative"}
//           width={"50vw"}
//           height={"fit-content"}
//           padding={"1rem"}
//         >
//           <Slider {...settings}>
//             <TestimonialCard />
//           </Slider>
//         </Box>
//       </div>
//       <div className={classes.backdrop}></div>
//     </div>
//   );
// };

// export default Testimonials;



import { Box } from "@chakra-ui/react";
import Slider from "react-slick";
import TestimonialCard from "../cards/TestimonialCard";
import classes from "./Testimonials.module.css";

const Testimonials = () => {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };


  const testimonialData = [
    {
      id: 1,
      quote: "In the realm of UI/UX design, our team is dedicated to crafting seamless and visually appealing user experiences...",
      name: "John Doe",
      role: "UI/UX Designer",
    },
    {
      id: 2,
      quote: "Our development team is committed to building robust and scalable solutions that meet the needs of our clients...",
      name: "Jane Smith",
      role: "Software Engineer",
    },
    {
      id: 3,
      quote: "As a project manager, I focus on ensuring timely delivery and effective communication within the team...",
      name: "Bob Johnson",
      role: "Project Manager",
    },
    {
      id: 4,
      quote: "In the world of marketing, creativity and strategy go hand in hand to create compelling campaigns that resonate with our audience...",
      name: "Alice Williams",
      role: "Marketing Specialist",
    },
  ];
  

  
  return (
    <div className={classes.container}>
      <div className={classes.slider}>
        <img src="/assets/bg-3.webp" alt="" />
        <Box
          position={"relative"}
          width={"50vw"}
          height={"fit-content"}
          padding={"1rem"}
        >
          <Slider {...settings}>
            {testimonialData.map((testimonial) => (
              <TestimonialCard key={testimonial.id} data={testimonial} />
            ))}
          </Slider>
        </Box>
      </div>
      <div className={classes.backdrop}></div>
    </div>
  );
};

export default Testimonials;
