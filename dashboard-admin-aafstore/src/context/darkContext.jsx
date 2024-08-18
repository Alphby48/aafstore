import { useEffect } from "react";
import { createContext, useState } from "react";

const DarkModeContext = createContext();
const local = localStorage.getItem("isDarkMode") || false;
const DarkModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(local === "true" ? true : false);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const DarkMode = DarkModeContext;
export default DarkModeContextProvider;
