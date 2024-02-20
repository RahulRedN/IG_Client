/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import classes from "../Home/Testimonials.module.css";

const TestimonialCard = ({ data }) => {
  const { quote, name, role } = data;

  return (
    <div className={classes.card}>
      <div className={classes.info}>
        <img src="/assets/quotes-sign.webp" alt="Quotes" />
        <p>{quote}</p>
      </div>
      <div className={classes.reviewer}>
        <IoPersonCircle size={60} />
        <div className={classes.name}>
          <span>{name}</span>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

