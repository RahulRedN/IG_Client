/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const state = useSelector((state) => state.company);
  console.log(state);
  // Corrected data import
  const [data, setData] = useState([]);

  useEffect(() => {
    // Filter jobs where application is accepted
    const acceptedJobs = state?.jobs.filter((job) =>
      state?.applications.some(
        (app) => app.jobId === job._id && app.status === "accepted"
      )
    );

    // Count number of applicants for each job
    const jobData = acceptedJobs.map((job) => ({
      position: job.position,
      Applicants: state?.applications.filter(
        (app) => app.jobId === job._id && app.status === "accepted"
      ).length,
    }));

    // Sort data in descending order based on number of applicants
    const sortedData = jobData.sort((b, a) => b.Applicants - a.Applicants);

    setData(sortedData);
  }, [state]);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["Applicants"]}
      indexBy="position"
      margin={{ top: 50, right: 130, bottom: 50, left: 130 }}
      padding={0.3}
      layout="horizontal"
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#25cc8b"]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "position",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
