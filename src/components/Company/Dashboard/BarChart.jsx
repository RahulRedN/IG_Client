/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const state = useSelector((state) => state.company.applications);
  const [data, setData] = useState([]);

  useEffect(() => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Initialize monthly data with zeros for each month
    const monthlyData = Object.fromEntries(
      monthNames.map((monthName) => [
        monthName,
        {
          month: monthName,
          Accepted: 0,
          AcceptedColor: "hsl(229, 70%, 50%)",
          Rejected: 0,
          RejectedColor: "hsl(296, 70%, 50%)",
        },
      ])
    );

    // Update counts based on application data
    state.forEach((application) => {
      const month = parseInt(application.createdAt.split("-")[1], 10) - 1; // Subtract 1 to match array index
      const monthName = monthNames[month];

      if (application.status === "accepted") {
        monthlyData[monthName].Accepted++;
      } else if (application.status === "rejected") {
        monthlyData[monthName].Rejected++;
      }
    });

    const monthlyDataArray = Object.values(monthlyData);
    setData(monthlyDataArray);
  }, [state]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      keys={["Accepted", "Rejected"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.1}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#25cc8b", "#020dff"]}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
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
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
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
