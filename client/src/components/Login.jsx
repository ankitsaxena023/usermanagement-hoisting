import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        body,
        config
      );
      alert("User logged in successfully");
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4" style={{ width: "30rem" }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
