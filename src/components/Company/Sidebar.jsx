import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Icon, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "./theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  Checklist,
  PendingActions,
  PostAdd,
  LogoutSharp,
  SettingsApplications,
  DocumentScanner,
  DocumentScannerSharp,
  ReviewsOutlined,
} from "@mui/icons-material";
import { useAuth } from "../../Firebase/AuthContexts";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected, onClickHandler }) => {

 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    // title="Post a Job"
    //           to="postjob"
    //           icon={<PostAdd />}
    //           selected={selected}
    //           setSelected={setSelected}
    <MenuItem
      active={selected == title}
      style={{
        // margin: "7px 0 7px 0",
        // padding : "5px"
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography variant="h4">{title}</Typography>
      <Link to={to} onClick={onClickHandler} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const data = useSelector((state) => state.company.data);

  const navigate = useNavigate();
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/logout")
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      navigate("/loginCompany");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#fffcfc !important`,
          boxShadow: "5px 20px 8px #a0a5fa",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: " 8px 20px !important",
          margin : "10px 0 10px 0",
          color: "black",
        },
        "& .pro-inner-item:hover": {
          color: "white !important",
          background : "#868dfb"
        },
        "& .pro-menu-item.active": {
          background: "#868dfb",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            // icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "20px 0 20px 20px",
            }}
          >
            {/* {!isCollapsed && (
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
              <MenuOutlinedIcon />
            </IconButton>
            )} */}
            
            <MenuOutlinedIcon />
          </IconButton>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color="#020dff"
                  sx={{ m: "8px 0 0 0" }}
                >
                  {data?.name}
                </Typography>
                <div className="mt-3">
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {data?.email}
                  </Typography>
                </div>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <Item
              title="Dashboard"
              to=""
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Stats
            </Typography> */}
            <Item
              title="Pending List"
              to="pendinglist"
              icon={<PendingActions />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Employee List"
              to="employeelist"
              icon={<Checklist />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Post a Job"
              to="postjob"
              icon={<PostAdd />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Posted Jobs"
              to="postedjobs" //private route chks session is actv or not
              icon={<DocumentScannerSharp/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reviews"
              to="reviews" //private route chks session is actv or not
              icon={<ReviewsOutlined/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Log Out"
              to="" //private route chks session is actv or not
              icon={<LogoutSharp />}
              selected={selected}
              setSelected={setSelected}
              onClickHandler={logoutHandler}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
