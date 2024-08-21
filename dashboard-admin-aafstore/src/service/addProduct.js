import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const PostProduct = (data, call) => {
  axios
    .post(`${url}/admin/add-product`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
