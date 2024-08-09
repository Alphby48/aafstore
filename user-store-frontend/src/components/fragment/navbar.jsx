import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import { useEffect } from "react";
import { useState } from "react";
const NavbarPage = (props) => {
  const [total, setTotal] = useState(0);
  const { onClick } = props;
  const cart = useSelector((state) => state.cart.data);
  useEffect(() => {
    const sum = cart.reduce((a, b) => a + b.qty, 0);
    setTotal(sum);
  }, [cart]);
  return (
    <div className="navigator fixed-top">
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to={"/"}>
            <img src="/img/logo.png" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <a className="nav-link active" href="/">
                Home
              </a>

              <a
                className="nav-link active"
                aria-current="page"
                href="/product"
              >
                Product
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="boxcart bg-primary">
        <Link to="/cart" className="link-cart">
          <i className="bi bi-cart-plus"></i>
        </Link>
        <div className="box-price">
          <p>{total}</p>
        </div>
        <Link to="/profile" className="link-profile">
          <i className="bi bi-person-circle"></i>
        </Link>
      </div>
    </div>
  );
};

export default NavbarPage;
