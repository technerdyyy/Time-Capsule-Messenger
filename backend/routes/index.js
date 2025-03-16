const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const  checkPassword  = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const searchUser = require("../controller/searchUser");
const updateUserDetails = require("../controller/updateUserDetails");
const scheduleMessage = require("../controller/scheduleMessage");

// const authenticateUser = require("../controller/checkPassword");
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
router.put("/update-user", updateUserDetails);

//search-user
router.post("/search-user", searchUser)

//schedule-message
router.post("/schedule-message", scheduleMessage);

module.exports = router;
