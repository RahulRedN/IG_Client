import classes from "./css/OurServices.module.css";

import Slider from "react-slick";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const OurServices = () => {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ChevronRightIcon color="black" strokeWidth={4} />,
    prevArrow: <ChevronLeftIcon color="black" strokeWidth={4} />,
  };

  const content = [
    {
      title: "Privacy & Security",
      content:
        "We suggest strong passwords for user accounts to prevent unauthorized access to client data.Do not share or disclose client data without their explicit consent, except where required by law or to protect the safety of others.",
      img: "/assets/service/giving_student_oppurtunity_toview_profiles.svg",
    },
    {
      title: "Verified Company Details",
      content:
        "We ensure that the details provided to Jobseekers about the jobs/internships is eligible.we provide details along with stipend that will be provided and perks.",
      img: "/assets/service/mentor_female_male_discuss.svg",
    },
  ];
  return (
    <section className="flex flex-col justify-center bg-gray-50 min-h-[95vh]">
      <h2 className={classes.middle_heads_dark}>Our Services</h2>
      <div id="our_services">
        <Slider {...settings} className={classes.our_services_container}>
          {content.map((service, idx) => (
            <div className="pl-[1rem] pr-[1rem]" key={idx}>
              <div className={classes.our_services_child}>
                <div className={classes.os_svgs}>
                  <img src={service.img} />
                </div>
                <div className={classes.os_tagline}>
                  <h2>{service.title}</h2>
                  <p>{service.content}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default OurServices;
