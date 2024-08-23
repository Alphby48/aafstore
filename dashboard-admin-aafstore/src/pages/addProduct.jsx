import DashLayout from "../components/layouts/dashLayout";
import { DarkMode } from "../context/darkContext";
import { useContext } from "react";
import { useState } from "react";
import { PostProduct } from "../service/addProduct";
import PopUp from "../components/element/popup";
import LoadingPage from "../components/element/loading";
import { GetAdmin } from "../service/admin";
import { useEffect } from "react";
const AddProductPage = () => {
  const { isDarkMode } = useContext(DarkMode);
  const [kondisi, setKondisi] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [changePp, setChangePp] = useState("https://fakeimg.pl/160x240/");

  useEffect(() => {
    const local = localStorage.getItem("hash");
    if (!local) {
      window.location.href = "/login";
      return;
    }

    if (local) {
      GetAdmin(local, (res) => {
        if (res === local) {
          console.log(true);
          setKondisi(true);
        } else {
          window.location.href = "/login";
        }
      });
    }
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      image: e.target.image.files[0],
      category: e.target.category.value,
    };

    PostProduct(data, (res) => {
      console.log(res);
      setPopUp(true);
      e.target.reset();
      setChangePp("https://fakeimg.pl/160x240/");
    });
  };

  const handlePreview = (e) => {
    setChangePp(URL.createObjectURL(e.target.files[0]));
  };

  if (kondisi === false) {
    return <LoadingPage></LoadingPage>;
  } else {
    return (
      <DashLayout title="Add Product">
        <div className="w-full flex justify-center items-center flex-col">
          <div className="mb-3">
            <p className={`font-poppins ${isDarkMode && "text-white"}`}>
              preview:
            </p>
            <img src={changePp} alt="" className="rounded-lg w-40 h-60" />
          </div>
          <form
            method="post"
            className={`w-full sm:w-1/2 flex flex-col ${
              isDarkMode ? "bg-slate-500" : "bg-orange-50"
            } p-3 rounded-lg`}
            onSubmit={handleAddProduct}
            encType="multipart/form-data"
          >
            <div>
              <input
                type="file"
                name="image"
                id="image"
                className="w-full rounded-md border-2 border-sky-500"
                accept="image/*"
                onChange={handlePreview}
                required
              />
            </div>
            <div
              className={`flex flex-col font-poppins my-2 ${
                isDarkMode && "text-white"
              }`}
            >
              <label htmlFor="title">Title</label>
              <input
                className={`p-2 rounded-md border-sky-500 border-2 ${
                  isDarkMode && "bg-gray-500"
                }`}
                type="text"
                name="title"
                id="title"
                required
              />
            </div>
            <div
              className={`flex flex-col font-poppins my-2 ${
                isDarkMode && "text-white"
              }`}
            >
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                className={`p-2 rounded-md border-sky-500 border-2 ${
                  isDarkMode && "bg-gray-500"
                }`}
              >
                <option value="pakaian pria">Pakaian Pria</option>
                <option value="pakaian wanita">Pakaian Wanita</option>
                <option value="pakaian pria wanita">Pakaian Pria Wanita</option>
                <option value="elektronik">Elektronik</option>
                <option value="kitchen">Peralatan Dapur</option>
                <option value="aksesoris">Aksesoris</option>
                <option value="lain-lain">Lain-lain</option>
              </select>
            </div>
            <div
              className={`flex flex-col font-poppins my-2 ${
                isDarkMode && "text-white"
              }`}
            >
              <label htmlFor="price">Price</label>
              <input
                className={`p-2 rounded-md border-sky-500 border-2 appearance-none ${
                  isDarkMode && "bg-gray-500"
                }`}
                type="number"
                name="price"
                id="price"
                required
              />
            </div>
            <div
              className={`flex flex-col font-poppins my-2 ${
                isDarkMode && "text-white"
              }`}
            >
              <label htmlFor="description">Description</label>
              <textarea
                className={`p-2 rounded-md border-sky-500 border-2 ${
                  isDarkMode && "bg-gray-500"
                }`}
                name="description"
                id="description"
                cols="10"
                rows="10"
                required
              ></textarea>
            </div>
            <button
              className="bg-sky-500 text-white p-2 rounded-md mt-4"
              type="submit"
            >
              Add
            </button>
          </form>
          {popUp === true ? (
            <PopUp setPopUp={setPopUp} title="Product Added"></PopUp>
          ) : (
            <h1 className="hidden"></h1>
          )}
        </div>
      </DashLayout>
    );
  }
};

export default AddProductPage;
