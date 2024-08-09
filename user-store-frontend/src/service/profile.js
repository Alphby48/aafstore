import axios from "axios";

export const PostProfile = (data, call) => {
  axios
    .get(`http://192.168.1.80:3000/profile/${data}`)
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
