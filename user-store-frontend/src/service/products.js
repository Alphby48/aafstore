import axios from "axios";

export const GetProducts = (data, call) => {
  axios
    .get(`http://192.168.1.80:3000/products/${data}`)
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
