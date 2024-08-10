import axios from "axios";

export const PostPhoto = (data, call) => {
  axios
    .put("http://192.168.1.80:3000/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
