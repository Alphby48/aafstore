import DashLayout from "../components/layouts/dashLayout";
import { useContext } from "react";
import { DarkMode } from "../context/darkContext";
import { changeUsername } from "../service/changeUsername";
import { GetAdmin } from "../service/admin";
import { useEffect, useState } from "react";
import PopUp from "../components/element/popup";
import LoadingPage from "../components/element/loading";

const ChangeUsernamePage = () => {
  const { isDarkMode } = useContext(DarkMode);
  const [info, setInfo] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [msg, setMsg] = useState("");

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
          setInfo(true);
        } else {
          window.location.href = "/login";
        }
      });
    }
  }, []);

  const handleChangeUsername = (e) => {
    e.preventDefault();
    const data = {
      hash: localStorage.getItem("hash"),
      oldUsername: e.target.oldUsername.value,
      newUsername: e.target.newUsername.value,
    };

    changeUsername(data, (res) => {
      setMsg(res);
      setPopUp(true);
      e.target.reset();
    });
  };

  if (info === true) {
    return (
      <DashLayout>
        <div
          className=" w-20 p-3 mb-4 text-3xl bg-sky-600 text-white rounded-lg cursor-pointer"
          onClick={() => window.history.back()}
        >
          <i className="fa-solid fa-arrow-right-to-bracket -rotate-180"></i>
        </div>
        <div className="w-full p-3 flex justify-center items-center">
          <form
            action="post"
            onSubmit={handleChangeUsername}
            className={`w-full sm:w-2/3 p-3 rounded-lg flex flex-col justify-center items-center ${
              isDarkMode ? "bg-slate-400" : "bg-sky-200"
            }`}
          >
            <h2 className="text-xl font-poppins">Change Username</h2>
            <input type="hidden" name="id" id="id" />
            <div className="w-full sm:w-5/6 flex flex-col my-2 ">
              <label htmlFor="oldUsername" className="font-poppins">
                Username Lama:
              </label>
              <input
                className="p-2 rounded-lg border-2"
                type="text"
                name="oldUsername"
                id="oldUsername"
                required
              />
            </div>
            <div className=" w-full sm:w-5/6 flex flex-col my-2 ">
              <label htmlFor="newUsername" className="font-poppins">
                Username Baru:
              </label>
              <input
                className="p-2 rounded-lg border-2"
                type="text"
                name="newUsername"
                id="newUsername"
                required
              />
            </div>
            <button
              type="submit"
              className="w-1/2 py-3 font-poppins text-lg bg-sky-600 text-white rounded-lg mt-3"
            >
              Save
            </button>
          </form>
        </div>
        {popUp === true && <PopUp setPopUp={setPopUp} title={`${msg}`}></PopUp>}
      </DashLayout>
    );
  } else {
    return <LoadingPage></LoadingPage>;
  }
};

export default ChangeUsernamePage;
