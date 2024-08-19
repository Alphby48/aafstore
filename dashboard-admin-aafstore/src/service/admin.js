import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const GetAdmin = (data, call) => {
  axios
    .get(`${url}/admin/${data}`)
    .then((res) => {
      call(res.data);
    })
    .catch((err) => {
      call(err);
    });
};
