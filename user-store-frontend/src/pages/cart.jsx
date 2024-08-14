import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarPage from "../components/fragment/navbar";
import { GetProducts } from "../service/products";
import { statusCart } from "../redux/slices/cartSlices";
import useValidasi from "../hooks/validasi";
import { getCart } from "../service/getCart";
import { RemoveCart } from "../service/removeCart";
//
const CartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const stscart = useSelector((state) => state.cart.data);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  //
  useValidasi();
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("token")) || {
      id: 1,
    };
    GetProducts(local.id, (res) => {
      setCartProduct(res);
    });
  }, []);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("token")) || {
      id: 1,
    };
    getCart(local.id, (res) => {
      if (res.length > 0) {
        const data = res.find((d) => d.org === local.id);
        setCart(data.idCart);
      }
    });
  }, [stscart]);

  useEffect(() => {
    if (cart.length > 0 && cartProduct.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const prd = cartProduct.find((p) => p._id === item.idP);
        return acc + parseInt(prd.price) * item.qty;
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

  return (
    <>
      <NavbarPage></NavbarPage>
      <div className="container-cart">
        <h1>
          Shopping Cart <i className="bi bi-cart4"></i>
        </h1>
        <div className="box-cart">
          {cartProduct.length > 0 &&
            cart.map((c) => {
              const product = cartProduct.find((p) => p._id === c.idP);
              return (
                <div className="item-cart" key={c._id}>
                  <Link to={`/product/detail/${product._id}`}>
                    <div className="img-item">
                      <img src={product.image} alt="" />
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
                            {parseInt(product.price).toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </td>
                          <td>{c.qty}</td>
                          <td>
                            {(parseInt(product.price) * c.qty).toLocaleString(
                              "id-ID",
                              {
                                style: "currency",
                                currency: "IDR",
                              }
                            )}
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
                {total.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
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
};

export default CartPage;
