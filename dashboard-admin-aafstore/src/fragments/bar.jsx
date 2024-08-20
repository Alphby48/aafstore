import { useContext } from "react";
import { DarkMode } from "../context/darkContext";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sideAct } from "../redux/slices/sidebarSlices";
const SideBarPage = () => {
  const { isDarkMode } = useContext(DarkMode);
  const kont = useSelector((state) => state.sidebar.side);
  const dispatch = useDispatch();
  const [isSideBar, setIsSideBar] = useState(false);

  const handlingSidebar = () => {
    dispatch(sideAct(!kont));
  };

  const handleCollaps = () => {
    setIsSideBar(!isSideBar);
  };

  return (
    <Sidebar
      className={`${isDarkMode ? "bg-slate-600" : "bg-sky-500"} `}
      collapsed={isSideBar} // buat tanpa media queri
      toggled={kont}
      breakPoint="md"
    >
      <Menu className="p-1 sticky top-0">
        <i
          className="sm:hidden fa-regular fa-circle-xmark text-3xl text-slate-500 absolute top-2 right-5 z-50"
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
        <Link to={"/"}>
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
        </Link>
        <Link to={"/add-product"}>
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
        </Link>
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
  );
};

export default SideBarPage;
