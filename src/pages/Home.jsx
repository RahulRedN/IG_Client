import { useState, useEffect } from "react";

import classes from "../components/homepage_compos/css/Navbar_Home_Styles.module.css";

import Footer_Home from "../components/homepage_compos/Footer_Home.jsx";

import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/homepage_compos/Navbar_Home.jsx";

const Home = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isLink = (path) => {
    return path === pathname;
  };

  const [navClass, setNavClass] = useState(classes.navbar);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 400) {
        setNavClass(`${classes.navbar} ${classes.sticky}`);
      } else {
        setNavClass(classes.navbar);
      }
    };
  }, []);
  return (
    <>
      <Navbar navClass={navClass + " " + (isLink("/") ? classes.home : "")} />
      <Outlet />
      <Footer_Home />
    </>
  );
};

export default Home;
