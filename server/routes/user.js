// routes/user.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

// Get all users
router.get("/all", getAllUsers);

// Update user
router.put("/update/:id", updateUser);

// Delete user
router.delete("/delete/:id", deleteUser);

module.exports = router;
