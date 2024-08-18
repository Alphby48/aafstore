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
      className={`p-3 w-1/5 relative min-h-max ${isDarkMode && "bg-slate-700"}`}
    >
      <div
        className={`sidebar sticky top-0 flex flex-col w-full rounded-xl min-h-lvh items-center p-3 ${
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
            <i class="fa-solid fa-gauge mr-3 "></i>Dashboard
          </li>
          <li className={`mt-2 p-2 rounded-md ${bgProd}`}>
            <i class="fa-solid fa-cart-shopping mr-3"></i>Add Product
          </li>
          <li className={`mt-2 p-2 rounded-md ${bgUser}`}>
            <i class="fa-solid fa-cart-shopping mr-3"></i>Users Control
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
