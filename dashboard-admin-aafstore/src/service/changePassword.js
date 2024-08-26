import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const changePassword = (data, call) => {
  axios
    .put(`${url}/change-password-admin`, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${url}`,
      },
    })
    .then((res) => {
      call(res.data);
    })
    .catch((err) => {
      call(err);
    });
};
