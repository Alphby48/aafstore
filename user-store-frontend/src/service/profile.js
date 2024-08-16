import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const PostProfile = (data, call) => {
  axios
    .get(`${url}/profile/${data}`)
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
