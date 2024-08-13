import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProducts } from "../service/products";
import { useDispatch } from "react-redux";
import { statusCart } from "../redux/slices/cartSlices";
import NavbarPage from "../components/fragment/navbar";
import ModalBox from "../components/fragment/modal";
import { addCart } from "../service/addCart";
const DetaiPage = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const dispatch = useDispatch();
  const [qtyVal, setQtyVal] = useState(1);

  const local = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    GetProducts(local.id, (res) => {
      setProductDetail(res);
    });
  }, [id]);

  const handleTambah = () => {
    if (qtyVal < 10) {
      setQtyVal(qtyVal + 1);
    }
  };

  const handleKurang = () => {
    if (qtyVal > 1) {
      setQtyVal(qtyVal - 1);
    }
  };

  const product = productDetail.find((p) => p._id === id);

  const handleAddCart = () => {
    const data = {
      org: local.id,
      idP: product._id,
      qty: qtyVal,
    };

    addCart(data, (res) => {
      dispatch(statusCart(res));
    });
  };

  return (
    <>
      <NavbarPage></NavbarPage>
      <div className="container-detail">
        {productDetail.length > 0 && (
          <div className="box-detail">
            <div className="detail-img">
              <img src={product.image} alt="" />
            </div>
            <div className="detail-body">
              <h1>{product.title}</h1>
              <h2>
                {parseInt(product.price).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </h2>
              <p className="desc">Descriptions: {product.description}</p>
              <div className="user-act">
                <div className="detail-jumlah">
                  <div className="qty-jumlah">
                    <p>Jumlah: </p>
                  </div>
                  <div className="qty-action">
                    <button className="btn " onClick={handleKurang}>
                      -
                    </button>
                    <p>{qtyVal}</p>
                    <button className="btn " onClick={handleTambah}>
                      +
                    </button>
                  </div>
                </div>
                <div className="detail-button">
                  <button className="btn-chat btn">
                    <i className="bi bi-chat-dots"></i>
                  </button>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className="btn btn-warning btn-cart"
                    onClick={handleAddCart}
                  >
                    <i className="bi bi-cart-plus"></i>
                  </button>
                  <button className="btn-buy">Beli Sekarang</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalBox></ModalBox>
    </>
  );
};

export default DetaiPage;
