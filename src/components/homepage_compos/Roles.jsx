import React, { useState, useRef } from "react";
import classes from "../homepage_compos/css/homepageStyles.module.css";
import RoleCard from "./RoleCard";

export default function CaptionCarousel() {
  let companyName = "Inspiring Go";

  const cardSliderRef = useRef(null);

  const data = [
    {
      title: "JobSeeker",
      text: "Are you jobseeker who's in need of a placement ? Our platform offers every job listings. We believe you deserves access to the information they need to make carrer decisions and obviuosly succeed.",
      image: "images/jobseeker_womensmile.jpg",
      buttonname: "Join Now",
      link: "/login",
    },
    {
      title: "Company Ally",
      text: "We believe that our collaboration could be mutually beneficial for both of us.To provide you with detailed information, we encourage you to join us. Transparency is key to building a successful partnership.",
      image: "images/companydealing.jpg",
      buttonname: "Become Company Ally",
      link: "/loginCompany",
    },
    {
      title: "Mentor Team",
      text: "As a mentor with our team, you will have the opportunity to guide and support the students. With your help, we can make our service more reachable. Join as mentor and make a difference in the lives of students.",
      image: "images/mentors.jpg",
      buttonname: "Apply Here",
      link: "/contactUs",
    },
  ];

  return (
    <section className={"min-h-[90vh] bg-gray-50"}>
      <h2 className={classes.middle_heads_dark} id="roles">
        Roles For You
      </h2>
      <div ref={cardSliderRef} className={classes.opptrs4u} id="roles">
        {data.map((card, index) => (
          <RoleCard
            key={card.title}
            card={card}
            delay={0.1 * index}
            link={card.link}
          />
        ))}
      </div>
    </section>
  );
}
