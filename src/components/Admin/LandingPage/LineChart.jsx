import { ResponsiveLine } from "@nivo/line";

let data = [
    {
      "id": "Jobseekers",
      "color": "hsl(79, 70%, 50%)",
      "data": [
        {
          "x": "January",
          "y": 264
        },
        {
          "x": "February",
          "y": 41
        },
        {
          "x": "March",
          "y": 68
        },
        {
          "x": "April",
          "y": 59
        },
        {
          "x": "May",
          "y": 108
        },
        {
          "x": "June",
          "y": 251
        },
        {
          "x": "July",
          "y": 266
        },
        {
          "x": "August",
          "y": 252
        },
        {
          "x": "September",
          "y": 28
        },
        {
          "x": "October",
          "y": 111
        },
        {
          "x": "November",
          "y": 169
        },
        {
          "x": "December",
          "y": 285
        }
      ]
    },
    {
      "id": "Company",
      "color": "hsl(79, 70%, 50%)",
      "data": [
        {
          "x": "January",
          "y": 32
        },
        {
          "x": "February",
          "y": 233
        },
        {
          "x": "March",
          "y": 213
        },
        {
          "x": "April",
          "y": 53
        },
        {
          "x": "May",
          "y":332
        },
        {
          "x": "June",
          "y": 22
        },
        {
          "x": "July",
          "y": 333
        },
        {
          "x": "August",
          "y": 543
        },
        {
          "x": "September",
          "y": 43
        },
        {
          "x": "October",
          "y": 344
        },
        {
          "x": "November",
          "y": 434
        },
        {
          "x": "December",
          "y": 634
        }
      ]
    },
  ]


const LineChart = () => (
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
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 80,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
              {
                  on: 'hover',
                  style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                  }
              }
          ]
      }
  ]}
  />
);

export default LineChart;
