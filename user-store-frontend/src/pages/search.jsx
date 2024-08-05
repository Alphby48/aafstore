import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProducts } from "../service/products";
import CardElement from "../components/fragment/card";
import NavbarPage from "../components/fragment/navbar";

const SearchPage = () => {
  const { search } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    GetProducts((res) => {
      const data = res.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(data);
    });
  }, []);
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
                  image={p.image}
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
};
export default SearchPage;
