import InputLabel from "../element/inputLabel/inputLabel";
import { DarkMode } from "../../context/darkContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostLogin } from "../../service/login";
import { useEffect } from "react";
import { GetAdmin } from "../../service/admin";

const FormLogin = () => {
  const { isDarkMode } = useContext(DarkMode);
  const [info, setInfo] = useState("");

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hash")) || { hash: "001" };
    if (local) {
      GetAdmin(local.hash, (res) => {
        const dataset = res.find((item) => item.hash === local.hash);

        if (dataset) {
          window.location = "/";
        } else {
          console.log(`gak ada`);
          localStorage.removeItem("hash");
        }
      });
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    PostLogin(data, (status, res) => {
      if (status) {
        const setLocal = {
          hash: res.hash,
        };
        localStorage.setItem("hash", JSON.stringify(setLocal));
        window.location = "/";
      } else {
        setInfo("username atau password salah");
        console.log(`salah`);
      }
    });
  };

  return (
    <form
      method="post"
      className={`flex flex-col items-center p-2 w-5/6 sm:w-1/3 ${
        isDarkMode === true ? "bg-slate-600" : "bg-purple-100"
      } rounded-md`}
      onSubmit={handleSubmit}
    >
      <h1 className="font-poppins text-3xl text-center font-semibold text-lime-500 mt-1 mb-4">
        Login
      </h1>
      <InputLabel
        textLabel="Username"
        type="text"
        name="username"
        placeholder="masukan username"
        klasInput={`rounded-md border border-lime-600 ${
          isDarkMode === true ? "bg-slate-400 text-white" : "bg-white-300"
        } font-poppins p-2 my-1 w-full focus:border-lime-600 focus:ring-lime-200 focus:outline-none focus:ring focus:ring-opacity-40`}
        klasLabel="text-sky-400 font-semibold font-poppins"
      ></InputLabel>
      <InputLabel
        textLabel="Password"
        type="password"
        name="password"
        placeholder="masukan password"
        klasInput={`rounded-md border border-lime-600 ${
          isDarkMode === true ? "bg-slate-400 text-white" : "bg-white-300"
        } font-poppins p-2 my-1 w-full focus:border-lime-600 focus:ring-lime-200 focus:outline-none focus:ring focus:ring-opacity-40`}
        klasLabel="text-sky-400 font-semibold font-poppins"
      ></InputLabel>

      <p className="text-red-600 font-poppins">{info}</p>
      <button
        type="submit"
        className="bg-sky-500 font-poppins text-lg text-white p-1 rounded-md w-1/2 mt-3 hover:bg-sky-600"
      >
        Login
      </button>
    </form>
  );
};

export default FormLogin;
