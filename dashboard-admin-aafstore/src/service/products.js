import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const GetProducts = (data, call) => {
  axios
    .get(`${url}/admin/products/${data}`)
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
