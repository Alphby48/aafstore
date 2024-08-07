import axios from "axios";

export const ChangePw = (data, call) => {
  axios
    .put("http://192.168.1.80:3000/change-password", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => call(true, res))
    .catch((err) => call(false, err));
};
