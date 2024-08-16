import axios from "axios";

const uri = import.meta.env.VITE_API_URL;
export const AuthLogin = (data, call) => {
  axios
    .post(`${uri}/login`, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${uri}`,
      },
    })
    .then((res) => call(true, res.data))
    .catch((err) => call(false, err));
};
