import { useState, useEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";

import classes from "../components/JobSeeker/Home/JobSeeker.module.css";

import Navbar from "../components/JobSeeker/Navbar";
import Footer_Job from "../components/JobSeeker/Footer_Job";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const JobSeeker = () => {
  const { pathname } = useLocation();
  const [navClass, setNavClass] = useState(classes.navbar);

  const isLink = (path) => {
    return path === pathname;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.title = "InspiringGo | Jobseeker";
  }, [pathname]);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 400) {
        setNavClass(`${classes.navbar} ${classes.sticky}`);
      } else {
        setNavClass(classes.navbar);
      }
    };
  }, []);

  if (isLink("/jobseeker/profile")) {
    return <Outlet />;
  }

  return (
    <>
      <Navbar navClass={navClass} />
      <Outlet />
      <Footer_Job />
    </>
  );
};

export default JobSeeker;
