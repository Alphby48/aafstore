const ModalBox = () => {
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
