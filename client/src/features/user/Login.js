import { useState } from "react";
import { userLogin } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin(formData));
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <h3>Login</h3>
      <input
        required
        onChange={handleInputChange}
        name="username"
        value={formData.username}
        type="text"
        placeholder="username"
      />
      <input
        required
        onChange={handleInputChange}
        name="password"
        value={formData.password}
        type="password"
        placeholder="password"
      />
      <input value="Login" className="submit" type="submit"></input>
    </form>
  );
};

export default Login;
