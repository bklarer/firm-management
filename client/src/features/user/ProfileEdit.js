import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loginUpdated, logout } from "../../slices/loginSlice";
import { addUserError, userRemoved, userUpdated } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const [image, setImage] = useState({});
  const [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });

  useEffect(
    () =>
      userInfo
        ? setUpdatedUser({
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            username: userInfo.username,
            email: userInfo.email,
          })
        : undefined,
    [userInfo]
  );

  console.log("image", image);

  const handleImageChange = (e) => {
    e.persist();
    setImage(e.target.files[0]);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    fetch(`/api/upload`, {
      method: "PATCH",
      body: formData,
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((changedUser) => {
          dispatch(userUpdated(changedUser));
          dispatch(loginUpdated(changedUser));
        });
      } else resp.json().then((error) => addUserError(error));
    });
  };

  const handleFormChange = (e) => {
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", updatedUser);

    fetch(`/api/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedUser),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((changedUser) => {
          dispatch(userUpdated(changedUser));
          dispatch(loginUpdated(changedUser));
        });
      } else resp.json().then((error) => addUserError(error));
    });
  };

  const handleDeleteClick = () => {
    fetch(`/api/me`, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
      dispatch(logout());
      dispatch(userRemoved(userInfo.id));
    });
  };

  return (
    <div className="profile-edit">
      <img src={userInfo.image} alt="profile" style={{ width: "200px" }} />
      <form className="image-form" onSubmit={handleImageSubmit}>
        <h3>Image upload</h3>
        <input type="file" name="image" onChange={handleImageChange} />
        <input className="submit" type="submit" value="Upload Image" />
      </form>
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <h3>Change Profile Info</h3>
        <div>
          <label>First Name</label>
          <input
            name="first_name"
            onChange={handleFormChange}
            value={updatedUser.first_name}
            type="text"
            placeholder="First Name"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="last_name"
            onChange={handleFormChange}
            value={updatedUser.last_name}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div>
          <label>Username</label>
          <input
            name="username"
            onChange={handleFormChange}
            value={updatedUser.username}
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            onChange={handleFormChange}
            value={updatedUser.email}
            type="text"
            placeholder="Email"
          />
        </div>
        <input className="submit" type="submit" />
      </form>
      <button className="delete" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default ProfileEdit;
