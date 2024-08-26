import NavbarPage from "../components/fragment/navbar";
import CardElement from "../components/fragment/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProducts } from "../service/products";
import useValidasi from "../hooks/validasi";
import Loading from "../components/layouts/loading";
import { PostProfile } from "../service/profile";
//
const Category = () => {
  const { ctg } = useParams();
  //const [prdctg, setPrdctg] = useState([]);
  const [isOk, setIsOk] = useState(false);
  const [isPrdOk, setIsPrdOk] = useState(false);
  const [prd, setPrd] = useState([]);
  //
  //useValidasi();

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("token"));
    if (!local) {
      window.location.href = "/login";
    }

    if (local && local.id) {
      PostProfile(local.id, (res) => {
        const dataSet = res.find((data) => data._id === local.id);
        if (dataSet) {
          setIsOk(true);
        } else {
          window.location.href = "/login";
        }
      });
    } else {
      window.location.href = "/login";
    }
  }, [ctg]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("token"));
    if (local && local.id) {
      GetProducts(local.id, (res) => {
        // setPrdctg(res);
        setIsPrdOk(true);
        const pria = res.filter((p) => p.category.includes(ctg));
        setPrd(pria);
      });
    }
  }, [isOk]);

  // const pria = prdctg.filter((p) => p.category.includes(ctg));

  if (isPrdOk === true) {
    return (
      <>
        <NavbarPage />
        <div className="container-ctg">
          {prd.length > 0 &&
            prd.map((p) => {
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
