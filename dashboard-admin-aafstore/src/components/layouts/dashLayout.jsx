import { DarkMode } from "../../context/darkContext";
import DarkModePage from "../element/darkmode";
import SideBarPage from "../../fragments/bar";
import { sideAct } from "../../redux/slices/sidebarSlices";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { Link } from "react-router-dom";
const DashLayout = (props) => {
  const { children, title } = props;
  const { isDarkMode } = useContext(DarkMode);
  const kont = useSelector((state) => state.sidebar.side);
  const dispatch = useDispatch();
  const handlingSidebar = () => {
    dispatch(sideAct(!kont));
  };
  return (
    <div className="flex w-full min-h-screen">
      <SideBarPage></SideBarPage>

      <div className={`w-full p-3 ${isDarkMode && "bg-slate-700"}`}>
        <div
          className={` dashboard flex rounded-lg flex-col ${
            isDarkMode === true ? "bg-slate-600" : "bg-slate-200"
          }`}
        >
          <div className="w-full h-10 p-3 flex justify-between items-center mt-3">
            <div>
              <img src="/img/logo.png" className=" w-10" alt="" />
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
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
