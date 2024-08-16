import NavbarPage from "../components/fragment/navbar";
import InputLabel from "../components/element/inputLabel/inputLabel";
import { ChangePw } from "../service/changePw";
import { useState } from "react";
import { Link } from "react-router-dom";
import useValidasi from "../hooks/validasi";
//
const ChangePasswordPage = () => {
  const [logChange, setLogChange] = useState(null);
  useValidasi();

  const handleChange = (e) => {
    e.preventDefault();
    const data = {
      _id: JSON.parse(localStorage.getItem("token")).id,
      oldPassword: e.target.oldPassword.value,
      password: e.target.newPassword.value,
    };
    console.log(data);
    ChangePw(data, (status, res) => {
      if (status) {
        setLogChange("Password berhasil diubah");
        setTimeout(() => {
          window.location.href = "/login";
          localStorage.removeItem("token");
        }, 2000);
      } else {
        setLogChange("Password lama salah");
      }
    });
  };
  return (
    <>
      <NavbarPage></NavbarPage>
      <div className="container-change">
        <h1>Change Password</h1>
        <form method="post" onSubmit={handleChange}>
          {logChange === null ? null : (
            <div className="alert alert-success" role="alert">
              {logChange}
            </div>
          )}
          <InputLabel
            textLabel="Password"
            type="password"
            name="oldPassword"
            placeholder="masukan password"
            klasLabel="change-label"
            klasInput="change-control"
          ></InputLabel>
          <InputLabel
            textLabel="Change Password"
            type="password"
            name="newPassword"
            placeholder="masukan password baru"
            klasLabel="change-label"
            klasInput="change-control"
          ></InputLabel>
          <div className="btn-cg">
            <button type="submit" className="btn btn-primary ">
              Save
            </button>
            <Link to={"/profile"}>
              <button type="button" className="btn btn-danger ">
                Exit
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordPage;
