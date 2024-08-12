import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const ChangePw = (data, call) => {
  axios
    .put(`${url}/change-password`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => call(true, res))
    .catch((err) => call(false, err));
};
