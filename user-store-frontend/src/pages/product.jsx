import SidebarProduct from "../components/fragment/sidebar-prd";
import NavbarPage from "../components/fragment/navbar";
import Carousel from "../components/fragment/carousel";
import CardElement from "../components/fragment/card";
import { GetProducts } from "../service/products";
import { useEffect, useState } from "react";
import useValidasi from "../hooks/validasi";
import FootBarLayout from "../components/layouts/footbar";
import ErrorPage from "./404";
import Loading from "../components/layouts/loading";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useValidasi();

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("token"));
    if (!local) {
      window.location.href = "/login";
    }
    if (local && local.id) {
      GetProducts(local.id, (res) => {
        setProducts(res);
      });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/search/${e.target.search.value}`;
  };

  if (products.length > 0) {
    return (
      <div className="container-box">
        <NavbarPage></NavbarPage>
        <Carousel></Carousel>
        <div className="product">
          <SidebarProduct />
          <div className="product-box">
            <h1>All Product</h1>
            <form className="search" method="post" onSubmit={handleSearch}>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
                required
              />
              <button type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
            <div className="all-product">
              {products.length > 0 &&
                products.map((p) => {
                  return (
                    <CardElement
                      key={p._id}
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
        <FootBarLayout></FootBarLayout>
      </div>
    );
  } else {
    return <Loading></Loading>;
  }
};
export default ProductPage;
