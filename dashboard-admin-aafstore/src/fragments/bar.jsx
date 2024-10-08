import { useContext } from "react";
import { DarkMode } from "../context/darkContext";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sideAct } from "../redux/slices/sidebarSlices";
import ConfirmPage from "../components/element/confirm";
const SideBarPage = () => {
  const { isDarkMode } = useContext(DarkMode);
  const kont = useSelector((state) => state.sidebar.side);
  const dispatch = useDispatch();
  const [isSideBar, setIsSideBar] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handlingSidebar = () => {
    dispatch(sideAct(!kont));
  };

  const handleCollaps = () => {
    setIsSideBar(!isSideBar);
  };

  const handleLogout = () => {
    localStorage.removeItem("hash");
    window.location.href = "/login";
  };

  return (
    <Sidebar
      className={`${isDarkMode ? "bg-slate-600" : "bg-sky-500"} `}
      collapsed={isSideBar} // buat tanpa media queri
      toggled={kont}
      breakPoint="md"
    >
      <Menu
        className="p-1 sticky top-0"
        menuItemStyles={{
          button: {
            "&:hover": {
              backgroundColor: "inherit", // Menghilangkan background putih saat hover
              color: "inherit", // Menghilangkan perubahan warna teks saat hover
            },
          },
        }}
      >
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
        ></MenuItem>
        <MenuItem className="menu1 mb-10">
          <div className="w-full flex justify-center items-center">
            <img src="/img/logo.png" className="w-24" alt="" />
          </div>
        </MenuItem>
        <Link to={"/"}>
          <MenuItem
            onClick={handlingSidebar}
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
            onClick={handlingSidebar}
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
        <Link to={"/products-control"}>
          <MenuItem
            onClick={handlingSidebar}
            className={`my-3 rounded-lg ${
              isDarkMode ? "bg-slate-600" : "bg-red-100"
            }`}
            icon={
              <i
                className={`fa-brands fa-product-hunt ${
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
              Products Control
            </h1>
          </MenuItem>
        </Link>
        <Link to={"/users-control"}>
          <MenuItem
            onClick={handlingSidebar}
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
        </Link>
        <Link to={"/setting-account"}>
          <MenuItem
            onClick={handlingSidebar}
            className={`my-3 rounded-lg ${
              isDarkMode ? "bg-slate-600" : "bg-red-100"
            }`}
            icon={
              <i
                className={`fa-solid fa-user-shield ${
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
              Setting Account
            </h1>
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => setConfirm(true)}
          className={`my-3 rounded-lg ${
            isDarkMode ? "bg-slate-600" : "bg-red-100"
          }`}
          icon={
            <i
              className={`fa-solid fa-right-from-bracket ${
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
            Log-Out
          </h1>
        </MenuItem>
      </Menu>
      {confirm === true && (
        <ConfirmPage
          onClick={handleLogout}
          setConfirm={setConfirm}
          title="apakah yakin ingin keluar?"
        ></ConfirmPage>
      )}
    </Sidebar>
  );
};

export default SideBarPage;

<i class="fa-solid fa-user-shield"></i>;
