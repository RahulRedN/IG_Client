/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from ".././theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "./Header";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import StatBox from "./StatBox";
import ProgressCircle from "./ProgressCircle";
import PieChart from "./PieChart";
import BarChart_TopJobs from "./BarChart_TopJobs";
import {
  Money,
  MoneyOff,
  MoneyOffCsredSharp,
  MoneySharp,
  NotInterested,
  NotInterestedTwoTone,
  Verified,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const state = useSelector((state) => state.company);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="overflow-auto">
      <Box padding="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={state?.jobs?.length}
              subtitle="Jobs Posted"
              progress="0"
              icon={
                <EmailIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "50px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={state.applications.length}
              subtitle="Total Applications recieved"
              progress="0.80"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "50px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={
                state.applications.filter((job) => job.status == "accepted")
                  .length
              }
              subtitle="Applications Accepted"
              progress="0.50"
              icon={
                <Verified
                  sx={{ color: colors.greenAccent[600], fontSize: "50px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={
                state.applications.filter((job) => job.status == "rejected")
                  .length
              }
              subtitle="Applications Rejected"
              progress="0.30"
              icon={
                <NotInterestedTwoTone
                  sx={{ color: colors.greenAccent[600], fontSize: "50px" }}
                />
              }
            />
          </Box>

          <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Monthly Trend of Applications
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>

          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Tob Jobs of your Company
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart_TopJobs isDashboard={true} />
            </Box>
          </Box>

          {/* <Box //pie chart
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}

          <Box //pie chart
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Current State of Monthly Applications
            </Typography>
            <PieChart
              accept={
                state.applications.filter((job) => job.status == "accepted")
                  .length
              }
              reject={
                state.applications.filter((job) => job.status == "rejected")
                  .length
              }
              pending={
                state.applications.filter((job) => job.status == "pending")
                  .length
              }
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
