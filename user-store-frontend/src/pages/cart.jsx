import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarPage from "../components/fragment/navbar";
import { GetProducts } from "../service/products";
import { removeItem, statusCart } from "../redux/slices/cartSlices";
import useValidasi from "../hooks/validasi";
import { getCart } from "../service/getCart";
import { RemoveCart } from "../service/removeCart";
import Loading from "../components/layouts/loading";
import { RemoveMany } from "../service/removeMany";
import { PostProfile } from "../service/profile";
//
const CartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [pilah, setPilah] = useState([]);
  const stscart = useSelector((state) => state.cart.data);
  const [cart, setCart] = useState([]);
  const [info, setInfo] = useState(false);
  const dispatch = useDispatch();
  //
  useValidasi();
  // useEffect(() => {
  //   const local = JSON.parse(localStorage.getItem("token"));

  // }, []);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("token"));
    if (local) {
      PostProfile(local.id, (res) => {
        setInfo(true);
      });
    }
  }, []);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("token"));

    if (local && local.id) {
      GetProducts(local.id, (res) => {
        setCartProduct(res);
      });

      getCart(local.id, (res) => {
        if (res.length > 0) {
          const data = res.find((d) => d.org === local.id);

          setCart(data.idCart);
        }
      });
    }
  }, [stscart]);

  useEffect(() => {
    const unmatchedItems = cart.filter(
      (p) => !cartProduct.some((c) => c._id === p.idP)
    );

    console.log(unmatchedItems);
    setPilah(unmatchedItems);
  }, [cart, cartProduct]);

  const handlePilah = () => {
    console.log(pilah);
    RemoveMany(pilah, JSON.parse(localStorage.getItem("token")).id, (res) => {
      console.log(res);
      dispatch(statusCart(res));
    });
  };

  useEffect(() => {
    if (cart.length > 0 && cartProduct.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const prd = cartProduct.find((p) => p._id === item.idP);

        if (prd) {
          return acc + parseInt(prd.price) * item.qty;
        }

        return acc;
      }, 0);
      setTotal(sum);
    }
  }, [cart, cartProduct]);

  const handleRemoveCart = (id) => {
    const data = {
      org: JSON.parse(localStorage.getItem("token")).id,
      idP: id,
    };
    RemoveCart(data, (res) => {
      dispatch(statusCart(res));
    });
  };

  if (info === true) {
    return (
      <>
        <NavbarPage></NavbarPage>
        <div className="container-cart">
          <h1>
            Shopping Cart <i className="bi bi-cart4"></i>
          </h1>
          {pilah.length > 0 && (
            <div className="alert alert-danger" role="alert">
              Some products are not in stock
              <button className="btn btn-danger" onClick={handlePilah}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          )}
          <div className="box-cart">
            {cartProduct.length > 0 &&
              cart.map((c) => {
                const product = cartProduct.find((p) => p._id === c.idP);
                if (!product) {
                  return null; // Skip rendering if the product is not found
                }
                return (
                  <div className="item-cart" key={c._id}>
                    <Link to={`/product/detail/${product._id}`}>
                      <div className="img-item">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/produkImg/${
                            product.image
                          }`}
                          alt=""
                        />
                      </div>
                    </Link>
                    <div className="text-item">
                      <h1>{product.title.substring(0, 35)}...</h1>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Price</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {product.price
                                ? parseInt(product.price).toLocaleString(
                                    "id-ID",
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    }
                                  )
                                : "N/A"}
                            </td>
                            <td>{c.qty}</td>
                            <td>
                              {product.price
                                ? (
                                    parseInt(product.price) * c.qty
                                  ).toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })
                                : "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="cart-del">
                      <i
                        className="bi bi-trash"
                        onClick={() => handleRemoveCart(product._id)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            <div className="foot-cart">
              <div className="foot-text">
                <h3>
                  Total:{" "}
                  {typeof total === "number" && !isNaN(total)
                    ? total.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                    : "N/A"}
                </h3>
              </div>
              <div className="foot-buy">
                <button className="btnn-buy-check">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Loading></Loading>;
  }
};

export default CartPage;
