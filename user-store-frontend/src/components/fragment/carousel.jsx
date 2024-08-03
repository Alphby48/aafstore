const Carousel = () => {
  return (
    <div className="row-image">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide cares-box"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="./img/background.jpg"
              className="d-block w-100 image-car"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="./img/b2.png"
              className="d-block w-100 image-car"
              alt="..."
            />
            <div className="carousel-caption d-md-block">
              <h5>Banting harga</h5>
              <p>harga murah meriah</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="./img/b3.jpg"
              className="d-block w-100 image-car"
              alt="..."
            />
            <div className="carousel-caption d-md-block">
              <h5>Tunggu Apalagi</h5>
              <p>Segera Beli Sebelum Habis..</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
