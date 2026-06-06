import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import ErrorMessage from "../components/ErrorMessage";
import getErrorMessage from "../utils/getErrorMessage";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    try {
      const response = await api.post(
        "auth/login/",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.access
      );

      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <br />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />

        <button type="submit" className="btn">
          Login
        </button>
      </form>

      <ErrorMessage error={error} />
      <br />

      <Link to="/register" className="btn">
        Create Account
      </Link>
    </div>
  );
}

export default Login;