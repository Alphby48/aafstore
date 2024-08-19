import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import NotFoundPage from "./pages/404";
import DarkModeContextProvider from "./context/darkContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./style/style.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </DarkModeContextProvider>
  </StrictMode>
);
