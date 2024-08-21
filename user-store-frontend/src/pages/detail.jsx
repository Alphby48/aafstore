import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProducts } from "../service/products";
import { useDispatch } from "react-redux";
import { statusCart } from "../redux/slices/cartSlices";
import NavbarPage from "../components/fragment/navbar";
import ModalBox from "../components/fragment/modal";
import { addCart } from "../service/addCart";
import useValidasi from "../hooks/validasi";
const DetaiPage = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const dispatch = useDispatch();
  const [qtyVal, setQtyVal] = useState(1);

  const local = JSON.parse(localStorage.getItem("token")) || {
    id: 1,
  };

  useValidasi();

  useEffect(() => {
    GetProducts(local.id, (res) => {
      const prd = res.find((p) => p._id === id);
      setProductDetail(prd);
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

  //const product = productDetail.find((p) => p._id === id);

  const handleAddCart = () => {
    const data = {
      org: local.id,
      idP: productDetail._id,
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
        {
          <div className="box-detail">
            <div className="detail-img">
              <img
                src={`${import.meta.env.VITE_API_URL}/produkImg/${
                  productDetail.image
                }`}
                alt=""
              />
            </div>
            <div className="detail-body">
              <h1>{productDetail.title}</h1>
              <h2>
                {parseInt(productDetail.price).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </h2>
              <p className="desc">Descriptions: {productDetail.description}</p>
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
        }
      </div>
      <ModalBox></ModalBox>
    </>
  );
};

export default DetaiPage;
