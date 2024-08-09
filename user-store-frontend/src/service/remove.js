import axios from "axios";

export const RemoveAcc = (data, call) => {
  axios
    .delete("http://192.168.1.80:3000/profile", {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
    .then((res) => call(res.data))
    .catch((err) => call(err));
};
