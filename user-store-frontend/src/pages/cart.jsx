import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarPage from "../components/fragment/navbar";
import { GetProducts } from "../service/products";
import { removeItem } from "../redux/slices/cartSlices";
const CartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  useEffect(() => {
    GetProducts((res) => {
      setCartProduct(res);
    });
  }, []);

  useEffect(() => {
    if (cart.length > 0 && cartProduct.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const prd = cartProduct.find((p) => p._id === item._id);
        return acc + parseInt(prd.price) * item.qty;
      }, 0);
      setTotal(sum);
    }
  }, [cart, cartProduct]);

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
              const product = cartProduct.find((p) => p._id === c._id);
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
                      onClick={() => dispatch(removeItem(c._id)) && setTotal(0)}
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
