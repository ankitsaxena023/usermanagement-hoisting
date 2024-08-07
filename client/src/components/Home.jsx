import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profession: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/all");
      console.log("Fetched users:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      phone: user.phone,
      profession: user.profession,
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      phone: "",
      profession: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/update/${id}`, formData);
      setUsers(
        users.map((user) => (user._id === id ? { ...user, ...formData } : user))
      );
      cancelEdit();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded mt-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "50vh" }}
      >
        <h2 className="text-center text-white">Registered Users</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover mt-3">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profession</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {editingUser === user._id ? (
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {editingUser === user._id ? (
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      ) : (
                        user.phone
                      )}
                    </td>
                    <td className="text-center">{user.profession}</td>
                    <td>
                      {editingUser === user._id ? (
                        <>
                          <button
                            className="btn btn-primary mr-2"
                            style={{ marginRight: "6px" }}
                            onClick={() => handleUpdate(user._id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-warning"
                            style={{ marginRight: "6px" }}
                            onClick={() => startEdit(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
