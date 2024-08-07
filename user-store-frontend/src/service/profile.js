import axios from "axios";

export const PostProfile = (call) => {
  axios
    .get("http://192.168.1.80:3000/profile")
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
