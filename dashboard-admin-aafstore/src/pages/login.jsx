import LoginLayout from "../components/layouts/authLayout";
import FormLogin from "../components/fragment/formLogin";
import DarkModePage from "../components/element/darkmode";
import { useContext } from "react";
import { DarkMode } from "../context/darkContext";
const LoginPage = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  return (
    <>
      <LoginLayout
        className={`flex justify-center items-center w-full h-lvh ${
          isDarkMode === true ? "bg-slate-800" : "bg-fuchsia-50"
        }`}
      >
        <DarkModePage position="absolute top-5 right-5"></DarkModePage>
        <FormLogin />
      </LoginLayout>
    </>
  );
};

export default LoginPage;
