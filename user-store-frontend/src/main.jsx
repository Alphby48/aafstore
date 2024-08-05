import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./scss/style.scss";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import ProductPage from "./pages/product.jsx";
import Category from "./pages/category.jsx";
import DetaiPage from "./pages/detail.jsx";
import ErrorPage from "./pages/404.jsx";
import CartPage from "./pages/cart.jsx";
import SearchPage from "./pages/search.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/product/category/:ctg",
    element: <Category />,
  },
  {
    path: "/product/detail/:id",
    element: <DetaiPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/search/:search",
    element: <SearchPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
