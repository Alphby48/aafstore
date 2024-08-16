import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const AuthRegister = (data, call) => {
  axios
    .post(`${url}/auth`, data, {
      headers: {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": `${url}`,
      },
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
