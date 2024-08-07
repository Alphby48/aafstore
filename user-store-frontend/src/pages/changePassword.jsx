import NavbarPage from "../components/fragment/navbar";
import InputLabel from "../components/element/inputLabel/inputLabel";
import { ChangePw } from "../service/changePw";
import { useState } from "react";
import { Link } from "react-router-dom";
const ChangePasswordPage = () => {
  const [logChange, setLogChange] = useState(null);
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
        <form action="_method=PUT" method="post" onSubmit={handleChange}>
          {logChange === null ? null : (
            <div className="alert alert-success" role="alert">
              {logChange}
            </div>
          )}
          {/* {logChange === null ? (
            ""
          ) : (
            <div className="alert alert-success" role="alert">
              {logChange &&
                Array.isArray(logChange) &&
                logChange.length > 0 &&
                logChange.map((l, i) => {
                  return <p key={i}>{l.msg}</p>;
                })}
            </div>
          )} */}
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
