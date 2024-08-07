import axios from "axios";

export const EditPostProfile = (data, call) => {
  axios
    .put("http://192.168.1.80:3000/profile", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
