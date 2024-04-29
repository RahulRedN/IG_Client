import { useState, useEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";

import classes from "../components/JobSeeker/Home/JobSeeker.module.css";

import Navbar from "../components/JobSeeker/Navbar";
import Footer_Job from "../components/JobSeeker/Footer_Job";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setData } from "../redux/jobseekerReducer";

const JobSeeker = () => {
  const { pathname } = useLocation();
  const [navClass, setNavClass] = useState(classes.navbar);
  const dispatch = useDispatch();

  const isLink = (path) => {
    return path === pathname;
  };

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const uid = decoded.uid;
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER + "/api/jobseeker/user?uid=" + uid,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            },
          }
        );

        if (res.status == 200) {
          console.log(res.data.applications);
          dispatch(
            setData({
              data: {
                ...res.data.user,
                uid: res.data.user._id,
                applications: res.data.applications,
              },
              jobs: res.data.jobs,
            })
          );
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

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
