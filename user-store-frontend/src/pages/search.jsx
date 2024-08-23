import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProducts } from "../service/products";
import CardElement from "../components/fragment/card";
import NavbarPage from "../components/fragment/navbar";
import useValidasi from "../hooks/validasi";
import Loading from "../components/layouts/loading";

const SearchPage = () => {
  const { search } = useParams();
  const [products, setProducts] = useState([]);
  const Local = JSON.parse(localStorage.getItem("token"));

  useValidasi();
  useEffect(() => {
    if (Local && Local.id) {
      GetProducts(Local.id, (res) => {
        const data = res.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );
        setProducts(data);
      });
    }
  }, []);
  if (Local && Local.id) {
    return (
      <>
        <NavbarPage></NavbarPage>
        <div className="container-search">
          <p>Hasil Pencarian tentang {search}</p>
          <div className="box-search">
            {products.length > 0 ? (
              products.map((p) => {
                return (
                  <CardElement
                    key={p._id}
                    _id={p._id}
                    image={`${import.meta.env.VITE_API_URL}/produkImg/${
                      p.image
                    }`}
                    title={p.title}
                    price={p.price}
                  ></CardElement>
                );
              })
            ) : (
              <p>Produk Tidak Ditemukan</p>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return <Loading></Loading>;
  }
};
export default SearchPage;
