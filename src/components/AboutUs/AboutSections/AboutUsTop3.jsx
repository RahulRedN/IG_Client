import "../AboutSections/Styles/AboutUsTop3.css";
import { HeartHandshake, Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Counter from "../../UI/Counter";

const AboutUsTop3 = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const data = [
    {
      id: 1,
      text: "People Hired",
      count: 687,
      icon: <Globe2 className="Globe2" />,
    },
    {
      id: 2,
      text: "Satisfied Company",
      count: 672,
      icon: <HeartHandshake className="Globe2" />,
    },
  ];

  return (
    <div className="AboutUsTop3">
      {data.map((item, index) => {
        return (
          <motion.div
            key={item.id}
            ref={ref}
            initial={
              index === 0 ? { x: -100, opacity: 0 } : { x: -60, opacity: 0 }
            }
            animate={
              inView
                ? { x: 0, opacity: 1 }
                : { x: index === 0 ? -100 : -50, opacity: 0 }
            }
            transition={{
              ease: "easeInOut",
              duration: 0.9,
              delay: index === 0 ? 0.2 : 0.5, 
            }}
            className="peoples"
          >
            {item.icon}
            <h6><Counter from={0} to={item.count} duration={2}/>+</h6>
            <p>{item.text}</p>
          </motion.div>
        );
      })}

      <div className="provides">
        <h3>We Provide Awesome Service</h3>
      </div>
    </div>
  );
};

export default AboutUsTop3;
