import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import CustomTooltip from "../../components/element/customToolTip";
import { useContext } from "react";
import { DarkMode } from "../../context/darkContext";
const MobileChart = () => {
  const { isDarkMode } = useContext(DarkMode);
  const data = [
    { mounth: "Jan", sold: 20, user: 10 },
    { mounth: "Feb", sold: 40, user: 20 },
    { mounth: "Mar", sold: 30, user: 5 },
    { mounth: "Apr", sold: 80, user: 15 },
    { mounth: "May", sold: 100, user: 50 },
    { mounth: "Jun", sold: 20, user: 30 },
    { mounth: "Jul", sold: 140, user: 70 },
    { mounth: "Aug", sold: 160, user: 20 },
    { mounth: "Sep", sold: 80, user: 30 },
    { mounth: "Oct", sold: 200, user: 40 },
    { mounth: "Nov", sold: 20, user: 50 },
    { mounth: "Dec", sold: 240, user: 20 },
  ];

  return (
    <div className="w-full p-3 hidden flex-wrap justify-around gap-4">
      <div
        className={`w-full sm:w-1/2 p-2 rounded-lg ${
          isDarkMode ? "bg-slate-400" : "bg-gray-300"
        }`}
      >
        <h1 className="text-1xl font-poppins text-center">Product Sold</h1>
        <LineChart width={300} height={200} data={data}>
          <Line
            type="linear"
            dataKey="sold"
            stroke={`${isDarkMode ? "#f5e105" : "#031cfc"}`}
          ></Line>
          <XAxis
            dataKey="mounth"
            stroke={`${isDarkMode ? "white" : "black"}`}
          ></XAxis>
          <YAxis stroke={`${isDarkMode ? "white" : "black"}`}></YAxis>
          <Tooltip content={<CustomTooltip />}></Tooltip>
        </LineChart>
      </div>
      <div
        className={`w-full sm:w-1/2 p-2 rounded-lg ${
          isDarkMode ? "bg-slate-400" : "bg-gray-300"
        }`}
      >
        <h1 className="text-1xl font-poppins text-center">Users</h1>
        <LineChart width={300} height={200} data={data}>
          <Line
            type="linear"
            dataKey="user"
            stroke={`${isDarkMode ? "#f5e105" : "#031cfc"}`}
          ></Line>
          <XAxis
            dataKey="mounth"
            stroke={`${isDarkMode ? "white" : "black"}`}
          ></XAxis>
          <YAxis stroke={`${isDarkMode ? "white" : "black"}`}></YAxis>
          <Tooltip content={<CustomTooltip />}></Tooltip>
        </LineChart>
      </div>
    </div>
  );
};

export default MobileChart;
