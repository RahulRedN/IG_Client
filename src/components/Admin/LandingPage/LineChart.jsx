import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";

const LineChart = ({ users, companies }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to calculate count of documents by createdAt for a given array of items
    const getCountByMonth = (items) => {
      const countsByMonth = {};
      // Initialize countsByMonth with zeros for all months
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
      monthNames.forEach((month) => {
        countsByMonth[month] = 0;
      });
      // Loop through the items and count by month
      items.forEach((item) => {
        const createdAtMonth = new Date(item.createdAt).getMonth();
        const monthName = monthNames[createdAtMonth];
        countsByMonth[monthName]++;
      });
      // Convert countsByMonth object to array of { x, y } objects
      return monthNames.map((month) => ({ x: month, y: countsByMonth[month] }));
    };

    // Calculate count of documents by createdAt for users and companies
    const usersData = getCountByMonth(users);
    const companiesData = getCountByMonth(companies);

    // Update state with the formatted data
    setData([
      {
        id: "Jobseekers",
        color: "hsl(79, 70%, 50%)",
        data: usersData,
      },
      {
        id: "Company",
        color: "hsl(79, 70%, 50%)",
        data: companiesData,
      },
    ]);
  }, [users, companies]);

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 50, bottom: 120, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month's",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
        format: ".2s",
      }}
      enableGridY={false}
      colors={{ scheme: "nivo" }}
      lineWidth={2}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableCrosshair={false}
      useMesh={true}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 80,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
