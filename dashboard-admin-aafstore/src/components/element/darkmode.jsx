import { useContext } from "react";
import { DarkMode } from "../../context/darkContext";
const DarkModePage = (props) => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const { position = "relative" } = props;
  const handelChange = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <>
      <label className={`inline-flex items-center cursor-pointer ${position}`}>
        <input
          type="checkbox"
          name="theme"
          onChange={handelChange}
          checked={isDarkMode}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-slate-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-lime-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-50"></div>
      </label>
    </>
  );
};

export default DarkModePage;
