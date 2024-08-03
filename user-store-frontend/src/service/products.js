import axios from "axios";

export const GetProducts = (call) => {
  axios
    .get("http://192.168.1.80:3000/products")
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
