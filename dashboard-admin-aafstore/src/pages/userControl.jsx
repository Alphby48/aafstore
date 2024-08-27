import { useEffect, useState } from "react";
import DashLayout from "../components/layouts/dashLayout";
import { useSelector, useDispatch } from "react-redux";
import { mountAct } from "../redux/slices/mountSlice";
import { DarkMode } from "../context/darkContext";
import { useContext } from "react";
import { GetAdmin } from "../service/admin";
import LoadingPage from "../components/element/loading";
import { GetUsers } from "../service/users";
import ConfirmPage from "../components/element/confirm";
import { DeleteUser } from "../service/deleteUser";

const UserControlPage = () => {
  const { isDarkMode } = useContext(DarkMode);
  const [info, setInfo] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [idConfirm, setIdConfirm] = useState("");
  const [users, setUsers] = useState([]);
  const mount = useSelector((state) => state.mounting.mount);
  const dispatch = useDispatch();

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
          setInfo(true);
        } else {
          window.location.href = "/login";
        }
      });
    }
  }, []);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hash")) || { hash: "001" };
    if (local) {
      GetUsers(local.hash, (res) => {
        setUsers(res);
      });
    }
  }, [mount]);

  const handleConfirm = (id, username, imageUrl) => {
    setConfirm(true);
    const data = {
      _id: id,
      username,
      imageUrl: imageUrl ? imageUrl : "non.jpg",
    };

    setIdConfirm(data);
  };

  const handleRemoveAccount = () => {
    DeleteUser(idConfirm, (res) => {
      dispatch(mountAct(!mount));
      setConfirm(false);
    });
  };

  if (info === true) {
    return (
      <DashLayout title="User Control">
        <div
          className={`w-full p-3 flex flex-wrap ${
            isDarkMode ? "bg-slate-600" : "bg-cyan-100"
          }`}
        >
          {users.length > 0 ? (
            users.map((u) => {
              return (
                <div
                  className={`p-2 sm:p-3 rounded-lg flex w-96 h-32 sm:m-3 m-2 ${
                    isDarkMode ? "bg-slate-400" : "bg-cyan-200"
                  }`}
                >
                  <div className="mr-3 w-2/5">
                    <img
                      src={
                        u.imageUrl
                          ? `${import.meta.env.VITE_API_URL}/uploads/${
                              u.imageUrl
                            }`
                          : "/img/profile.svg"
                      }
                      className="w-16 h-16 sm:w-24 object-cover sm:h-24 rounded-full"
                      alt={u.username}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <h2
                      className={`text-base sm:text-lg font-poppins ${
                        isDarkMode && "text-white"
                      }`}
                    >
                      {u.username}
                    </h2>
                    <p
                      className={`text-base sm:text-base font-poppins capitalize ${
                        isDarkMode && "text-white"
                      }`}
                    >
                      {u.name}
                    </p>
                    <div className="flex w-full justify-around mt-4">
                      <button
                        className="bg-blue-300 p-1 rounded-md font-poppins text-white text-sm"
                        onClick={() =>
                          (window.location.href = `/users-control/detail/${u._id}`)
                        }
                      >
                        Detail
                      </button>
                      <button
                        className="bg-red-300 p-1 rounded-md font-poppins text-white text-sm"
                        onClick={() =>
                          handleConfirm(u._id, u.username, u.imageUrl)
                        }
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="font-poppins text-2xl h-12 p-2 bg-red-600 text-white rounded-lg">
              User Kosong
            </h1>
          )}
        </div>
        {confirm === true && (
          <ConfirmPage
            setConfirm={setConfirm}
            onClick={handleRemoveAccount}
            title={`Apakah yakin ingin menghapus user ${idConfirm.username} ?`}
          />
        )}
      </DashLayout>
    );
  } else {
    return <LoadingPage></LoadingPage>;
  }
};

export default UserControlPage;

{
  /* <div
  className={`p-2 sm:p-3 rounded-lg h-36 sm:m-3 m-2 ${
    isDarkMode ? "bg-slate-400" : "bg-cyan-200"
  }`}
>
  <div className="">
    <img src="" alt="" />
  </div>
  <div>
    <h2
      className={`text-base sm:text-lg font-poppins capitalize ${
        isDarkMode && "text-white"
      }`}
    >
      username
    </h2>
    <p
      className={`text-base sm:text-base font-poppins capitalize ${
        isDarkMode && "text-white"
      }`}
    >
      nama
    </p>
    <div>
      <button>Detail</button>
      <button>Delete</button>
    </div>
  </div>
</div>; */
}
