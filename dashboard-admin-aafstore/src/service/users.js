import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const GetUsers = (data, call) => {
  axios
    .get(`${url}/admin/users/${data}`)
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
