import { useEffect } from "react";
import NavbarPage from "../components/fragment/navbar";
import { useState } from "react";
import { PostProfile } from "../service/profile";
import { Link } from "react-router-dom";
import { RemoveAcc } from "../service/remove";
import FootBarLayout from "../components/layouts/footbar";
import Loading from "../components/layouts/loading";
const ProfilePage = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const identy = JSON.parse(localStorage.getItem("token")).id;

    if (token && identy) {
      PostProfile(identy, (res) => {
        const dataSet = res.find((data) => data._id === identy);
        if (dataSet) {
          setProfile(dataSet);
        } else {
          window.location.href = "/login";
        }
      });
    }
  }, []);

  const handlelogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.target.submit();
    if (
      confirm(
        "Do you want to delete your account? \n if yes, click OK and wait for 2 seconds"
      )
    ) {
      const tokenLocal = {
        _id: e.target.remove.value,
        imageUrl: e.target.removeImg.value,
      };
      console.log(tokenLocal);
      RemoveAcc(tokenLocal, (res) => {
        console.log(res);
      });
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem(tokenLocal._id);
        window.location.href = "/register";
      }, 2000);
    }
  };

  if (profile.length === 0) {
    return <Loading></Loading>;
  } else {
    return (
      <>
        <NavbarPage></NavbarPage>
        <div className="container-profile">
          <h1>Profile</h1>
          <div className="profile-box">
            <div className="profile-image">
              <img
                src={
                  profile.imageUrl
                    ? `${import.meta.env.VITE_API_URL}/uploads/${
                        profile.imageUrl
                      }`
                    : "/icons/profile.svg"
                }
                alt=""
              />
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
                  to={"/profile/photo"}
                  className="text-decoration-none text-dark"
                >
                  <i className="bi bi-image"></i>Set Photo Profile
                </Link>
              </li>
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
                  action={`${
                    import.meta.env.VITE_API_URL
                  }/profile?_method=DELETE`}
                  method="post"
                  onSubmit={handleRemove}
                >
                  <input
                    type="hidden"
                    name="remove"
                    id="remove"
                    value={profile._id}
                  />
                  <input
                    type="hidden"
                    name="removeImg"
                    id="removeImg"
                    value={profile.imageUrl ? profile.imageUrl : "non.jpg"}
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
  }
};
export default ProfilePage;
