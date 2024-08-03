import axios from "axios";

export const AuthLogin = (data, call) => {
  axios
    .post("http://192.168.1.80:3000/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => call(true, res.data))
    .catch((err) => call(false, err));
};
