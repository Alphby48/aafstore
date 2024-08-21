import NavbarPage from "../components/fragment/navbar";
import CardElement from "../components/fragment/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProducts } from "../service/products";
import useValidasi from "../hooks/validasi";
import Loading from "../components/layouts/loading";
//
const Category = () => {
  const { ctg } = useParams();
  const [prdctg, setPrdctg] = useState([]);
  //
  useValidasi();
  const local = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (local && local.id) {
      GetProducts(local.id, (res) => {
        setPrdctg(res);
      });
    }
  }, [ctg]);

  const pria = prdctg.filter((p) => p.category.includes(ctg));

  if (prdctg.length > 0 && pria.length > 0) {
    return (
      <>
        <NavbarPage />
        <div className="container-ctg">
          {prdctg.length > 0 &&
            pria.map((p) => {
              return (
                <CardElement
                  _id={p._id}
                  image={`${import.meta.env.VITE_API_URL}/produkImg/${p.image}`}
                  title={p.title}
                  price={p.price}
                />
              );
            })}
        </div>
      </>
    );
  } else {
    return <Loading></Loading>;
  }
};

export default Category;
