import { useContext } from "react";
import { DarkMode } from "../context/darkContext";
const Sidebar = (props) => {
  const {
    bgDash = "bg-gray-300",
    bgProd = "bg-gray-300",
    bgUser = "bg-gray-300",
  } = props;
  const { isDarkMode } = useContext(DarkMode);
  return (
    <div
      className={`p-3 w-3/4 -left-80 z-50 flex fixed sm:left-0 sm:relative sm:w-1/5 sm:min-h-screen ${
        isDarkMode && "bg-slate-700"
      }`}
    >
      <div
        className={`sidebar sm:sticky sm:top-3 flex flex-col w-full rounded-xl min-h-screen sm:max-h-screen items-center p-3 ${
          isDarkMode === true ? "bg-slate-600" : "bg-gray-400"
        }`}
      >
        <img src="/img/logo.png" alt="" className="w-14 h-14" />
        <ul
          className={`flex flex-col w-full p-2 font-poppins ${
            isDarkMode === true ? "text-white" : "text-black"
          }`}
        >
          <li className={`mt-2 p-2 rounded-md ${bgDash}`}>
            <i className="fa-solid fa-gauge mr-3 "></i>Dashboard
          </li>
          <li className={`mt-2 p-2 rounded-md ${bgProd}`}>
            <i className="fa-solid fa-cart-shopping mr-3"></i>Add Product
          </li>
          <li className={`mt-2 p-2 rounded-md ${bgUser}`}>
            <i className="fa-solid fa-cart-shopping mr-3"></i>Users Control
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
