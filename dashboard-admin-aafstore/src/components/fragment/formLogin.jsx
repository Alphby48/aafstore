import InputLabel from "../element/inputLabel/inputLabel";
import { DarkMode } from "../../context/darkContext";
import { useContext } from "react";

const FormLogin = () => {
  const { isDarkMode } = useContext(DarkMode);
  return (
    <form
      method="post"
      className={`flex flex-col items-center p-2 w-5/6 sm:w-1/3 ${
        isDarkMode === true ? "bg-slate-600" : "bg-purple-100"
      } rounded-md`}
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
