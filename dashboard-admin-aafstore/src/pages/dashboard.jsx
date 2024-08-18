import DarkModePage from "../components/element/darkmode";
import { DarkMode } from "../context/darkContext";
import { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import Sidebar from "../fragments/sidebar";

const Dashboard = () => {
  const { isDarkMode } = useContext(DarkMode);

  const data = [
    { mounth: "Jan", sold: 20 },
    { mounth: "Feb", sold: 40 },
    { mounth: "Mar", sold: 30 },
    { mounth: "Apr", sold: 80 },
    { mounth: "May", sold: 100 },
    { mounth: "Jun", sold: 20 },
    { mounth: "Jul", sold: 140 },
    { mounth: "Aug", sold: 160 },
    { mounth: "Sep", sold: 80 },
    { mounth: "Oct", sold: 200 },
    { mounth: "Nov", sold: 20 },
    { mounth: "Dec", sold: 240 },
  ];

  return (
    <div className="flex w-full relative">
      <Sidebar bgDash="bg-sky-500"></Sidebar>
      <div className={`w-4/5 p-3 ${isDarkMode && "bg-slate-700"}`}>
        <div
          className={`dashboard flex rounded-lg flex-col ${
            isDarkMode === true ? "bg-slate-600" : "bg-slate-200"
          }`}
        >
          <div className="w-full h-10 p-3 flex justify-between items-center">
            <div>
              <p className={` ${isDarkMode && "text-white"}`}>
                <span
                  className={` ${
                    isDarkMode ? "text-slate-200" : "text-gray-500"
                  }`}
                >
                  dashboard
                </span>{" "}
                / home
              </p>
            </div>
            <div className="flex items-center gap-3 mr-5">
              <i class="fa-regular fa-bell"></i>
              <DarkModePage></DarkModePage>
            </div>
          </div>
          <div className="w-full p-3 flex flex-col">
            <h1
              className={`text-3xl font-poppins font-medium ${
                isDarkMode && "text-white"
              }`}
            >
              Dashboard
            </h1>
            <div
              className={`flex w-full justify-around p-6 mt-6 ${
                isDarkMode ? "bg-gray-500" : "bg-slate-200"
              } rounded-lg`}
            >
              <div className="w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
                <i class="fa-solid fa-cart-arrow-down text-2xl text-emerald-700"></i>
                <h1 className="text-3xl font-poppins">20</h1>
                <p className="text-lg">Total Products</p>
              </div>
              <div className="w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
                <i class="fa-solid fa-users text-2xl text-emerald-700"></i>
                <h1 className="text-3xl font-poppins">20</h1>
                <p className="text-lg">Total Client</p>
              </div>
              <div className="w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
                <i class="fa-solid fa-hand-holding-dollar text-2xl text-emerald-700"></i>
                <h1 className="text-3xl font-poppins">20</h1>
                <p className="text-lg">Sold</p>
              </div>
            </div>
            <div className="w-full p-3 flex ">
              <div className="w-1/2 bg-purple-200 p-2 rounded-lg">
                <h1 className="text-1xl font-poppins text-center">
                  Product Sold
                </h1>
                <LineChart width={400} height={300} data={data}>
                  <Line type="linear" dataKey="sold" stroke="#8884d8"></Line>
                  <XAxis dataKey="mounth"></XAxis>
                  <YAxis></YAxis>
                  <Tooltip></Tooltip>
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
