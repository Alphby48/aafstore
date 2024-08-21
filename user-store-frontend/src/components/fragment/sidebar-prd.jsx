import { Link } from "react-router-dom";

const SidebarProduct = () => {
  return (
    <div className="side-bar">
      <h1>Category</h1>
      <div className="cat-bar">
        <ul>
          <li>
            <Link to={"/product/category/pria"} className="link-side">
              <img src="./icons/menswear.svg" alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/product/category/wanita"} className="link-side">
              <img src="./icons/women's-clothing.svg" alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/product/category/elektronik"} className="link-side">
              <img src="./icons/electronic.svg" alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/product/category/kitchen"} className="link-side">
              <img src="./icons/khitcen.svg" alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/product/category/lain-lain"} className="link-side">
              <img src="./icons/accesories.svg" alt="" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SidebarProduct;
