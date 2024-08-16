import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const getCart = (data, call) => {
  axios
    .get(`${url}/cart/${data}`)
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
