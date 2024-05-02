import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";

const PieChart = ({ companies }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (companies) {
      setData([
        {
          id: "Accepted",
          label: "Accepted",
          value: companies?.filter((company) => company.status === "accepted")
            .length,
          color: "hsl(104, 70%, 50%)",
        },
        {
          id: "Rejected",
          label: "Rejected",
          value: companies?.filter((company) => company.status === "rejected")
            .length,
          color: "hsl(40, 70%, 50%)",
        },
      ]);
    }
  }, [companies]);
  return (
    <ResponsivePie
      data={data}
      margin={{ top: -50, right: 50, bottom: 70, left: 50 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={2}
      borderColor={{
        from: "color",
        modifiers: [["darker", "0"]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={true}
      arcLabelsRadiusOffset={0.5}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["brighter", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 20,
          translateY: -30,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
