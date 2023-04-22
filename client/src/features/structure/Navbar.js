import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.login);

  if (!userInfo) {
    return (
      <nav className="navbar">
        <h1>Firm Management</h1>
        <ul>
          <NavLink className="link" to="/signup">
            <li>Sign Up</li>
          </NavLink>
          <NavLink className="link" to="/">
            <li>Login</li>
          </NavLink>
        </ul>
      </nav>
    );
  }

  function handleLogoutClick() {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        dispatch(logout());
      }
    });
  }

  return (
    <nav className="navbar">
      <h1>Firm Management</h1>
      <ul>
        <NavLink className="link" to="/">
          <li>Tasks</li>
        </NavLink>
        <NavLink className="link" to="/projects">
          <li>Projects</li>
        </NavLink>
        <NavLink className="link" to="/profile">
          <li>Profile</li>
        </NavLink>
        <Link className="link" onClick={handleLogoutClick}>
          <li>Logout</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
