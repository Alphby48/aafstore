import { addToCart } from "../../redux/slices/cartSlices";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "../element/button/button";
const ModalBox = (props) => {
  const { val } = props;
  const dispatch = useDispatch();
  const [qtyVal, setQtyVal] = useState(1);

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
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <i className="bi bi-check-circle-fill"></i>
            <p>Pesanan Telah Ditambahkan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
