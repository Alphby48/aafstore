import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const EditPostProfile = (data, call) => {
  axios
    .put(`${url}/profile`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
