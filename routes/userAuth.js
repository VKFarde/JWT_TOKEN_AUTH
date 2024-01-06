const express = require("express");
const Router = express.Router();
const Register = require("../control/Register");
const Login = require("../control/Login");
const Home = require("../control/Home");
const Auth = require("../control/Auth/Auth");
const Logout = require("../control/Logout");

Router.post("/register", Register);
Router.get("/login", Login);

//Protected Routes
Router.get("/home", Auth, Home);
Router.get("/logout", Auth, Logout);

module.exports = Router;
