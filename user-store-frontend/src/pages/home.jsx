import { Link } from "react-router-dom";
import NavbarPage from "../components/fragment/navbar";
import FootBarLayout from "../components/layouts/footbar";
const HomePage = () => {
  return (
    <>
      <NavbarPage></NavbarPage>
      <div className="container-homes">
        <div className="home">
          <div className="home-text">
            <h1>Welcome To</h1>
            <h1>AAF Store</h1>
            <h3>Platform For Online Shop</h3>
            <Link to={"/product"}>
              <button>Get Started</button>
            </Link>
          </div>
        </div>
        <div className="about" id="about">
          <h1>About Us</h1>
          <div className="about-box">
            <div className="about-img">
              <img src="/img/logo.png" alt="" />
            </div>
            <div className="about-text">
              <p>
                AAF Store is an e-commerce platform that provides a variety of
                products in various categories. and we have been selling
                products since 2023 to improve MSMEs in Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
      <FootBarLayout></FootBarLayout>
    </>
  );
};
export default HomePage;
