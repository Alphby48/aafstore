import NavbarPage from "../components/fragment/navbar";
import CardElement from "../components/fragment/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProducts } from "../service/products";
import useValidasi from "../hooks/validasi";
import FootBarLayout from "../components/layouts/footbar";
const Category = () => {
  const { ctg } = useParams();
  const [prdctg, setPrdctg] = useState([]);
  useValidasi();
  useEffect(() => {
    GetProducts((res) => {
      setPrdctg(res);
    });
  }, [ctg]);

  const pria = prdctg.filter((p) => p.category.includes(ctg));

  return (
    <>
      <NavbarPage />
      <div className="container-ctg">
        {prdctg.length > 0 &&
          pria.map((p) => {
            return (
              <CardElement
                _id={p._id}
                image={p.image}
                title={p.title}
                price={p.price}
              />
            );
          })}
      </div>
    </>
  );
};

export default Category;
