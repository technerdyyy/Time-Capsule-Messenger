const express = require("express");
const User = require("../models/UserModel"); // Using Mongoose Model

const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");

const router = express.Router();

// Create user API
router.post("/register", registerUser);

// Check user email
router.post("/email", checkEmail);

// Check user password
router.post("/password", checkPassword);

// Login user details
router.get("/user-details", userDetails);

// Logout user
router.get("/logout", logout);

// Update user details using Mongoose
router.post("/update-user", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required to update user" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { name: name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      updatedUser, // Return updated user data
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
