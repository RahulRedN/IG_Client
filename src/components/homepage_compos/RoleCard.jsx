import React from "react";
import classes from "./css/homepageStyles.module.css";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

function RoleCard({ card, delay, link }) {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
              transition: { ease: "easeIn", duration: 0.3, delay: delay },
            }
          : "hidden"
      }
      whileHover={{
        scale: 1.04,
        transition: { ease: "easeIn", duration: 0.1, damping: 0, stiffness: 0 },
      }}
      ref={ref}
      className={classes.oppcard + " pb-6"}
    >
      <div className={"w-full relative " + classes.container}>
        <img className={classes.oppcardimg} src={card.image} alt={card.title} />
        <p>{card.text}</p>
        <div
          className={
            "z-[2] bg-black opacity-[0.5] absolute top-0 left-0 bottom-0 right-0 " +
            classes.overlay
          }
        ></div>
      </div>
      <h2 className={classes.cardcatg + " pl-6 pr-6"}>{card.title}</h2>
      <hr />
      <div className="flex flex-col justify-between h-full pl-3 pr-3 text-justify">
        <Link className={classes.oppcardbtn} to={link}>
          {card.buttonname}
        </Link>
      </div>
    </motion.div>
  );
}

export default RoleCard;
