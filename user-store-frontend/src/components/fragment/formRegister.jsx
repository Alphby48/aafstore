import InputLabel from "../element/inputLabel/inputLabel";
import Button from "../element/button/button";
import { AuthRegister } from "../../service/auth";
import { useState } from "react";
const FormRegister = () => {
  const [logAuth, setLogAuth] = useState();
  const handleClick = (e) => {
    e.preventDefault();
    const dataAuth = {
      username: e.target.username.value,
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    AuthRegister(dataAuth, (res) => {
      setLogAuth(res);
      console.log(res);
    });
  };

  return (
    <form method="post" className="register" onSubmit={handleClick}>
      {logAuth &&
        Array.isArray(logAuth) &&
        logAuth.length > 0 &&
        logAuth.map((l, index) => {
          return (
            <div className="alert alert-primary" key={index} role="alert">
              {l.msg}
            </div>
          );
        })}

      <InputLabel
        textLabel="Username"
        type="text"
        name="username"
        placeholder="masukan username"
        klasLabel="form-label"
        klasInput="form-control"
      ></InputLabel>

      <InputLabel
        textLabel="Name"
        type="text"
        name="name"
        placeholder="masukan nama anda"
        klasLabel="form-label"
        klasInput="form-control"
      ></InputLabel>

      <InputLabel
        textLabel="Email"
        type="email"
        name="email"
        placeholder="masukan email"
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
        Register
      </Button>
    </form>
  );
};

export default FormRegister;
