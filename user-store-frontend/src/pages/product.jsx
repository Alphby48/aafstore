import { Link } from "react-router-dom";
import SidebarProduct from "../components/fragment/sidebar-prd";
import NavbarPage from "../components/fragment/navbar";
import Carousel from "../components/fragment/carousel";
import CardElement from "../components/fragment/card";
import { GetProducts } from "../service/products";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("token"));
    if (!local) {
      window.location.href = "/login";
    }
    GetProducts((res) => {
      setProducts(res);
    });
  }, []);

  const logOutHandle = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container-box">
      <NavbarPage onClick={logOutHandle}></NavbarPage>
      <Carousel></Carousel>
      <div className="product">
        <SidebarProduct />
        <div className="product-box">
          <h1>All Product</h1>
          <div className="all-product">
            {products.length > 0 &&
              products.map((p) => {
                return (
                  <CardElement
                    _id={p._id}
                    image={p.image}
                    title={p.title}
                    price={p.price}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
