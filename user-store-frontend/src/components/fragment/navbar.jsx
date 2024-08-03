import { Link } from "react-router-dom";
const NavbarPage = (props) => {
  const { onClick } = props;
  return (
    <div className="navigator fixed-top">
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link>
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
              <a className="nav-link" href="/">
                Home
              </a>
              <a className="nav-link" href="#">
                About
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
          <p>0</p>
        </div>
        <Link onClick={onClick} className="link-profile">
          <i className="bi bi-person-circle"></i>
        </Link>
      </div>
    </div>
  );
};

export default NavbarPage;
