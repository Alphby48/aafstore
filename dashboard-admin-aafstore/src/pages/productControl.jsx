import DashLayout from "../components/layouts/dashLayout";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { mountAct } from "../redux/slices/mountSlice";
import { DarkMode } from "../context/darkContext";
import { useEffect, useState } from "react";
import { GetProducts } from "../service/products";
import { DeleteProduct } from "../service/deleteProduct";
import LoadingPage from "../components/element/loading";
import { GetAdmin } from "../service/admin";
import PopUp from "../components/element/popup";

const ProductsControlPage = () => {
  const { isDarkMode } = useContext(DarkMode);
  const [products, setProducts] = useState([]);
  const [subSt, setSubSt] = useState(0);
  const mount = useSelector((state) => state.mounting.mount);
  const dispatch = useDispatch();
  const [info, setInfo] = useState(false);
  const [popUp, setPopUp] = useState(false);

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
          console.log(true);
          setInfo(true);
        } else {
          window.location.href = "/login";
        }
      });
    }
  }, []);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hash")) || { hash: "001" };
    if (local) {
      GetProducts(local.hash, (res) => {
        setProducts(res);
      });
    }
  }, [mount]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSubSt(10);
    } else {
      setSubSt(15);
    }
  }, []);

  const handleRemove = (id, imageUrl) => {
    const data = {
      idAdmin: JSON.parse(localStorage.getItem("hash")).hash,
      _id: id,
      imageUrl: imageUrl,
    };
    DeleteProduct(data, (res) => {
      console.log(res);
      dispatch(mountAct(!mount));
      setPopUp(true);
    });
  };

  console.log(mount);

  if (info === true) {
    return (
      <DashLayout title="Products Control">
        <div className="w-full p-2 sm:p-3 flex flex-wrap justify-center">
          {products.length > 0 ? (
            products.map((item) => {
              return (
                <div
                  key={item._id}
                  className={`flex flex-col p-2 sm:p-3 rounded-lg h-60 sm:h-72 sm:m-3 m-2 ${
                    isDarkMode ? "bg-slate-400" : "bg-cyan-100"
                  }`}
                >
                  <div className={`flex justify-center items-center`}>
                    <img
                      src={`${import.meta.env.VITE_API_URL}/produkImg/${
                        item.image
                      }`}
                      alt=""
                      className="w-28 h-32 sm:w-40 sm:h-44 rounded-lg"
                    />
                  </div>
                  <h2
                    className={`text-base sm:text-lg font-poppins capitalize ${
                      isDarkMode && "text-white"
                    }`}
                  >
                    {item.title.substring(0, subSt)}...
                  </h2>
                  <p className="text-base sm:text-lg text-orange-300 font-poppins">
                    {parseFloat(item.price).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                  <div className="flex justify-between my-1">
                    <button
                      className="bg-blue-300 p-1 rounded-md font-poppins text-white text-sm"
                      onClick={() =>
                        (window.location.href = `/products-control/detail/${item._id}`)
                      }
                    >
                      detail
                    </button>
                    <button
                      className="bg-red-300 p-1 rounded-md font-poppins text-white text-sm"
                      onClick={() => handleRemove(item._id, item.image)}
                    >
                      hapus
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="font-poppins text-2xl h-12 p-2 bg-red-600 text-white rounded-lg">
              Product Kosong
            </h1>
          )}
        </div>
        {popUp === true ? (
          <PopUp setPopUp={setPopUp} title="Produk Terhapus"></PopUp>
        ) : (
          <h1 className="hidden"></h1>
        )}
      </DashLayout>
    );
  } else {
    return <LoadingPage></LoadingPage>;
  }
};

export default ProductsControlPage;
