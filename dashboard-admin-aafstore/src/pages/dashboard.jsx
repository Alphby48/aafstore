import DarkModePage from "../components/element/darkmode";
import { DarkMode } from "../context/darkContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sideAct } from "../redux/slices/sidebarSlices";
import DesktopChart from "../fragments/chart/desktopChart";
import MobileChart from "../fragments/chart/mobileChart";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { GetAdmin } from "../service/admin";
import LoadingPage from "../components/element/loading";
import SideBarPage from "../fragments/bar";
import { GetProducts } from "../service/products";
import { GetUsers } from "../service/users";
import DashLayout from "../components/layouts/dashLayout";

const Dashboard = () => {
  const { isDarkMode } = useContext(DarkMode);
  const dispatch = useDispatch();
  const kont = useSelector((state) => state.sidebar.side);
  const [kondisi, setKondisi] = useState(false);
  const [lengthProd, setLengthProd] = useState(0);
  const [lengthUser, setLengthUser] = useState(0);

  useEffect(() => {
    const local = localStorage.getItem("hash");
    if (!local) {
      window.location.href = "/login";
      return;
    }

    if (local) {
      GetAdmin(local, (res) => {
        if (res === local) {
          console.log(true);
          setKondisi(true);
        } else {
          window.location.href = "/login";
        }
      });

      GetProducts(local, (res) => {
        setLengthProd(res.length);
      });

      GetUsers(local, (res) => {
        setLengthUser(res.length);
      });
    }
  }, []);

  const handlingSidebar = () => {
    dispatch(sideAct(!kont));
  };

  if (kondisi === false) {
    return <LoadingPage></LoadingPage>;
  } else {
    return (
      // <div className="flex w-full">
      //   <SideBarPage></SideBarPage>
      //   {/*  */}
      //   <div className={`w-full p-3 ${isDarkMode && "bg-slate-700"}`}>
      //     <div
      //       className={` dashboard flex rounded-lg flex-col ${
      //         isDarkMode === true ? "bg-slate-600" : "bg-slate-200"
      //       }`}
      //     >
      //       <div className="w-full h-10 p-3 flex justify-between items-center mt-3">
      //         <div>
      //           <p className={` ${isDarkMode && "text-white"}`}>
      //             <span
      //               className={` ${
      //                 isDarkMode ? "text-slate-200" : "text-gray-500"
      //               }`}
      //             >
      //               dashboard
      //             </span>{" "}
      //             / home
      //           </p>
      //         </div>
      //         <div className="flex items-center gap-3 mr-2">
      //           <div
      //             className="flex sm:hidden justify-center items-center py-1 px-2.5 bg-lime-100 rounded-full"
      //             onClick={handlingSidebar}
      //           >
      //             <i className="fa-solid fa-bars text-2xl"></i>
      //           </div>
      //           <div className="flex justify-center items-center py-1 px-2.5 bg-lime-100 rounded-full">
      //             <i className="fa-regular fa-bell text-2xl"></i>
      //           </div>
      //           <DarkModePage></DarkModePage>
      //         </div>
      //       </div>
      //       <div className="w-full p-3 flex flex-col">
      //         <h1
      //           className={`text-3xl font-poppins font-medium ${
      //             isDarkMode && "text-white"
      //           }`}
      //         >
      //           Dashboard
      //         </h1>
      //         <div
      //           className={`flex w-full flex-wrap justify-around p-6 mt-6 ${
      //             isDarkMode ? "bg-gray-500" : "bg-slate-200"
      //           } rounded-lg`}
      //         >
      //           <div className=" w-36 mb-2 sm:w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
      //             <i className="fa-solid fa-cart-arrow-down text-2xl text-emerald-700"></i>
      //             <h1 className="text-3xl font-poppins">{lengthProd}</h1>
      //             <p className="text-lg">Products</p>
      //           </div>
      //           <div className="w-36 mb-2 sm:w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
      //             <i className="fa-solid fa-users text-2xl text-emerald-700"></i>
      //             <h1 className="text-3xl font-poppins">{lengthUser}</h1>
      //             <p className="text-lg">Total Client</p>
      //           </div>
      //           <div className="w-36 mb-2 sm:w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
      //             <i className="fa-solid fa-hand-holding-dollar text-2xl text-emerald-700"></i>
      //             <h1 className="text-3xl font-poppins">20</h1>
      //             <p className="text-lg">Sold</p>
      //           </div>
      //         </div>
      //         <DesktopChart></DesktopChart>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <DashLayout title="Dashboard">
        <div
          className={`flex w-full flex-wrap justify-around p-6 mt-6 ${
            isDarkMode ? "bg-gray-500" : "bg-slate-200"
          } rounded-lg`}
        >
          <div className=" w-36 mb-2 sm:w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
            <i className="fa-solid fa-cart-arrow-down text-2xl text-emerald-700"></i>
            <h1 className="text-3xl font-poppins">{lengthProd}</h1>
            <p className="text-lg">Products</p>
          </div>
          <div className="w-36 mb-2 sm:w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
            <i className="fa-solid fa-users text-2xl text-emerald-700"></i>
            <h1 className="text-3xl font-poppins">{lengthUser}</h1>
            <p className="text-lg">Total Client</p>
          </div>
          <div className="w-36 mb-2 sm:w-1/5 bg-violet-300 p-4 flex flex-col items-center rounded-lg">
            <i className="fa-solid fa-hand-holding-dollar text-2xl text-emerald-700"></i>
            <h1 className="text-3xl font-poppins">20</h1>
            <p className="text-lg">Sold</p>
          </div>
        </div>
        <DesktopChart></DesktopChart>
      </DashLayout>
    );
  }
};

export default Dashboard;
