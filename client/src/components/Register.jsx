import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profession: "",
  });

  const navigate = useNavigate();

  const { name, email, password, phone, profession } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ name, email, password, phone, profession });
      const res = await axios.post(
        "https://usermanagement-hoisting.onrender.com/api/users/register",
        body,
        config
      );
      alert("User registered successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        profession: "",
      });
      navigate("/login");
    } catch (err) {
      console.error(err.response.data);
      alert("Error registering user");
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4" style={{ width: "30rem" }}>
        <h2 className="text-center">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profession</label>
            <input
              type="text"
              className="form-control"
              name="profession"
              value={profession}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
