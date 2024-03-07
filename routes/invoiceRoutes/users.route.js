const express = require("express");
const { login, register } = require("../../controllers/invoiceControllers/auth");
const { forgotPasswordOtp, verifyOtp, changePassword } = require("../../controllers/invoiceControllers/user");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);

usersRouter.post("/forgotpassword", forgotPasswordOtp);
usersRouter.post("/verifyotp", verifyOtp);
usersRouter.post("/changepassword", changePassword);

module.exports = { usersRouter };
