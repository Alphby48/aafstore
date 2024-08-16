import { useEffect } from "react";
import { useState } from "react";
import { PostProfile } from "../service/profile";
import InputLabel from "../components/element/inputLabel/inputLabel";
import { EditPostProfile } from "../service/editprofile";
import { Link } from "react-router-dom";
import NavbarPage from "../components/fragment/navbar";
//
const EditProfile = () => {
  const [profile, setProfile] = useState([]);
  const [oldName, setOldName] = useState("");
  const [logMsg, setLogMsg] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    const identy = JSON.parse(localStorage.getItem("token")).id;
    PostProfile(identy, (res) => {
      const dataSet = res.find((data) => data._id === identy);
      if (dataSet) {
        setProfile(dataSet);
        setOldName(dataSet);
      } else {
        window.location.href = "/login";
      }
    });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    const dataEdit = {
      _id: e.target._id.value,
      oldNama: e.target.oldNama.value,
      username: e.target.username.value,
      name: e.target.name.value,
      gender: e.target.gender.value,
      birthdate: e.target.birthdate.value,
      email: e.target.email.value,
      nohp: e.target.nohp.value,
    };

    EditPostProfile(dataEdit, (res) => {
      setLogMsg(res);
    });
  };

  return (
    <>
      <NavbarPage></NavbarPage>
      <div className="container-edit">
        <h1>Edit Profile</h1>
        {logMsg === null ? (
          ""
        ) : (
          <div className="alert alert-success" role="alert">
            {logMsg &&
              Array.isArray(logMsg) &&
              logMsg.length > 0 &&
              logMsg.map((l) => {
                return <p>{l.msg}</p>;
              })}
          </div>
        )}
        <form className method="post" onSubmit={handleEdit}>
          <input type="hidden" name="_id" value={oldName._id} />
          <input type="hidden" name="oldNama" value={oldName.username} />

          <InputLabel
            textLabel="Username"
            type="text"
            name="username"
            placeholder="masukan username"
            klasLabel="edit-label"
            klasInput="edit-control"
            value={profile.username}
            onChange={(e) => setProfile({ username: e.target.value })}
          ></InputLabel>
          <InputLabel
            textLabel="Birthdate"
            type="date"
            name="birthdate"
            placeholder="masukan birthdate"
            klasLabel="edit-label"
            klasInput="edit-control"
            value={profile.birthdate}
            onChange={(e) => setProfile({ birthdate: e.target.value })}
          ></InputLabel>
          <InputLabel
            textLabel="Nama"
            type="text"
            name="name"
            placeholder="masukan name"
            klasLabel="edit-label"
            klasInput="edit-control"
            value={profile.name}
            onChange={(e) => setProfile({ name: e.target.value })}
          ></InputLabel>

          <div className="select-edit">
            <label htmlFor="gender" className="edit-label">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="select-inp"
              value={profile.gender}
              onChange={(e) => setProfile({ gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <InputLabel
            textLabel="Gmail"
            type="email"
            name="email"
            placeholder="masukan gmail"
            klasLabel="edit-label"
            klasInput="edit-control"
            value={profile.email}
            onChange={(e) => setProfile({ email: e.target.value })}
          ></InputLabel>
          <InputLabel
            textLabel="No. HP"
            type="number"
            name="nohp"
            placeholder="masukan nohp"
            klasLabel="edit-label"
            klasInput="edit-control"
            value={profile.nohp}
            onChange={(e) => setProfile({ nohp: e.target.value })}
          ></InputLabel>
          <div className="btn-edit">
            <button type="submit" className="btn btn-primary btn-lg">
              Save
            </button>
            <Link to={"/profile"} className="btn btn-danger btn-lg">
              Exit
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
