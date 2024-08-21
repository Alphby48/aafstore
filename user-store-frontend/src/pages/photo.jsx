import { useEffect } from "react";
import { useState } from "react";
import { PostProfile } from "../service/profile";
import { PostPhoto } from "../service/photo";
import useValidasi from "../hooks/validasi";
const PhotoPage = () => {
  const [changePp, setChangePp] = useState("https://fakeimg.pl/300/");
  const [profile, setProfile] = useState([]);
  const [logg, setLogg] = useState(null);

  useValidasi();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")) || { id: 1 };
    PostProfile(token.id, (res) => {
      const set = res.find((d) => d._id === token.id);
      setProfile(set);
    });
  }, []);

  const handlePreview = (e) => {
    setChangePp(URL.createObjectURL(e.target.files[0]));
  };
  console.log(changePp);
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", e.target.id.value);
    formData.append("image", e.target.image.value);
    formData.append("img", e.target.img.files[0]);

    PostPhoto(formData, (res) => {
      setLogg(res);

      console.log(res);
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    });
  };

  return (
    <>
      <div className="container-poto">
        <h2>Change Potho</h2>
        {logg === null ? (
          ""
        ) : (
          <div class="alert alert-success" role="alert">
            {logg}
          </div>
        )}
        <div className="box-poto">
          <div className="img-poto">
            <p>Preview:</p>
            <img src={changePp} alt="profile" />
          </div>
          <form method="post" onSubmit={handleUpload}>
            <input type="hidden" name="id" value={profile._id} id="id" />
            <input
              type="hidden"
              name="image"
              value={profile.imageUrl}
              id="image"
            />
            <input
              type="file"
              name="img"
              id="img"
              accept="image/*"
              required
              onChange={handlePreview}
            />
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PhotoPage;
