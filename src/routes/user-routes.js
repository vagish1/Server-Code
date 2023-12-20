const express = require('express');
const authRoutes = express.Router();
const authControllers = require("../controllers/auth-controller")

authRoutes.route("/register").post(authControllers.userRegistration);
// authRoutes.route("/login").post();
// authRoutes.route("/delete").post();
// authRoutes.route("/logout").post();

module.exports = authRoutes;
