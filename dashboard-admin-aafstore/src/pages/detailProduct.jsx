import { useEffect, useState } from "react";
import { GetAdmin } from "../service/admin";
import { GetProducts } from "../service/products";
import { DarkMode } from "../context/darkContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingPage from "../components/element/loading";
import DashLayout from "../components/layouts/dashLayout";
import NotFoundPage from "./404";
const DetailProductPage = () => {
  const { id } = useParams();
  const [isOk, setIsOk] = useState(false);
  const [mount, setMount] = useState(false);
  const [info, setInfo] = useState(false);
  const [products, setProducts] = useState([]);
  const { isDarkMode } = useContext(DarkMode);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hash")) || { hash: "001" };
    if (!local) {
      window.location.href = "/login";
      return;
    }

    if (local) {
      GetAdmin(local.hash, (res) => {
        const dataset = res.find((item) => item.hash === local.hash);
        if (dataset) {
          setIsOk(true);
        } else {
          window.location.href = "/login";
        }
      });
    }
  }, [id]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hash")) || { hash: "001" };
    GetProducts(local.hash, (res) => {
      const data = res.find((item) => item._id === id);
      if (data) {
        setProducts(data);
        setMount(true);
      } else {
        setInfo(true);
      }
    });
  }, [isOk]);

  console.log(products);

  if (mount === true) {
    return (
      <DashLayout>
        <Link to={`/products-control`}>
          <div className=" w-20 p-3 mb-4 text-3xl bg-sky-600 text-white rounded-lg cursor-pointer">
            <i className="fa-solid fa-arrow-right-to-bracket -rotate-180"></i>
          </div>
        </Link>
        <div
          className={`w-full p-3 mb-3 flex flex-col sm:flex-row justify-around items-center`}
        >
          <div className="flex justify-center items-center">
            <img
              src={`${import.meta.env.VITE_API_URL}/produkImg/${
                products.image
              }`}
              className="w-96 h-96"
              alt=""
            />
          </div>
          <div className="flex justify-center flex-col sm:w-1/2">
            <h1
              className={`font-poppins text-3xl my-2 capitalize ${
                isDarkMode && "text-white"
              }`}
            >
              {products.title}
            </h1>
            <p
              className={`font-poppins text-2xl my-2 ${
                isDarkMode && "text-white"
              }`}
            >
              {parseFloat(products.price).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p
              className={`font-poppins text-xl my-2 ${
                isDarkMode && "text-white"
              }`}
            >
              Kategori: {products.category}
            </p>
            <p
              className={`font-poppins text-xl my-2 ${
                isDarkMode && "text-white"
              }`}
            >
              Deskripsi: {products.description}
            </p>
          </div>
        </div>
      </DashLayout>
    );
  } else if (info === true) {
    return <NotFoundPage></NotFoundPage>;
  } else {
    return <LoadingPage></LoadingPage>;
  }
};

export default DetailProductPage;
