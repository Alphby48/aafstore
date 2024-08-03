import InputLabel from "../element/inputLabel/inputLabel";
import Button from "../element/button/button";
import { AuthLogin } from "../../service/login";
import { useEffect, useState } from "react";
const FormLogin = () => {
  const [info, setInfo] = useState("");
  useEffect(() => {
    const getLocal = localStorage.getItem("token");
    if (getLocal) {
      window.location.href = "/product";
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    const dataAuthLogin = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    AuthLogin(dataAuthLogin, (status, res) => {
      if (status) {
        const saveLocal = {
          email: res.email,
          username: res.username,
          name: res.name,
          password: res.password,
          id: res._id,
          ip: res.ip,
        };
        window.location.href = "/product";
        localStorage.setItem("token", JSON.stringify(saveLocal));
        console.log(res);
      } else {
        console.log(res);
        setInfo("username atau password salah");
      }
      // console.log(res);
    });
  };
  return (
    <form action="" method="post" className="login" onSubmit={handleLogin}>
      <InputLabel
        textLabel="Username"
        type="text"
        name="username"
        placeholder="masukan username"
        klasLabel="form-label"
        klasInput="form-control"
      ></InputLabel>

      <InputLabel
        textLabel="Password"
        type="password"
        name="password"
        placeholder="masukan password"
        klasLabel="form-label"
        klasInput="form-control"
      ></InputLabel>

      <Button type="submit" klasBtn="btn">
        Login
      </Button>
      {info.length > 0 ? <p className="text-danger">{info}</p> : null}
    </form>
  );
};

export default FormLogin;
