/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { useEffect } from "react";

import { useInView } from "react-intersection-observer";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const Counter = ({ from, to, duration }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: duration });
      return controls.stop;
    }
  }, [inView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default Counter;
