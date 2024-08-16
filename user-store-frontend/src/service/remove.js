import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const RemoveAcc = (data, call) => {
  axios
    .delete(`${url}/profile`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
