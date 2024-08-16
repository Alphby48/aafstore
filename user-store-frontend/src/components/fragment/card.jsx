import { Link } from "react-router-dom";

const CardElement = (props) => {
  const { image, title, price, _id } = props;

  return (
    <div className="card" key={_id}>
      <div className="card-image">
        <img src={image} className="card-img-top" alt="..." />
      </div>
      <div className="card-body">
        <h5 className="card-title">{title.substring(0, 15)}...</h5>
        <p className="card-text">
          {parseInt(price).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
        <div className="btn-prod">
          <Link to={`/product/detail/${_id}`} className="btn btn-primary">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardElement;
