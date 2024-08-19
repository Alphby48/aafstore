import DarkModePage from "../components/element/darkmode";
import { DarkMode } from "../context/darkContext";
import { useContext } from "react";

import DesktopChart from "../fragments/chart/desktopChart";
import MobileChart from "../fragments/chart/mobileChart";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const { isDarkMode } = useContext(DarkMode);
  const [isSideBar, setIsSideBar] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleCollaps = () => {
    setIsSideBar(!isSideBar);
  };

  const handlingSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <div className="flex w-full relative">
      <Sidebar
        className={`${isDarkMode ? "bg-slate-600" : "bg-sky-500"}`}
        collapsed={isSideBar}
        toggled={toggleSidebar}
        breakPoint="md"
      >
        <Menu className="p-1">
          <i
            class="sm:hidden fa-regular fa-circle-xmark text-3xl text-slate-500 absolute top-2 right-5 z-50"
            onClick={handlingSidebar}
          ></i>
          <MenuItem
            icon={
              <i
                className="fa-solid fa-bars hidden sm:block"
                onClick={handleCollaps}
              ></i>
            }
            className="menu1 mb-10"
          >
            <h2 className="text-2xl font-poppins">AAF Store</h2>
          </MenuItem>
          <MenuItem
            className={`my-3 rounded-lg ${
              isDarkMode ? "bg-slate-600" : "bg-red-100"
            }`}
            icon={
              <i
                className={`fa-solid fa-gauge ${isDarkMode && "text-white"}`}
              ></i>
            }
          >
            <h1
              className={`font-poppins ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Dashboard
            </h1>
          </MenuItem>
          <MenuItem
            className={`my-3 rounded-lg ${
              isDarkMode ? "bg-slate-600" : "bg-red-100"
            }`}
            icon={
              <i
                className={`fa-solid fa-cart-shopping ${
                  isDarkMode && "text-white"
                }`}
              ></i>
            }
          >
            <h1
              className={`font-poppins ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Add Products
            </h1>
          </MenuItem>
          <MenuItem
            className={`my-3 rounded-lg ${
              isDarkMode ? "bg-slate-600" : "bg-red-100"
            }`}
            icon={
              <i
                className={`fa-solid fa-users ${isDarkMode && "text-white"}`}
              ></i>
            }
          >
            <h1
              className={`font-poppins ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Users Control
            </h1>
          </MenuItem>
        </Menu>
      </Sidebar>
      {/*  */}
      <div className={`w-full p-3 ${isDarkMode && "bg-slate-700"}`}>
        <div
          className={`dashboard flex rounded-lg flex-col ${
            isDarkMode === true ? "bg-slate-600" : "bg-slate-200"
          }`}
        >
          <div className="w-full h-10 p-3 flex justify-between items-center mt-3">
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
            <div className="flex items-center gap-3 mr-2">
              <div
                className="flex sm:hidden justify-center items-center py-1 px-2.5 bg-lime-100 rounded-full"
                onClick={handlingSidebar}
              >
                <i className="fa-solid fa-bars text-2xl"></i>
              </div>
              <div className="flex justify-center items-center py-1 px-2.5 bg-lime-100 rounded-full">
                <i className="fa-regular fa-bell text-2xl"></i>
              </div>
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
              className={`flex w-full flex-wrap justify-around p-6 mt-6 ${
                isDarkMode ? "bg-gray-500" : "bg-slate-200"
              } rounded-lg`}
            >
              <div className=" w-36 mb-2 sm:w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
                <i className="fa-solid fa-cart-arrow-down text-2xl text-emerald-700"></i>
                <h1 className="text-3xl font-poppins">20</h1>
                <p className="text-lg">Products</p>
              </div>
              <div className="w-36 mb-2 sm:w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
                <i className="fa-solid fa-users text-2xl text-emerald-700"></i>
                <h1 className="text-3xl font-poppins">20</h1>
                <p className="text-lg">Total Client</p>
              </div>
              <div className="w-36 mb-2 sm:w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
                <i className="fa-solid fa-hand-holding-dollar text-2xl text-emerald-700"></i>
                <h1 className="text-3xl font-poppins">20</h1>
                <p className="text-lg">Sold</p>
              </div>
            </div>
            <DesktopChart></DesktopChart>
            <MobileChart></MobileChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
