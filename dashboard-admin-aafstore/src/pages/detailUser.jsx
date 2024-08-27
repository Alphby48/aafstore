import { useParams } from "react-router-dom";
import DashLayout from "../components/layouts/dashLayout";
import { useEffect, useState } from "react";
import { GetUsers } from "../service/users";
import { useContext } from "react";
import { DarkMode } from "../context/darkContext";
import LoadingPage from "../components/element/loading";
import NotFoundPage from "./404";
import { GetAdmin } from "../service/admin";
import { Link } from "react-router-dom";

const DetailUserPage = () => {
  const { id } = useParams();
  const [isOk, setIsOk] = useState(false);
  const [user, setUser] = useState([]);
  const [info, setInfo] = useState(false);
  const [mount, setMount] = useState(false);
  const { isDarkMode } = useContext(DarkMode);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hash")) || { hash: "001" };
    if (!local) {
      window.location.href = "/login";
      return;
    }

    if (local) {
      GetAdmin(local.hash, (res) => {
        const dataSet = res.find((item) => item.hash === local.hash);
        if (dataSet) {
          setIsOk(true);
        } else {
          window.location.href = "/login";
        }
      });
    }
  }, [id]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hash")) || { hash: "001" };
    GetUsers(local.hash, (res) => {
      const data = res.find((item) => item._id === id);
      if (data) {
        setUser(data);
        setInfo(true);
      } else {
        setMount(true);
      }
    });
  }, [isOk]);

  console.log(info);

  if (info === true) {
    return (
      <DashLayout>
        <Link to={`/users-control`}>
          <div className=" w-20 p-3 mb-4 text-3xl bg-sky-600 text-white rounded-lg cursor-pointer">
            <i className="fa-solid fa-arrow-right-to-bracket -rotate-180"></i>
          </div>
        </Link>
        <div className="flex w-full flex-wrap justify-center items-center gap-7">
          <div>
            <img
              src={
                user.imageUrl
                  ? `${import.meta.env.VITE_API_URL}/uploads/${user.imageUrl}`
                  : "/img/profile.svg"
              }
              className="rounded-full object-cover w-60 h-60"
              alt=""
            />
          </div>
          <div className="w-full sm:w-2/3">
            <table className={`${isDarkMode ? "text-white" : "text-black"}`}>
              <tr className="border-y border-black">
                <td className="font-poppins text-lg w-40">Username</td>
                <td>{user.username}</td>
              </tr>
              <tr className="border-y border-black">
                <td className="font-poppins text-lg">Name</td>
                <td>{user.name}</td>
              </tr>
              <tr className="border-y border-black">
                <td className="font-poppins text-lg">Gender</td>
                <td>{user.gender ? user.gender : "-"}</td>
              </tr>
              <tr className="border-y border-black">
                <td className="font-poppins text-lg">Date of Birth</td>
                <td>{user.birthdate ? user.birthdate : "-"}</td>
              </tr>
              <tr className="border-y border-black">
                <td className="font-poppins text-lg">Email</td>
                <td className="break-all">{user.email}</td>
              </tr>
              <tr className="border-y border-black">
                <td className="font-poppins text-lg">Phone</td>
                <td>{user.nohp ? user.nohp : "-"}</td>
              </tr>
              <tr className="border-y border-black">
                <td className="font-poppins text-lg">Date Regist</td>
                <td>{user.date}</td>
              </tr>
            </table>
          </div>
        </div>
      </DashLayout>
    );
  } else if (mount === true) {
    return <NotFoundPage></NotFoundPage>;
  } else {
    return <LoadingPage></LoadingPage>;
  }
};
export default DetailUserPage;
