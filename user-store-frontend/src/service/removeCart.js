import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const RemoveCart = (data, call) => {
  axios
    .delete(`${url}/cart`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
