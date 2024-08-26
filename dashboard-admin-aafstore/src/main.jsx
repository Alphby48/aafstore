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
import AddProductPage from "./pages/addProduct";
import ProductsControlPage from "./pages/productControl";
import DetailProductPage from "./pages/detailProduct";
import UserControlPage from "./pages/userControl";
import SettingAccountPage from "./pages/settingAccount";
import ChangeUsernamePage from "./pages/changeUsername";
import ChangePasswordPage from "./pages/chanePassword";
import DetailUserPage from "./pages/detailUser";

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
    path: "/add-product",
    element: <AddProductPage></AddProductPage>,
  },
  {
    path: "/products-control",
    element: <ProductsControlPage></ProductsControlPage>,
  },
  {
    path: "/users-control",
    element: <UserControlPage></UserControlPage>,
  },
  {
    path: "/users-control/detail/:id",
    element: <DetailUserPage></DetailUserPage>,
  },
  {
    path: "/products-control/detail/:id",
    element: <DetailProductPage></DetailProductPage>,
  },
  {
    path: "/setting-account",
    element: <SettingAccountPage></SettingAccountPage>,
  },
  {
    path: "/setting-account/change-username",
    element: <ChangeUsernamePage></ChangeUsernamePage>,
  },
  {
    path: "/setting-account/change-password",
    element: <ChangePasswordPage></ChangePasswordPage>,
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
