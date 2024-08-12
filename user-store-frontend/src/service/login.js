import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const AuthLogin = (data, call) => {
  axios
    .post(`${url}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => call(true, res.data))
    .catch((err) => call(false, err));
};
