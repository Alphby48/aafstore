import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import CustomTooltip from "../../components/element/customToolTip";
import { useContext } from "react";
import { DarkMode } from "../../context/darkContext";
import { useEffect, useState } from "react";
import { GetUsers } from "../../service/users";
const DesktopChart = () => {
  const { isDarkMode } = useContext(DarkMode);
  const [widthChart, setWidthChart] = useState(0);
  const [heightChart, setHeightChart] = useState(0);
  const [userAug, setUserAug] = useState(0);
  const [userSep, setUserSep] = useState(0);

  useEffect(() => {
    const local = localStorage.getItem("hash");
    GetUsers(local, (res) => {
      const dataSet = res.filter((r) => r.date.includes("Aug"));
      const dataSet1 = res.filter((r) => r.date.includes("Sep"));
      setUserAug(dataSet.length);
      setUserSep(dataSet1.length);
    });
  });

  const data = [
    { mounth: "Aug", sold: 160, user: userAug },
    { mounth: "Sep", sold: 80, user: userSep },
    { mounth: "Oct", sold: 200, user: 0 },
    { mounth: "Nov", sold: 20, user: 0 },
    { mounth: "Dec", sold: 240, user: 0 },
  ];

  useEffect(() => {
    if (window.innerWidth < 768) {
      setWidthChart(275);
      setHeightChart(200);
    } else {
      setWidthChart(400);
      setHeightChart(300);
    }
  }, [window.innerWidth]);

  return (
    <div className="w-full p-3 flex flex-wrap sm:flex-nowrap justify-around gap-4">
      <div
        className={`w-full sm:w-1/2 p-2 rounded-lg ${
          isDarkMode ? "bg-slate-400" : "bg-gray-300"
        }`}
      >
        <h1 className="text-1xl font-poppins text-center">Product Sold</h1>
        <LineChart width={widthChart} height={heightChart} data={data}>
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
        <LineChart width={widthChart} height={heightChart} data={data}>
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

export default DesktopChart;
