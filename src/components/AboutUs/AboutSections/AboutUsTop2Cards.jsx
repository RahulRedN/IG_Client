import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUsTop2Cards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const dummyData = [
    {
      title: "Develop & Training",
      content: "Experience transformative learning and skill enhancement.",
    },
    {
      title: "Job Placement",
      content: "Discover your perfect career fit with our personalized placement services.",
    },

    {
      title: "Job Counselling",
      content: "Providing expert advice and support tailored to your unique journey.",
    },
    {
      title: "Test & Interview",
      content: "Prepare with precision for assessments and interviews.",
    },
  ];

  return (
    <div className="AboutUsTop2Cards">
      {dummyData.map((data, index) => (

        <motion.div
        ref={ref}
        initial={{ x: 100, y: 0,  opacity: 0 }}
        animate={inView ? { x: 0, y: 0,  opacity: 1 } : "hidden"}
        transition={{ ease: "easeInOut", delay: index * 0.3, duration: 0.5}}
        className="AboutUsTop2Card"
        key={index}
      >
          <h3>{data.title}</h3>
          <p>{data.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default AboutUsTop2Cards;
