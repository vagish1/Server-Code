const express = require('express');
const authRoutes = express.Router();
const authControllers = require("../controllers/auth-controller")
const checkAuthorization = require("../middleware/auth-middleware")
authRoutes.route("/register").post(authControllers.register);
authRoutes.route("/login",checkAuthorization).post(authControllers.login);
// authRoutes.route("/delete").post();
// authRoutes.route("/logout").post();

module.exports = authRoutes;
