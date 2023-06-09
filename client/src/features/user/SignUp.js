import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData));
    navigate("/");
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <input
        required
        onChange={handleInputChange}
        name="first_name"
        value={formData.first_name}
        type="text"
        placeholder="First Name"
      />
      <input
        required
        onChange={handleInputChange}
        name="last_name"
        value={formData.last_name}
        type="text"
        placeholder="Last Name"
      />
      <input
        required
        onChange={handleInputChange}
        name="username"
        value={formData.username}
        type="text"
        placeholder="Username"
      />
      <input
        required
        onChange={handleInputChange}
        name="email"
        value={formData.email}
        type="email"
        placeholder="Email"
      />
      <input
        required
        onChange={handleInputChange}
        name="password"
        value={formData.password}
        type="password"
        placeholder="Password"
      />
      <input
        required
        onChange={handleInputChange}
        name="password_confirmation"
        value={formData.password_confirmation}
        type="password"
        placeholder="Confirm Password"
      />
      <input className="submit" type="submit" />
    </form>
  );
};

export default SignUp;
