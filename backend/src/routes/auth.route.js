const express = require("express");
const {registerController, loginController, logoutController} = require("../controllers/auth.controller");
const checkUserParams = require("../utils/checkUserParams");

const authRouter = express.Router();   

authRouter.post("/register", checkUserParams, registerController)
authRouter.post("/login", loginController)
authRouter.post("/logout", logoutController)


module.exports = authRouter;