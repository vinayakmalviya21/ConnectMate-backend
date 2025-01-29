const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

// Authentication Routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

module.exports = router;
