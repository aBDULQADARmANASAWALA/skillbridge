import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import getErrorMessage from "../utils/getErrorMessage";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    e.preventDefault();

    setError("");

    try {
      await api.post(
        "auth/register/",
        formData
      );

      navigate("/");
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <br /><br />

        <input
          className="input"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br /><br />

        <button className="btn" type="submit">
          Register
        </button>
      </form>

      <br />

      <Link className="btn" to="/">
        Back to Login
      </Link>
    </div>
  );
}

export default Register;