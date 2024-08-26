import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const changeUsername = (data, call) => {
  axios
    .put(`${url}/change-username-admin`, data, {
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
