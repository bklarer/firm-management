import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loginUpdated, logout } from "../../slices/loginSlice";
import { userRemoved, userUpdated } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
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
    })
      .then((resp) => resp.json())
      .then((changedUser) => {
        dispatch(userUpdated(changedUser));
        dispatch(loginUpdated(changedUser));
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
    <div className="profile">
      <p>Picture</p>
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          onChange={handleFormChange}
          value={updatedUser.first_name}
          type="text"
          placeholder="First Name"
        />
        <input
          name="last_name"
          onChange={handleFormChange}
          value={updatedUser.last_name}
          type="text"
          placeholder="Last Name"
        />
        <input
          name="username"
          onChange={handleFormChange}
          value={updatedUser.username}
          type="text"
          placeholder="Username"
        />
        <input
          name="email"
          onChange={handleFormChange}
          value={updatedUser.email}
          type="text"
          placeholder="Email"
        />
        <input type="submit" />
      </form>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default ProfileEdit;
