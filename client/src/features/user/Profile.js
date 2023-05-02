import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.login);

  const addDefaultSrc = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dnahj1ggn/image/upload/v1681614097/face_sktddp.jpg";
  };

  const imagePlaceholder =
    "https://res.cloudinary.com/dnahj1ggn/image/upload/v1681614097/face_sktddp.jpg";

  return (
    <div className="profile">
      <h2>Profile</h2>
      <img
        onError={addDefaultSrc}
        src={userInfo.image ? userInfo.image : imagePlaceholder}
        alt="Profile"
        style={{ width: "200px" }}
      />
      <p>{`Username: ${userInfo.username}`}</p>
      <p>{`Name: ${userInfo.first_name} ${userInfo.last_name}`}</p>
      <p>{`email: ${userInfo.email}`}</p>
      <Link className="link" to="edit">
        Edit
      </Link>
    </div>
  );
};

export default Profile;
