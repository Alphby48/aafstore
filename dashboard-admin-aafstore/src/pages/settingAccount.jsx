import { useEffect } from "react";
import DashLayout from "../components/layouts/dashLayout";
import { GetAdmin } from "../service/admin";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkMode } from "../context/darkContext";
import LoadingPage from "../components/element/loading";

const SettingAccountPage = () => {
  const { isDarkMode } = useContext(DarkMode);
  const [info, setInfo] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem("hash");
    if (!local) {
      window.location.href = "/login";
      return;
    }

    if (local) {
      GetAdmin(local, (res) => {
        if (res === local) {
          setInfo(true);
        } else {
          window.location.href = "/login";
        }
      });
    }
  }, []);

  if (info === true) {
    return (
      <DashLayout title="Setting Account">
        <div className="w-full p-3">
          <ul className="flex flex-col gap-3 list-none">
            <li>
              <Link to={"/setting-account/change-username"}>
                <button className=" bg-lime-500 p-3 rounded-lg text-white">
                  <i className="fa-solid fa-user-shield mr-3"></i> Change
                  Username
                </button>
              </Link>
            </li>
            <li>
              <Link to={"/setting-account/change-password"}>
                <button className=" bg-lime-500 p-3 rounded-lg text-white">
                  <i className="fa-solid fa-key mr-4 text-base"></i> Change
                  Password
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </DashLayout>
    );
  } else {
    return <LoadingPage></LoadingPage>;
  }
};

export default SettingAccountPage;
