import axios from "axios";

export const AuthRegister = (data, call) => {
  axios
    .post("http://192.168.1.80:3000/auth", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
