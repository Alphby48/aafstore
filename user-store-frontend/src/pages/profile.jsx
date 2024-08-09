import { useEffect } from "react";
import NavbarPage from "../components/fragment/navbar";
import { useState } from "react";
import { PostProfile } from "../service/profile";
import { Link } from "react-router-dom";
import { RemoveAcc } from "../service/remove";
import FootBarLayout from "../components/layouts/footbar";
const ProfilePage = () => {
  const [profile, setProfile] = useState([]);

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
      } else {
        window.location.href = "/login";
      }
    });
  }, []);

  // useEffect(() => {
  //   const dataProfile = JSON.parse(localStorage.getItem("token"));
  //   if (!dataProfile) {
  //     window.location.href = "/login";
  //   } else {
  //     PostProfile((res) => {
  //       const data = res.find((d) => d._id === dataProfile.id);
  //       setProfile(data);
  //     });
  //   }
  // }, []);

  const handlelogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleRemove = (e) => {
    e.preventDefault();
    if (confirm("Do you want to delete your account?")) {
      const tokenLocal = {
        _id: e.target.remove.value,
      };
      console.log(tokenLocal);
      RemoveAcc(tokenLocal, (res) => {
        console.log(res);
      });
      localStorage.removeItem("token");
      localStorage.removeItem(tokenLocal._id);
      window.location.href = "/register";
    }
  };

  return (
    <>
      <NavbarPage></NavbarPage>
      <div className="container-profile">
        <h1>Profile</h1>
        <div className="profile-box">
          <div className="profile-image">
            <img src="/img/logo.png" alt="" />
          </div>
          <div className="profile-data">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <td>{profile.username}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col">Name</th>
                  <td>{profile.name}</td>
                </tr>
                <tr>
                  <th scope="col">Gender</th>
                  <td>{profile.gender ? profile.gender : "-"}</td>
                </tr>
                <tr>
                  <th scope="col">Date of Birth</th>
                  <td>{profile.birthdate ? profile.birthdate : "-"}</td>
                </tr>
                <tr>
                  <th scope="col">Gmail</th>
                  <td>{profile.email}</td>
                </tr>
                <tr>
                  <th scope="col">No.HP</th>
                  <td>{profile.nohp ? profile.nohp : "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h1>Setting</h1>
        <div className="setting">
          <ul className="list-group">
            <li className="list-group-item">
              <Link
                to={"/profile/edit"}
                className="text-decoration-none text-dark"
              >
                <i className="bi bi-pencil-square"></i>Edit Profile
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                to={"/profile/change-password"}
                className="text-decoration-none text-dark"
              >
                <i className="bi bi-key"></i>Change Password
              </Link>
            </li>
            <li className="list-group-item" onClick={handlelogOut}>
              <i className="bi bi-door-open-fill"></i>Log-Out
            </li>
            <li className="list-group-item">
              <form
                action="_method=DELETE"
                method="post"
                onSubmit={handleRemove}
              >
                <input
                  type="hidden"
                  name="remove"
                  id="remove"
                  value={profile._id}
                />
                <button type="submit">
                  <i className="bi bi-trash-fill"></i>Remove Account
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
      <FootBarLayout></FootBarLayout>
    </>
  );
};
export default ProfilePage;
