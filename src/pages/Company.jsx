/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Company/Sidebar.jsx";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../components/Company/theme.js";
import Topbar from "../components/Company/Topbar.jsx";

import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { setCompanyData } from "../redux/companyReducer.js";

const Home = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const uid = decoded.uid;
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER + "/api/company/user?uid=" + uid
        );
        if (res.status == 200) {
          dispatch(
            setCompanyData({
              data: res.data.company,
              jobs: res.data.companyJobs,
              applications: res.data.applications,
              users: res.data.userInfo,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const isLink = (path) => {
    return path === pathname;
  };

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="flex min-h-screen">
            <Sidebar isSidebar={isSidebar} />
            <Box className="w-full">
              <Outlet />
              {/* <div className="text-center text-gray-800 font-[600]">© 2023 Inspiring Go</div> */}
            </Box>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default Home;
