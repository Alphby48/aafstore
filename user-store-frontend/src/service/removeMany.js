import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const RemoveMany = (data, param, call) => {
  axios
    .delete(`${url}/cart-trash/${param}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
