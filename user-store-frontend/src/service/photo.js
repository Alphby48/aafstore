import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const PostPhoto = (data, call) => {
  axios
    .put(`${url}/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
