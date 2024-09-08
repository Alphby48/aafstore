import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const GetAdmin = (data, call) => {
  axios
    .get(`${url}/admin/${data}`, {
      headers: {
        API_KEY: "forum13",
      },
    })
    .then((res) => {
      call(res.data);
    })
    .catch((err) => {
      call(err);
    });
};
