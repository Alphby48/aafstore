import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const PostLogin = (data, call) => {
  axios
    .post(`${url}/auth-admin`, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${url}`,
      },
    })
    .then((res) => {
      call(true, res.data);
    })
    .catch((err) => {
      call(false, err);
    });
};
